import { PickingListDTO } from "../../../dto/PickingList.dto";
import { StockOutOrderDTO } from "../../../dto/StockOutOrder.dto";
import { DB } from "../../../interfaces/databases/Database";
import { DateSearchObjectType } from "../../../types/dto";

export class PickingList {
  db: DB<PickingListDTO>;
  constructor(DBInstance: DB<PickingListDTO>) {
    this.db = DBInstance;
  }

  generateUniqueId() {
    const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const sequence = Math.floor(Math.random() * 9000) + 1000;
    return `STOCK-IN-${timestamp}-${sequence}`;
  }

  async generatePickingList(
    stockOutOrder: StockOutOrderDTO, 
    warehouseId: string
  ): Promise<void | null> {

    // if (stockOutOrder.status !== "pending") {
    //   throw new Error("Picking list can only be generated for pending orders.");
    // }

    const id = this.generateUniqueId()

    const pickingList: PickingListDTO = {
      id, 
      stockOutOrderId: stockOutOrder.id,
      warehouseId: warehouseId,
      pickerId: "", 
      items: stockOutOrder.items,
      creationDateTimeMillis: new Date().getTime(),
      status: "pending",
      comments: stockOutOrder.comments,
    };

    try {
      await this.db.save(`${id}`, pickingList);
      // return pickingList;
    } catch (error) {
      console.error("Error generating picking list:", error);
      return null;
    }

  }

  async searchByDate(props: DateSearchObjectType) {
      await this.db.searchByDate(props)
    }
}
