import { firestore } from "firebase-admin";

export type InspectionPoint = {
  attributeName: string;
  expected: string;
  actual: string;
  passed: boolean;
};

export type InspectedItem = {
  itemId: string;
  quantity: number;
  inspectionPoints: Array<InspectionPoint>;
};

export type RatingValue = "Pass" | "Fail" | "Conditional";

export type QualityRating = {
  itemId: string;
  rating: RatingValue;
  score?: number;
};

export type DefectDetail = {
  itemId: string;
  defectType: string;
  severity: string;
  description: string;
  photosUrls?: string[];
};

export type InspectorDetails = {
    name: string;
    id?: string
  }

export type InspectionResults = {
  inspectionId: string;
  inspectedItems: Array<InspectedItem>;
  qualityRatings: Array<QualityRating>;
  defectDetails?: Array<DefectDetail>;
  inspectorDetails: InspectorDetails;
  completionDate: Date;
  timestamp: firestore.Timestamp;
  notes?: string;
};
