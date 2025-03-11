import { SharedProperties } from "./shared/Shared.dto";

export type ProcessedReturnedItem = {
  itemId: string;
  quantity: number;
  actualCondition: string;
  reportedCondition?: string;
  customerNotes?: string;
  photosUrls?: string[];
};

export type InspectionResults = {
  itemId: string;
  conditionGrade: string;
  comments: string;
};

export type ReturnAction = "Restock" | "Refurbish" | "Dispose" | "Return to Vendor";

export type DispositionDecision = {
  itemId: string;
  disposition: ReturnAction;
  notes?: string;
};

export type ReturnProcessingResult = SharedProperties & {
  returnId: string;
  receivedItems: Array<ProcessedReturnedItem>;
  inspectionResults: Array<InspectionResults>;
  dispositionDecisions: Array<DispositionDecision>;
  completionDate: Date;
};
