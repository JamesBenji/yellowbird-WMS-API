import { SharedProperties } from "./shared/Shared.dto";
import { Item } from "./Item.dto";

export type StockInType = SharedProperties & {
  batchNo?: string; // set by server, client application can ignore
  companyId?: string;
  incomingStockId: string; //reference to the incoming stock notification
  items: Array<Item>;
  arrivalDay: string; //de-structured date fields to ease search
  arrivalMonth: string;
  arrivalYear: string;
  receiverId: string;
  comments?: string;
  warehouseId: string;
  arrivalDateTimeMillis: number;
};
