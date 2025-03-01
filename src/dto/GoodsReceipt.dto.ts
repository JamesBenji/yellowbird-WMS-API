import { firestore } from "firebase-admin";

export type ReceivedItem = {
  itemId: string;
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

export type GoodsReceipt = {
  receiptId: string;
  noticeId: string;
  actualArrivalDate: firestore.Timestamp;
  receivedItems: Array<ReceivedItem>;
  discrepancies: Array<Discrepancy>;
  receivedBy: string;
  notes?: string;
}
