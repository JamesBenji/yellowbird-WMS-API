/**
 * FIREBASE STORAGE STRUCTURE: Items/{companyId}/Items/{ItemId}
 */

export type ItemBatchFieldType = {
  batchNo: string;
  units: number;
  expiryDate: string;
};

export type ItemRiskLevels = 1 | 2 | 3 | 4 | 5;

export type ItemFragilityTypeValues =
  | "Breakable"
  | "Bendable"
  | "Puncturable"
  | "Water-sensitive"
  | "Stainable"
  | "Pressurized"
  | "Impact-resistant";

export type ItemSpecialConsiderations =
  | "Shatter risk"
  | "Moisture sensitivity"
  | "Staining risk"
  | "Deformation risk"
  | "Pressure sensitivity"
  | "Puncture risk"
  | "Temperature sensitivity"
  | "Impact sensitivity";

export type ItemFragilityType = {
  type: ItemFragilityTypeValues;
  material: string;
  riskLevel: ItemRiskLevels;
  specialConsiderations: Array<ItemSpecialConsiderations>;
  recommendedPackaging?: string;
};

export type ItemHazardousInfo = {
  isHazardous: boolean;
  hazardClass?: string;
  regulatoryInfo?: string;
};

export type ItemWeight = {
  value: number;
  unit: string;
};

export type ItemDimensions = {
  length: number;
  width: number;
  height: number;
  unit: "cm" | "m";
};

export type Item = {
  id: string;
  companyId: string;
  itemQuantity: number;
  name?: string;
  sku?: string;
  stockLevel?: "LOW" | "OUT_OF_STOCK" | "IN_STOCK";
  itemCategory?: string;
  itemWeightKg?: number;
  itemHeightCm?: number;
  itemWidthCm?: number;
  itemLengthCm?: number;
  itemTotalCost?: number;
  currency?: string;
  itemLabel?: string;
  itemDescription?: string;
  itemColor?: string;
  itemImageUrl?: string;
  passedInspection?: boolean;
  handlingRequirements?: {
    fragile?: boolean;
    hazardous?: boolean;
    medicalItem?: boolean;
    prescriptionRequired?: boolean;
    specialPackagingRequired?: boolean;
    uprightPositionRequired?: boolean;
    refrigerationRequired?: boolean;
    ageRestriction?: number;
    temperatureRange?: {
      min: number;
      max: number;
    };
    fragilityLevel?: "None" | "Low" | "Unspecified";
    isLightSensitive?: boolean;
    isWaterSensitive?: boolean;
    handlingInstructions?: string;
  };
};
