import { Item } from "./Item.dto";

export type InspectionTypeValues = 'Regular' | 'Detailed' | 'Quality Assurance' | 'Damage Assessment'

export type InspectionPriorityValues = 'Low' | 'Medium' | 'High' | 'Urgent'

export type InspectionOrder = {
    inspectionId: string;
    receiptId: string;
    itemsToInspect: Array<Item>;
    inspectionType: InspectionTypeValues;
    inspectionPriority: InspectionPriorityValues;
    dueDate: Date;
  }