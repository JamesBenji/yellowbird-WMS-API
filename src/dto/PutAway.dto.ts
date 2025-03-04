import { Item } from "./Item.dto";

export type ItemStatus = "active" | "expired" | "recalled";

export type PutAwayItem = {
  inspectionBatchNo: string;
  clientId: string;
  vendorId: string;
  stockInId: string;
  item: Item;
  arrivalDate: string;
  nearestExpirationDate?: string;
  putAwayDate: string;
  status?: ItemStatus;
  notes?: string;
  warehouseLocation: string;
};
