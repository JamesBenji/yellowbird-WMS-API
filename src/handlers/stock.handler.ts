import { Request, Response } from "express-serve-static-core";
import { IncomingStockInterface } from "../dto/IncomingStock.dto";
import { StockDeliveryStatus } from "../dto/StockDeliveryStatus.dto";
import { CreateIncomingStockInstance } from "../config/dependencies";

export const handleIncomingStock = async (
  request: Request<{}, {}, IncomingStockInterface>,
  response: Response
) => {
  const data = request.body;
//   console.log({
//     incomingStock: data,
//   });

  const incomingStockInstance = CreateIncomingStockInstance(data);
  try {
    await incomingStockInstance.saveIncomingStockData();
  } catch (error) {
    console.error("Caught in stock.handler.ts");
    console.error(error);
  }
};

export const handleStockDeliveryStatus = (
  request: Request<{}, {}, StockDeliveryStatus>,
  response: Response
) => {};
