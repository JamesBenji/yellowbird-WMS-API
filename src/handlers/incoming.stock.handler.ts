import { CreateIncomingStockInstance } from "../config/database.config";
import { errorHandlerInstance } from "../config/errorHandler.config";
import { IncomingStockInterface } from "../dto/IncomingStock.dto";
import { Request, Response } from "express-serve-static-core";
import {
  GetIncomingStockById,
  SearchByDateType,
} from "../types/dto/Stock.dtotypes";
import { WMSResponse } from "../types/dto";

export const handleIncomingStock = async (
  request: Request<{}, {}, IncomingStockInterface>,
  response: Response
) => {
  const data = request.body;
  console.log("handleIncomingStock running");

  const incomingStockInstance = CreateIncomingStockInstance();

  try {
    // console.log("handleIncomingStock running: try-catch block");

    const results = await incomingStockInstance.saveDataAsync(data);
    response.status(200).send(results);
  } catch (error) {
    console.error("Caught in incoming.stock.handler.ts :: handleIncomingStock");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};

export const handleGetById = async (
  request: Request<{}, {}, {}, GetIncomingStockById>,
  response: Response<WMSResponse<IncomingStockInterface>>
) => {
  try {
    const { id } = request.query;

    if (!id) {
      throw new Error("id parameter is undefined");
    }

    const instance = CreateIncomingStockInstance();

    const results = await instance.findNotificationById(id);
    if (results) {
      response.send({
        success: true,
        data: results as IncomingStockInterface,
      });
    } else {
      response.send({
        success: false,
        data: null,
        message: "data is null",
      });
    }
    return;
  } catch (error) {
    console.error("Caught in incoming.stock.handler.ts :: handleIncomingStock");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};

export const handleSearchByDate = async (
  request: Request<{}, {}, {}, SearchByDateType>,
  response: Response<WMSResponse<IncomingStockInterface[]>>
) => {
  try {
    const params = request.query;

    const instance = CreateIncomingStockInstance();

    const results = await instance.searchByDateAsync(params);
    // console.log({ results });

    if (!results) {
      response.status(200).send({
        success: true,
        data: null,
        message: "data is null",
      });
      return;
    }

    response.status(200).send({
      success: true,
      data: results as IncomingStockInterface[],
    });

    return;
  } catch (error) {
    console.error("Caught in incoming.stock.handler.ts :: handleIncomingStock");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};
