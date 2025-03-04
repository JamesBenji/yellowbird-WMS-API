export interface DB<T> {
    save(path: string, data: T): Promise<string>;
    findById(path: string): Promise<T | string | null>;
    getDocRef(path: string): Object;
    update(path: string, partialData: Partial<T>): Promise<void>;
    delete(path: string): Promise<void>;
  }