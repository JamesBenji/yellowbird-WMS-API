import { SharedProperties } from "./shared/Shared.dto";

export type StorageUnit = SharedProperties & {
  id: string;
  warehouseId: string;
  aisle?: string;
  rack?: string;
  bin?: string;
};
