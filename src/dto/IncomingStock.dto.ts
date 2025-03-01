import { Item, ItemDimensions } from "./Item.dto";

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
  description?: string;
  stockUnits: number;
  dimensions?: ItemDimensions;
  weight?: ItemWeight;
};

export type IncomingStockStatus = "PENDING" | "DELIVERED" | "FAILED";

export type transportInfo = {
  carrier: string;
};

export type IncomingStockInterface = {
  noticeId?: string;
  clientId: string;
  vendorId: string;
  warehouseId: string;
  clientContactPerson?: ClientContactPerson;
  items: ExpectedItems[];
  expectedArrivalDate: string;
  orderSummaryLine?: string;
  qrCode?: string;
  callback: string;
  timestamp: string;
};
