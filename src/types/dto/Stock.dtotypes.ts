type GetById = {
  id?: string;
};
export type StockInGetById = GetById & { batchNo: string };
export type InspectionGetById = GetById & { batchNo: string };
export type PutAwayGetById = GetById & {
  itemSku?: string;
  productId?: string;
  warehouseId?: string;
};
export type StockOutGetById = GetById;
export type DispatchedGetById = {
  stockOutOrderId: string;
  id: string;
};

export type GetIncomingStockById = GetById;
export type SearchByDateType = {
  day?: number;
  month?: number;
  year?: number;
};
