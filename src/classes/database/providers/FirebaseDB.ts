/**
 * if a '' path is provided on save,
 * INTENT: create a document in the base collection with firestore auto-id
 * OTHERWISE: create a client-name document in the base collection or nested collection
 */
import { firestore } from "firebase-admin";
import { DB } from "../../../interfaces/databases/Database";

export class FirebaseDB<T extends firestore.DocumentData> implements DB<T> {
  private readonly basePath: string;

  constructor(collectionName: string) {
    this.basePath = collectionName;
  }

  private getFullPath(path: string) {
    return this.basePath ? `${this.basePath}/${path}` : path;
  }

  private isPathOdd(path: string): boolean {
    const segments = path.split("/").filter((segment) => segment.length > 0);
    return segments.length % 2 === 1;
  }

  async save(path: string, data: T): Promise<string> {
    try {
      const fullPath = this.getFullPath(path);
      let ref;
      if (this.isPathOdd(path)) {
        ref = firestore().doc(fullPath);
        await ref.set(data);
      } else {
        const collectionRef = firestore().collection(fullPath);
        ref = await collectionRef.add(data);
      }

      return ref.id;
    } catch (error) {
      throw new Error(
        `Save failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async getDocRef(
    path: string
  ): Promise<firestore.DocumentReference<
    firestore.DocumentData,
    firestore.DocumentData
  > | null> {
    try {
      const fullPath = this.getFullPath(path);

      if (!this.isPathOdd(path)) {
        throw new Error(`Invalid path(${path}): Unexpected odd path received`);
      }

      const docRef = firestore().doc(fullPath);
      return docRef;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findById(path: string): Promise<T | string | null> {
    try {
      if (!this.isPathOdd(path)) {
        throw new Error(
          `${path} is invalid. Odd number of path segments were expected. e.g. A/B/C`
        );
      }

      const docRef = await this.getDocRef(path);

      if (!docRef) {
        throw new Error("null document ref received");
      }

      const data = (await docRef.get()).data() as T;

      return data;
    } catch (error) {
      console.log("Error in FirebaseDB findById");

      throw new Error(
        `Find failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async update(path: string, partialData: Partial<T>): Promise<void> {
    try {
      if (!this.isPathOdd(path)) {
        throw new Error(
          `${path} is invalid. Odd number of path segments were expected. e.g. A/B/C`
        );
      }

      const docRef = await this.getDocRef(path);

      if (!docRef) {
        throw new Error("null document ref received");
      }

      await docRef.update(partialData);
      console.log("Successful update");
    } catch (error) {
      throw new Error(
        `Update failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async delete(path: string): Promise<void> {
    try {
      if (!this.isPathOdd(path)) {
        throw new Error(
          `${path} is invalid. Odd number of path segments were expected. e.g. A/B/C`
        );
      }

      const docRef = await this.getDocRef(path);

      if (!docRef) {
        throw new Error("null document ref received");
      }

      await docRef.delete();
      console.log("Successful delete");
    } catch (error) {
      throw new Error(
        `Delete failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}
