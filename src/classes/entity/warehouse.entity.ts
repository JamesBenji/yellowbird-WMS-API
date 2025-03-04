import { PutAwayItem } from "../../dto/PutAway.dto";
import { DB } from "../../interfaces/databases/Database";

export class Warehouse {
  private db: DB<PutAwayItem>;

  constructor(dbInstance: DB<PutAwayItem>) {
    this.db = dbInstance;
  }

  async saveDataAsync(data: PutAwayItem, itemId: string) {
    await this.db.save(
      `${data.warehouseLocation}/items/${data.clientId}-${data.vendorId}-${itemId}`,
      data
    );
  }

  async findByIdAsync(
    warehouseLocation: PutAwayItem["warehouseLocation"],
    clientId: PutAwayItem["clientId"],
    vendorId: PutAwayItem["vendorId"],
    itemId: string
  ) {
    if (!warehouseLocation || !clientId || !vendorId) {
      const missingParams = [];
      const paramMap: Record<string, any> = { warehouseLocation, clientId, vendorId };

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
      `${warehouseLocation}/items/${clientId}-${vendorId}-${itemId}`
    );
    return data;
  }

  async updateDataAsync(data: Partial<PutAwayItem>, itemId: string) {
    await this.db.update(
      `${data.warehouseLocation}/items/${data.clientId}-${data.vendorId}-${itemId}`,
      data
    );
  }

  async deleteDataAsync(
    warehouseLocation: PutAwayItem["warehouseLocation"],
    clientId: PutAwayItem["clientId"],
    vendorId: PutAwayItem["vendorId"],
    itemId: string
  ) {
    await this.db.delete(`${warehouseLocation}/items/${clientId}-${vendorId}-${itemId}`);
  }
}
