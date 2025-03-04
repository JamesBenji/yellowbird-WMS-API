/**
 * input: accepted stock with sku
 * output: save product storage locations
 * rules:
 * 1. must consider the available storage space and allocate a defined number of products to appropriate storage units
 * 2. can recommend stock movement to optimize storage space usage (uses StorageOptimization module)
 */

import { PutAwayItem } from "../../../dto/PutAway.dto";
import { DB } from "../../../interfaces/databases/Database";
import { Warehouse } from "../../entity/warehouse.entity";

export class PutAwayModule {
  private db: DB<PutAwayItem>;
  private warehouseInstance: Warehouse;

  constructor(dbInstance: DB<PutAwayItem>, warehouseInstance: Warehouse) {
    this.db = dbInstance;
    this.warehouseInstance = warehouseInstance;
  }

  async saveDataAsync(data: PutAwayItem, itemId: string) {
    await this.db.save(
      `${data.clientId}-${data.vendorId}/${data.stockInId}/${itemId}`,
      data
    );

    // update the warehouse collection
    await this.warehouseInstance.saveDataAsync(data, itemId);
  }

  async findByIdAsync(
    stockInId: PutAwayItem["stockInId"],
    clientId: PutAwayItem["clientId"],
    vendorId: PutAwayItem["vendorId"],
    itemId: string
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
      `${clientId}-${vendorId}/${stockInId}/${itemId}`
    );
    return data;
  }

  async updateDataAsync(data: Partial<PutAwayItem>, itemId: string) {
    await this.db.update(
      `${data.clientId}-${data.vendorId}/${data.stockInId}/${itemId}`,
      data
    );

    // await this.warehouseInstance.updateDataAsync(data, itemId);
  }

  async deleteDataAsync(
    stockInId: PutAwayItem["stockInId"],
    clientId: PutAwayItem["clientId"],
    vendorId: PutAwayItem["vendorId"],
    warehouseLocation: PutAwayItem["warehouseLocation"],
    itemId: string
  ) {
    await this.db.delete(`${clientId}-${vendorId}/${stockInId}/${itemId}`);
    
    this.warehouseInstance.deleteDataAsync(
      warehouseLocation,
      clientId,
      vendorId,
      itemId
    );

    //   const record = this.warehouseInstance.findByIdAsync(
    //     warehouseLocation,
    //     clientId,
    //     vendorId,
    //     itemId
    //   );
  }
}
