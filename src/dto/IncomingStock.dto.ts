import { ClientContactPerson, ClientItem, StockOrigin } from "../types/dto";

export interface IncomingStockInterface {
    clientId: string;
    merchantId: string;
    stockOrigin: StockOrigin;
    warehouseId: string; 
    expectedDeliveryDateTime: string; 
    clientContactPerson: ClientContactPerson;
    items: ClientItem[];
    deliveryMode: string;
    logisticsPartnerId: string;
    orderSummaryLine: string;
    qrCode: string;
    notificationTimestamp: string;
    clientCallback: string;
    returnsClientCallback: string;
    status: string;
    specialInstructions: string;
  }