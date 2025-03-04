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
import { StockInGetById } from "../../../types/dto/Stock.dtotypes";

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
    await this.db.save(`${data.clientId}-${data.vendorId}/in/${stockInId}`, saveData);
  }

  async findByIdAsync(
    stockInId: StockInType["stockInId"],
    clientId: StockInType["clientId"],
    vendorId: StockInType["vendorId"]
  ) {
    if (!stockInId || !clientId || !vendorId) {
      const missingParams = [];
      const paramMap: Record<string, any> = { stockInId, clientId, vendorId };

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

    const params: StockInGetById = { stockInId, clientId, vendorId };
    const data = await this.db.findById(`${clientId}-${vendorId}/in/${stockInId}`);
    return data;
  }

  async updateDataAsync(
    stockInId: StockInType["stockInId"],
    clientId: StockInType["clientId"],
    vendorId: StockInType["vendorId"],
    data: Partial<StockInType>
  ) {
    await this.db.update(`${clientId}-${vendorId}/in/${stockInId}`, data);
  }

  async deleteDataAsync(
    stockInId: StockInType["stockInId"],
    clientId: StockInType["clientId"],
    vendorId: StockInType["vendorId"]
  ) {
    await this.db.delete(`${clientId}-${vendorId}/in/${stockInId}`);
  }
}
