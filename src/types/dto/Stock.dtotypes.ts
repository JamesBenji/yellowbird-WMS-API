type GetById = {
  clientId: string;
  vendorId: string;
};
export type StockInGetById = GetById & { stockInId: string };
export type InspectionGetById = GetById & { stockInId: string };
export type PutAwayGetById = GetById & {
  stockInId: string;
  itemId: string;
  warehouseLocation?: string;
};
export type StockOutGetById = GetById & { id: string };
export type DispatchedGetById = {
  stockOutOrderId: string;
  id: string
}
