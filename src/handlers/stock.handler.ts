import { Request, Response } from "express-serve-static-core";
import { IncomingStockInterface } from "../dto/IncomingStock.dto";
import { StockDeliveryStatus } from "../dto/StockDeliveryStatus.dto";
import { CreateIncomingStockInstance, CreateStockInInstance } from "../config/database.config";
import { StockInType } from "../dto/StockIn.dto";

export const handleIncomingStock = async (
  request: Request<{}, {}, IncomingStockInterface>,
  response: Response
) => {
  const data = request.body;

  const incomingStockInstance = CreateIncomingStockInstance();
  
  try {
    await incomingStockInstance.saveData(data);
  } catch (error) {
    console.error("Caught in stock.handler.ts :: handleIncomingStock");
    console.error(error);
  }
};

export const handleStockIn = async (request: Request<{}, {}, StockInType>, response: Response) => {
  const data = request.body

  const stockInInstance = CreateStockInInstance();

  try {
    await stockInInstance.saveData(data)
  } catch (error) {
    console.error("Caught in stock.handler.ts :: handleStockIn");
    console.error(error);
  }
}

// export const handleStockDeliveryStatus = (
//   request: Request<{}, {}, StockDeliveryStatus>,
//   response: Response
// ) => {};
