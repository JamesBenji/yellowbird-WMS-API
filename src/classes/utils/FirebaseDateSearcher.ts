import { firestore } from "firebase-admin";

export class FirebaseDateSearcher {
  private readonly baseCollection;

  constructor(collectionName: string) {
    this.baseCollection = collectionName;
  }

  async searchByDate(props: { [key: string]: number }): Promise<Array<Object> | null> {
    // get object properties
    const fields = props;
    // filter out null value properties
    const keys = Object.keys(fields);

    const validKeys = keys.filter(
      (key) => fields[key] !== 0 && !isNaN(fields[key])
    );
    // make db queries for obtained props

    if (validKeys.length < 1) {
      throw new Error(
        `Search object values are invalid. Operation aborted due to null query values. Valid key length is ${validKeys.length}`
      );
    }

    const searchObject: { [key: string]: number } = {};

    validKeys.forEach(
      (validKey) => (searchObject[validKey] = Number(fields[validKey]))
    );

    // console.log({
    //   searchObject
    // });
    

    try {
      // const searchPath = this.path
      //   ? `${this.baseCollection}/${this.path}`
      //   : this.baseCollection;
      // Reference to the collection
      const colRef = firestore().collection(this.baseCollection);

      // Build query with multiple 'where' clauses
      let query: firestore.Query = colRef;
      for (const [key, value] of Object.entries(searchObject)) {
        query = query.where(key, "==", value);
      }

      // Execute query
      const querySnapshot = await query.get();

      // Map results to an array of objects
      const results: Array<Object> = [];
      
      querySnapshot.forEach((doc: firestore.DocumentSnapshot) => {
        results.push({...doc.data()});
      });

      // console.log({
      //   results
      // });
      

      if(results.length < 1) {
        // console.log('returning null');
        
        return null
      }

      // console.log(`returning ${results}`);
      
      return results;
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      throw error;
    }
  }
}
