import { firestore } from "firebase-admin";
import { ItemDimensions } from "./Item.dto";

export type BatchItem = {
  itemId: string;
  initialUnitCount: number;
  remainingUnits: number;
  category: string;
  dimensions: ItemDimensions;
};

export type BatchStatus = "active" | "expired" | "recalled";

export type Batch = {
  batchNo: string;
  clientId: string;
  items: BatchItem[];
  arrivalDate: firestore.Timestamp;
  nearestExpirationDate?: firestore.Timestamp;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
  status?: BatchStatus;
  notes?: string;
};
