/**
 * input: accepted stock with sku
 * output: save product storage locations
 * rules:
 * 1. must consider the available storage space and allocate a defined number of products to appropriate storage units
 * 2. can recommend stock movement to optimize storage space usage (uses StorageOptimization module)
 */

import { PutAwayItem } from "../../../dto/PutAway.dto";
import { DB } from "../../../interfaces/databases/Database";
import { DateSearchObjectType } from "../../../types/dto";
import { generateNamedId } from "../../../utils/functions";
import { Warehouse } from "../../entity/warehouse.entity";

export class PutAwayModule {
  private db: DB<PutAwayItem>;
  private warehouseInstance: Warehouse;

  constructor(dbInstance: DB<PutAwayItem>, warehouseInstance: Warehouse) {
    this.db = dbInstance;
    this.warehouseInstance = warehouseInstance;
  }

  generatePutAwayId() {
    return generateNamedId("PUTAWAY");
  }

  async saveDataAsync(data: PutAwayItem, itemSku: PutAwayItem["itemSku"],) {
    await this.db.save(
      `${this.generatePutAwayId()}`,
      data
    );

    // update the warehouse collection
    await this.warehouseInstance.saveDataAsync(data);
  }

  async findByItemId(props: {[key: string]: string | number}) {
    return {}
  }


  async updateDataAsync(data: Partial<PutAwayItem>, itemSku: PutAwayItem["itemSku"],) {
    await this.db.update(
      `${itemSku}`,
      data
    );

    await this.warehouseInstance.updateDataAsync(data, itemSku);
  }

  async deleteDataAsync(
    itemSku: PutAwayItem["itemSku"],
  ) {
    await this.db.delete(`${itemSku}`);

    this.warehouseInstance.deleteDataAsync(
      itemSku
    );

  }

  async searchByDate(props: DateSearchObjectType) {
      await this.db.searchByDate(props)
    }
}
