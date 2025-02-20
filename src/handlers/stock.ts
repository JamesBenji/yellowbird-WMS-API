import { Request, Response } from "express-serve-static-core";
import { IncomingStock } from "../dto/IncomingStock.dto";
import { StockDeliveryStatus } from "../dto/StockDeliveryStatus.dto";

export const handleIncomingStock = (request: Request<{}, {}, IncomingStock>, response: Response) => {

}

export const handleStockDeliveryStatus = (request: Request<{}, {}, StockDeliveryStatus>, response: Response) => {

}