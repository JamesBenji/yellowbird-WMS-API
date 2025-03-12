/**
 * input: uuid for incoming stock notification
 * output: saves received products data
 * rules:
 * 1. Receives the notification uuid, and returns a list of items expected (API)
 * 2. Receives a payload specifying the items received at the warehouse dock (API)
 * 3. Assigns each product an sku while linking it to the stock batchNo and stock ownerId (internal).
 * 4. Saves the received products data in Firestore (Firebase: RECEIVED_INVENTORY)
 *
 * END: The PutAway module is triggered into action by a collection listener.
 */

import { StockInType } from "../../../dto/StockIn.dto";
import { DB } from "../../../interfaces/databases/Database";
import { DateSearchObjectType } from "../../../types/dto";

export class StockIn {
  db: DB<StockInType>;

  constructor(DBInstance: DB<StockInType>) {
    this.db = DBInstance;
  }

  generateStockInId() {
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const sequence = Math.floor(Math.random() * 9000) + 1000;
    return `STOCK-IN-${timestamp}-${sequence}`;
  }

  async saveDataAsync(data: StockInType) {
    const stockInId: string = this.generateStockInId()
    const saveData = {...data, stockInId}
    await this.db.save(`${stockInId}`, saveData);
  }

  async findByBatchNoAsync(
    batchNo: StockInType["batchNo"]
  ) {
    // if (!batchNo || !companyId || !vendorId) {
    //   const missingParams = [];
    //   const paramMap: Record<string, any> = { stockInId, companyId, vendorId };

    //   for (const key in paramMap) {
    //     if (!paramMap[key]) {
    //       missingParams.push(key);
    //     }
    //   }
    //   const errorMessage = `${missingParams.join(", ")} ${
    //     missingParams.length > 1 ? "are" : "is"
    //   } missing.`;

    //   throw new Error(errorMessage);
    // }

    const data = await this.db.findById(`${batchNo}`);
    return data;
  }

  async updateDataAsync(
    data: Partial<StockInType>,
    batchNo: StockInType['batchNo']
  ) {
    await this.db.update(`${batchNo}`, data);
  }

  async deleteDataAsync(
    batchNo: StockInType["batchNo"]
  ) {
    await this.db.delete(`${batchNo}`);
  }

  async searchByDate(props: DateSearchObjectType) {
    await this.db.searchByDate(props)
  }
}
