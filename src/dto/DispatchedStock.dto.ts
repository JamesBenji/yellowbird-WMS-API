import { Item } from "./Item.dto";

export type LogisticsDetails = {
  logisticsProvider: string;
  plateNumber: string;
  driverName?: string;
  contactNumber?: string;
  vehicleType: string;
};

export type DispatchedStockDTO = {
  id: string;
  stockOutOrderId: string;
  warehouseId: string;
  dispatchedBy: string;
  items: Array<Item>;
  trackingNumber?: string;
  logisticsDetails?: LogisticsDetails;
  status: "dispatched" | "returned";
  dispatchedAt: string;
  notes?: string;
};
