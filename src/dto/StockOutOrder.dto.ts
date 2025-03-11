import { Item } from "./Item.dto";
import { SharedProperties } from "./shared/Shared.dto";

export type StockOutOrderDTO = SharedProperties & {
  id: string;
  companyId: string;
  items: Array<Partial<Item>>;
  comments?: string;
  stockOutOrderDay: string; //de-structured date fields to ease search
  stockOutOrderMonth: string;
  stockOutOrderYear: string;
  logisticsProvider?: string;
  destinationAddress?: string;
};
