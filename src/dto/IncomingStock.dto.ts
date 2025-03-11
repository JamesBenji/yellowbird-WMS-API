import { Item, ItemDimensions } from "./Item.dto";
import { SharedProperties } from "./shared/Shared.dto";

export type ClientContactPerson = {
  name?: string;
  email: string;
  phone?: string;
};

export type ItemWeight = {
  value: number;
  unit: "kg";
};

export type ExpectedItems = {
  id: string;
  name?: string;
  image: string
  description?: string;
  stockUnits: number;
  dimensions?: ItemDimensions;
  weight?: ItemWeight;
};

export type IncomingStockStatus = "PENDING" | "DELIVERED" | "FAILED";

export type transportInfo = {
  carrier: string;
};

// props from 
export type IncomingStockInterface = SharedProperties & {
  id?: string;
  items: Item[];
  description?: string;
  companyId: string;
  warehouseId: string;
  clientContactPerson?: ClientContactPerson | null;
  qrCode?: string;
  createdBy: string
  updatedBy: string
  expectedArrivalDateTimeMillis: string; 
};
