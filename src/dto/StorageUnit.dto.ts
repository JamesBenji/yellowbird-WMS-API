export type StorageUnitCapacityInfo = {
    maxWeight: number;
    maxVolume: number;
    currentUtilizationPercentage: number;
  }
export type StorageUnit = {
    storageUnitId: string;
    warehouseId: string;
    aisle: string;
    rack: string;
    bin: string;
    capacityInfo: StorageUnitCapacityInfo;
  }