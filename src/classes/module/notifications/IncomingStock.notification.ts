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
import { DateSearchObjectType } from "../../../types/dto";
import { SearchByDateType } from "../../../types/dto/Stock.dtotypes";

export class IncomingStock {
  db: DB<IncomingStockInterface>;

  constructor(DBInstance: DB<IncomingStockInterface>) {
    this.db = DBInstance;
  }

  generateStockNotificationId() {
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const sequence = Math.floor(Math.random() * 9000) + 1000;
    return `NOTIFICATION-${timestamp}-${sequence}`;
  }

  async saveDataAsync(data: IncomingStockInterface) {
    try {
      const stockNotificationId = this.generateStockNotificationId();
      const dataToSave = { ...data, documentId: stockNotificationId };
      await this.db.save(`${stockNotificationId}`, dataToSave);
      return {
        success: true,
        message: "Data saved successfully",
      };
    } catch (error) {
      throw new Error(`Error saving data: ${error}`);
    }
  }

  async findNotificationById(id: string) {
    try {
      const data = await this.db.findById(id);
      return data ? data : null;
    } catch (error) {
      throw new Error(`Error selecting data: ${error}`);
    }
  }

  async searchByDateAsync(props: SearchByDateType) {
    try {
      const results = await this.db.searchByDate(props);
      // console.log({results});
      
      return results;
    } catch (error) {
      throw new Error(`Error getting data: ${error}`);
    }
  }
}
