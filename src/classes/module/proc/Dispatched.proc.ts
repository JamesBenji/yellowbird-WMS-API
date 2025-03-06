

/**
 * purpose:
 * 1. records information about the logistics agent taking out stock
 * input: LogisticsAgent details, WarehouseStockOutLabel
 * collection: DISPATCHES
 * dto: LogisticsAgent, WarehouseStockOutLabel
 */

import { DispatchedStockDTO } from "../../../dto/DispatchedStock.dto";
import { DB } from "../../../interfaces/databases/Database";


export class Dispatched {
  db: DB<DispatchedStockDTO>;

  constructor(DBInstance: DB<DispatchedStockDTO>) {
    this.db = DBInstance;
  }

  generateStockDispatchedId() {
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const sequence = Math.floor(Math.random() * 9000) + 1000;
    return `DISPATCHED-${timestamp}-${sequence}`;
  }

  async saveDataAsync(data: DispatchedStockDTO) {
    const stockOutId: string = this.generateStockDispatchedId()
    const saveData = {...data, id: stockOutId}
    await this.db.save(`${data.stockOutOrderId}/dispatched/${stockOutId}`, saveData);
  }

  async findByIdAsync(
    id: DispatchedStockDTO["id"],
    stockOutOrderId: DispatchedStockDTO["stockOutOrderId"],
  ) {
    if (!id || !stockOutOrderId) {
      const missingParams = [];
      const paramMap: Record<string, any> = { id, stockOutOrderId };

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

    const data = await this.db.findById(`${stockOutOrderId}/dispatched/${id}`);
    return data;
  }

  async updateDataAsync(
    data: Partial<DispatchedStockDTO>
  ) {
    await this.db.update(`${data.stockOutOrderId}/dispatched/${data.id}`, data);
  }

  async deleteDataAsync(
    id: DispatchedStockDTO["id"],
    stockOutOrderId: DispatchedStockDTO["stockOutOrderId"],
  ) {
    await this.db.delete(`${stockOutOrderId}/dispatched/${id}`);
  }
}
