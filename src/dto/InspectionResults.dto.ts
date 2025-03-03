import { Item } from "./Item.dto";

// export type InspectionPoint = {
//   attributeName: string;
//   expected: string;
//   actual: string;
//   passed: boolean;
// };

export type InspectedItem = Item &{
  itemId: string;
  containsUnits: boolean;
  units: number;
  hasPassed: boolean;
  inspectionBatch?: string
  // inspectionPoints: Array<InspectionPoint>;
  // quality:
};

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
    id?: string
  }

export type InspectionResults = {
  inspectionBatchNo?: string; 
  inspectedItems: Array<InspectedItem>;
  inspectionDate: string;
  inspector: InspectorDetails;
  notes?: string;
  stockInId: string;
  clientId: string;
  vendorId: string;
  arrivalDate: string;
  // qualityRatings: Array<QualityRating>;
  // defectDetails?: Array<DefectDetail>;
};
