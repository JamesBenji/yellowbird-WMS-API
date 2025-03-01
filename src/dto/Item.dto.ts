
/**
 * FIREBASE STORAGE STRUCTURE: Items/{clientId}/Items/{ItemId}
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
  unit: 'cm' | 'm';
};

export interface Item {
  itemId: string;
  sku?: string;
  description: string;
  category: string;
  dimensions?: ItemDimensions;
  weight?: ItemWeight;
  handlingInstructions?: string;
  hazardInfo?: ItemHazardousInfo;
  fragilityType: ItemFragilityType;
  batches?: ItemBatchFieldType[];
}
