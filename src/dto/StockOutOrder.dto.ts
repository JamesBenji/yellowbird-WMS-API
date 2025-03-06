import { Item } from "./Item.dto";

export type StockOutOrderDTO = {
    id: string; 
    clientId: string; 
    vendorId: string; 
    warehouseId: string; 
    orderReference: string; 
    items: Array<Item>;
    createdAt: string; 
    prepareBy: string;
    notes?: string; 
    logisticsBy: string;
    status: 'pending' | 'fulfilled' | 'canceled';
  };
  