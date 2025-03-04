import { firestore } from "firebase-admin";

export type ReceivedItem = {
  id: string;
  expectedQuantity: number;
  actualQuantity: number;
  condition: string;
};

export type DiscrepancyType = "Quantity" | "Condition" | "Wrong Item" | "Missing Item";

export type Discrepancy = {
  itemId: string;
  discrepancyType: DiscrepancyType;
  description: string;
  resolutionStatus?: string;
};

export type StockInType = {
  stockInId?: string; // set by server, client can ignore
  noticeId: string;
  actualArrivalDate: string;
  receivedItems: Array<ReceivedItem>;
  discrepancies: Array<Discrepancy>;
  receivedBy: string;
  notes?: string;
  clientId?: string;
  vendorId?: string;
  warehouseId: string;
}
