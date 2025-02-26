import { IncomingStockStatus } from "../types/dto";

export interface IncomingStockResponse {
    status: IncomingStockStatus,
    batchNo: string,
}