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
  db: DB<IncomingStockInterface>;

  constructor(DBInstance: DB<IncomingStockInterface>) {
    this.db = DBInstance;
  }

  async saveData(data: IncomingStockInterface) {
    try {
      await this.db.save(`${data.clientId}/incoming`, data);
    } catch (error) {
      throw new Error(`Error saving data: ${error}`);
    }
  }
}
