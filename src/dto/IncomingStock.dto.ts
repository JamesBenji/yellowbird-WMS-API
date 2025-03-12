import { Item } from "./Item.dto";
import { SharedProperties } from "./shared/Shared.dto";

export type IncomingStockInterface = SharedProperties & {
  id?: string;
  items: Item[];
  description?: string;
  companyId: string;
  warehouseId: string;
  clientContactPersonPhone?: string;
  clientContactPersonEmail?: string;
  clientContactPersonName?: string;
  qrCode?: string;
  createdBy: string
  updatedBy: string
  status: "PENDING" | "DELIVERED" | "FAILED"
  expectedArrivalDateTimeMillis: number; 
  documentId?: string; //set by server, client can ignores
};
