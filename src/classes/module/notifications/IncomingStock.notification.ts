/**
 * payload: IncomingStock dto
 * operations:
 *  1. receive POST data from request
 *  2. save the data in FireStore
 *  END
 *
 * The listeners on the Firestore collection will trigger other processes, namely:
 * - notifying the warehouse manager about incoming stock
 */

import { IncomingStockInterface } from "../../../dto/IncomingStock.dto";
import { DB } from "../../../interfaces/databases/Database";

export class IncomingStock {
  data: IncomingStockInterface;
  db: DB<IncomingStockInterface>;

  constructor(DBInstance: DB<IncomingStockInterface>, data: IncomingStockInterface) {
    this.data = data;
    this.db = DBInstance;
  }

  async saveIncomingStockData() {
    try {
      await this.db.save(`${this.data.clientId}/incoming`, this.data)
    } catch (error) {
      throw new Error(`Error saving data: ${error}`)
    }
  }
}
