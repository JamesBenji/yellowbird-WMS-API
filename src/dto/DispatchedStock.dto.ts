import { Item } from "./Item.dto";
import { SharedProperties } from "./shared/Shared.dto";

export type LogisticsDetails = {
  logisticsProvider: string;
  plateNumber: string;
  driverName?: string;
  contactNumber?: string;
  vehicleType: string;
};

export type DispatchedStockDTO = SharedProperties & {
  id: string;
  stockOutOrderId: string;
  warehouseId: string;
  dispatchedBy: string;
  items: Array<Item>;
  logisticsDetails?: LogisticsDetails;
  logisticsProviderName: string;
  logisticsProviderPlateNumber?: string;
  logisticsProviderDriverName?: string;
  logisticsProviderContactNumber?: string;
  logisticsProviderVehicleType?: string;
  comments?: string;
  qrCode?: string;
};
