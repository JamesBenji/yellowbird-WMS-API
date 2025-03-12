import { PutAwayItem } from "../../dto/PutAway.dto";
import { DB } from "../../interfaces/databases/Database";

export class Warehouse {
  private db: DB<PutAwayItem>;

  constructor(dbInstance: DB<PutAwayItem>) {
    this.db = dbInstance;
  }

  async saveDataAsync(data: PutAwayItem) {
    await this.db.save(
      `${data.itemSku}`,
      data
    );
  }

  async findByIdAsync(
    itemSku: PutAwayItem["itemSku"],
  ) {
    // if (!warehouseLocation || !companyId || !vendorId) {
    //   const missingParams = [];
    //   const paramMap: Record<string, any> = { warehouseLocation, companyId, vendorId };

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

    const data = await this.db.findById(
      `${itemSku}`
    );
    return data;
  }

  async updateDataAsync(data: Partial<PutAwayItem>, itemSku: PutAwayItem["itemSku"],) {
    await this.db.update(
      `${itemSku}`,
      data
    );
  }

  async deleteDataAsync(
    itemSku: PutAwayItem["itemSku"],
  ) {
    await this.db.delete(`${itemSku}`);
  }
}
