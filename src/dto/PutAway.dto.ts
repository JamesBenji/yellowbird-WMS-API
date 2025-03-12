import { Item } from "./Item.dto";
import { SharedProperties } from "./shared/Shared.dto";

export type PutAwayItem = SharedProperties & {
  companyId: string;
  vendorId: string;
  batchNo: string;
  itemSku: string;
  item: Item;
  nearestExpirationDate?: string;
  status?: "active" | "expired" | "recalled";
  comments?: string;
  warehouseId: string;
};
