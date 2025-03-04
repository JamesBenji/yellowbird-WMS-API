type GetById = {
  stockInId: string;
  clientId: string;
  vendorId: string
}
export type StockInGetById = GetById
export type InspectionGetById = GetById
export type PutAwayGetById = GetById & {
  itemId: string,
  warehouseLocation?: string;
}
