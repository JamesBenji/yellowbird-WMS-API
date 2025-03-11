/**
 * purpose:
 * 1. accepts stock out order from request
 * 2. generates picking list for the stock out order.
 * input: Stock out order
 * collection: PICKING_LISTS
 * dto: StockOutOrder, PickingList
 */

import { StockOutOrderDTO } from "../../../dto/StockOutOrder.dto";
import { DB } from "../../../interfaces/databases/Database";
import { PickingList } from "./PickingList.proc";

export class StockOutOrder {
  db: DB<StockOutOrderDTO>;
  pickingListInstance: PickingList;

  constructor(
    DBInstance: DB<StockOutOrderDTO>,
    pickingListInstance: PickingList
  ) {
    this.db = DBInstance;
    this.pickingListInstance = pickingListInstance;
  }

  generateStockOutId() {
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const sequence = Math.floor(Math.random() * 9000) + 1000;
    return `STOCK-OUT-${timestamp}-${sequence}`;
  }

  async saveDataAsync(data: StockOutOrderDTO) {
    const stockOutId: string = this.generateStockOutId();
    const saveData = { ...data, id: stockOutId };
    await this.db.save(`${data.companyId}/out/${stockOutId}`, saveData);
    // trigger picking list creation
    // TODO: determine which warehouse to use based on warehouses used by client and warehouses the WMS has
    await this.pickingListInstance.generatePickingList(data, `PLACEHOLDER_WAREHOUSE_ID`);
  }

  async findByIdAsync(
    id: StockOutOrderDTO["id"],
    companyId: StockOutOrderDTO["companyId"]
  ) {
    if (!id || !companyId) {
      const missingParams = [];
      const paramMap: Record<string, any> = { id, companyId };

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

    const data = await this.db.findById(`${companyId}/out/${id}`);
    return data;
  }

  async updateDataAsync(data: Partial<StockOutOrderDTO>) {
    await this.db.update(`${data.companyId}/out/${data.id}`, data);
  }

  async deleteDataAsync(
    id: StockOutOrderDTO["id"],
    companyId: StockOutOrderDTO["companyId"]
  ) {
    await this.db.delete(`${companyId}/out/${id}`);
  }
}
