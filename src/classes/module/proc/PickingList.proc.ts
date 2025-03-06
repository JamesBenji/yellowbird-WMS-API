import { PickingListDTO } from "../../../dto/PickingList.dto";
import { StockOutOrderDTO } from "../../../dto/StockOutOrder.dto";
import { DB } from "../../../interfaces/databases/Database";

export class PickingList {
  db: DB<PickingListDTO>;
  constructor(DBInstance: DB<PickingListDTO>) {
    this.db = DBInstance;
  }

  async generatePickingList(
    stockOutOrder: StockOutOrderDTO
  ): Promise<PickingListDTO | null> {
    let pickingList: PickingListDTO;

    return null;
  }
}
