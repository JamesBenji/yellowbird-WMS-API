import { SharedProperties } from "./shared/Shared.dto";
import { Item } from "./Item.dto";

export type StockInType = SharedProperties & {
  batchNo?: string; // set by server, client application can ignore
  companyId?: string;
  incomingStockId: string; //reference to the incoming stock notification
  items: Array<Item>;
  receiverId: string;
  comments?: string;
  warehouseId: string;
  arrivalDateTimeMillis: number;
};
