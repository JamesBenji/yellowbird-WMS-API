/**
 * PARAMS: Item data, inspection flag, stockInId
 * OPERATION: Save data
 */
import {
  InspectedItem,
  InspectionResults,
} from "../../../dto/InspectionResults.dto";
import { Returns } from "./Returns.proc";
import { DB } from "../../../interfaces/databases/Database";

export class InspectionModule {
  private returns: Returns;
  private db: DB<InspectionResults>;

  constructor(dbInstance: DB<InspectionResults>, returnsInstance: Returns) {
    this.db = dbInstance;
    this.returns = returnsInstance;
  }

  private generateSKU() {
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const sequence = Math.floor(Math.random() * 9000) + 1000;
    return `SKU-${timestamp}-${sequence}`;
  }

  private setItemSKUs(items: Array<InspectedItem>): Array<InspectedItem> {
    const result = items.map((item) => {
      if (item.hasPassed) {
        item.sku = this.generateSKU();
      }

      return item;
    });

    return result;
  }

  async saveDataAsync(data: InspectionResults) {
    const stockInId: string = data.stockInId;
    const inspectionBatchNo = `BATCH-${new Date()
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "")}`;
    const dataWithSKU = this.setItemSKUs(data.inspectedItems);
    const saveData = {
      ...data,
      inspectedItems: dataWithSKU,
      inspectionBatchNo,
    };
    await this.db.save(
      `${data.clientId}-${data.vendorId}/inspection/${stockInId}`,
      saveData
    );
  }

  async findByIdAsync(
    stockInId: InspectionResults["stockInId"],
    clientId: InspectionResults["clientId"],
    vendorId: InspectionResults["vendorId"]
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

    const data = await this.db.findById(
      `${clientId}-${vendorId}/inspection/${stockInId}`
    );
    return data;
  }

  async updateDataAsync(data: Partial<InspectionResults>) {
    await this.db.update(
      `${data.clientId}-${data.vendorId}/inspection/${data.stockInId}`,
      data
    );
  }

  async deleteDataAsync(
    stockInId: InspectionResults["stockInId"],
    clientId: InspectionResults["clientId"],
    vendorId: InspectionResults["vendorId"]
  ) {
    await this.db.delete(`${clientId}-${vendorId}/inspection/${stockInId}`);
  }
}
