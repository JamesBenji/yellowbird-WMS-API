/**
 * PARAMS: Item data, inspection flag, batchNo
 * OPERATION: Save data
 */
import { InspectionResults } from "../../../dto/InspectionResults.dto";
import { Returns } from "./Returns.proc";
import { DB } from "../../../interfaces/databases/Database";
import { Item } from "../../../dto/Item.dto";
import { DateSearchObjectType } from "../../../types/dto";

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

  private setItemSKUs(items: Array<Item>): Array<Item> {
    const result = items.map((item) => {
      if (item.passedInspection) {
        item.sku = this.generateSKU();
      }

      return item;
    });

    return result;
  }

  async saveDataAsync(data: InspectionResults) {
    const batchNo: string = data.batchNo;
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
    await this.db.save(`${batchNo}`, saveData);
  }

  async findByIdAsync(
    batchNo: InspectionResults["batchNo"],
  ) {
    // if (!batchNo || !companyId) {
    //   const missingParams = [];
    //   const paramMap: Record<string, any> = { batchNo, companyId };

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

  async updateDataAsync(data: Partial<InspectionResults>) {
    await this.db.update(`${data.batchNo}`, data);
  }

  async deleteDataAsync(
    batchNo: InspectionResults["batchNo"],
  ) {
    await this.db.delete(`${batchNo}`);
  }

  async searchByDate(props: DateSearchObjectType) {
      await this.db.searchByDate(props)
    }
}
