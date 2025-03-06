import { Item } from "./Item.dto";

export type PickingListDTO = {
  id: string; 
  stockOutOrderId: string; 
  warehouseId: string; 
  pickerId: string; 
  items: Array<Item>;
  createdAt: string; 
  completedAt?: string; 
  status: 'pending' | 'in-progress' | 'completed' | 'canceled';
  notes?: string; 
};
