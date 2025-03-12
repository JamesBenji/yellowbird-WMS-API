import { Item } from "./Item.dto";
import { SharedProperties } from "./shared/Shared.dto";

export type StockOutOrderDTO = SharedProperties & {
  id: string;
  companyId: string;
  items: Array<Partial<Item>>;
  comments?: string;
  logisticsProvider?: string;
  destinationAddress?: string;
};
