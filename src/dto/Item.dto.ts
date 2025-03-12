
export type Item = {
  id: string;
  companyId: string;
  itemQuantity: number;
  name?: string;
  sku?: string;
  skuQuantity?: number;
  stockLevel?: "LOW" | "OUT_OF_STOCK" | "IN_STOCK";
  itemCategory?: string;
  itemWeightKg?: number;
  itemHeightCm?: number;
  itemWidthCm?: number;
  itemLengthCm?: number;
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
