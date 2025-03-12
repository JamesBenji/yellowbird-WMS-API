import { Item } from "./Item.dto";
import { SharedProperties } from "./shared/Shared.dto";

// export type InspectionPoint = {
//   attributeName: string;
//   expected: string;
//   actual: string;
//   passed: boolean;
// };

// export type InspectedItem = Item & {
//   itemId: string;
//   containsUnits: boolean;
//   units: number;
//   hasPassed: boolean;
//   inspectionBatch?: string;
//   // inspectionPoints: Array<InspectionPoint>;
//   // quality:
// };

// export type RatingValue = "Pass" | "Fail" | "Conditional";

// export type QualityRating = {
//   itemId: string;
//   rating: RatingValue;
//   score?: number;
// };

// export type DefectDetail = {
//   itemId: string;
//   defectType: string;
//   severity: string;
//   description: string;
//   photosUrls?: string[];
// };

export type InspectorDetails = {
  name: string;
  id?: string;
};

export type InspectionResults = SharedProperties & {
  batchNo: string; //from StockInType
  inspectedItems: Array<Item>;
  inspector: InspectorDetails;
  notes?: string;
  companyId: string;
  inspectionDateTimeMillis: string;
  inspectionStartDateTimeMillis: number;
  inspectionEndDateTimeMillis: number;
  observations: string; //inspectionReport
};
