import { Item } from "./Item.dto";
import { SharedProperties } from "./shared/Shared.dto";

export type PickingListDTO = SharedProperties & {
  id: string; 
  stockOutOrderId: string; 
  warehouseId: string; 
  pickingListDay: number; //de-structured date fields to ease search
  pickingListMonth: number;
  pickingListYear: number;
  pickerId: string; 
  items: Array<Partial<Item>>;
  createdAt?: string; 
  completedAt?: string; 
  status: 'pending' | 'in-progress' | 'completed' | 'canceled';
  comments?: string; 
};
