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
    await this.db.save(`${data.companyId}-${data.vendorId}/in/${stockInId}`, saveData);
  }

  async findByIdAsync(
    stockInId: StockInType["stockInId"],
    companyId: StockInType["companyId"],
    vendorId: StockInType["vendorId"]
  ) {
    if (!stockInId || !companyId || !vendorId) {
      const missingParams = [];
      const paramMap: Record<string, any> = { stockInId, companyId, vendorId };

      for (const key in paramMap) {
        if (!paramMap[key]) {
          missingParams.push(key);
        }
      }
      const errorMessage = `${missingParams.join(", ")} ${
        missingParams.length > 1 ? "are" : "is"
      } missing.`;

      throw new Error(errorMessage);
    }

    const data = await this.db.findById(`${companyId}-${vendorId}/in/${stockInId}`);
    return data;
  }

  async updateDataAsync(
    data: Partial<StockInType>
  ) {
    await this.db.update(`${data.companyId}-${data.vendorId}/in/${data.stockInId}`, data);
  }

  async deleteDataAsync(
    stockInId: StockInType["stockInId"],
    companyId: StockInType["companyId"],
    vendorId: StockInType["vendorId"]
  ) {
    await this.db.delete(`${companyId}-${vendorId}/in/${stockInId}`);
  }
}
