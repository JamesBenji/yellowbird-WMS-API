import { Request, Response } from "express-serve-static-core";
import {
  CreateStockInInstance,
} from "../config/database.config";
import { StockInType } from "../dto/StockIn.dto";
import { StockInGetById } from "../types/dto/Stock.dtotypes";
import { WMSResponse } from "../types/dto";
import { errorHandlerInstance } from "../config/errorHandler.config";


export const handleStockIn = async (
  request: Request<{}, {}, StockInType>,
  response: Response<WMSResponse<null>>
) => {
  const data = request.body;

  const stockInInstance = CreateStockInInstance();

  try {
    await stockInInstance.saveDataAsync(data);
    response.status(200).send({
      success: true,
      message: "Data saved successfully ",
    });
    return;
  } catch (error) {
    console.error("Caught in stock.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
    return;
  }
};

export const handleGetStockInById = async (
  request: Request<{}, {}, {}, StockInGetById>,
  response: Response<WMSResponse<StockInType>>
) => {
  const { batchNo } = request.query;

  // if (!stockInId && !companyId && !vendorId) {
  //   const parameters = [
  //     {
  //       name: "stockInId",
  //       value: stockInId,
  //     },
  //     {
  //       name: "companyId",
  //       value: companyId,
  //     },
  //     {
  //       name: "vendorId",
  //       value: vendorId,
  //     },
  //   ];

  //   const missingParameters = parameters.filter(
  //     (param) => !!param.value === false && param.name
  //   );

  //   const missingParametersString = missingParameters.join(", ");

  //   response.status(422).send({
  //     success: false,
  //     error: "Missing parameters",
  //     message: `${missingParametersString} ${
  //       missingParametersString.length > 1 ? "properties are" : "property is"
  //     } missing`,
  //   });

  //   return;
  // }

  const stockInInstance = CreateStockInInstance();

  try {
    const data = await stockInInstance.findByBatchNoAsync(
      batchNo
    );

    if (!data) {
      response.status(404).send({
        success: false,
        message: "No data found",
      });
      return;
    }

    response.status(200).send({
      success: true,
      data: data as StockInType,
    });
  } catch (error) {
    console.error("Caught in stock.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};

export const handleUpdateStockInById = async (
  request: Request<{}, {}, Partial<StockInType>, StockInGetById>,
  response: Response<WMSResponse<StockInType>>
) => {
  const data = request.body;
  const {batchNo} = request.query

  // if (!data.stockInId && !data.companyId && !data.vendorId) {
  //   const parameters = [
  //     {
  //       name: "stockInId",
  //       value: data.stockInId,
  //     },
  //     {
  //       name: "companyId",
  //       value: data.companyId,
  //     },
  //     {
  //       name: "vendorId",
  //       value: data.vendorId,
  //     },
  //   ];

  //   const missingParameters = parameters.filter(
  //     (param) => !!param.value === false && param.name
  //   );

  //   const missingParametersString = missingParameters.join(", ");

  //   response.status(422).send({
  //     success: false,
  //     error: "Missing parameters",
  //     message: `${missingParametersString} ${
  //       missingParametersString.length > 1 ? "properties are" : "property is"
  //     } missing`,
  //   });

  //   return;
  // }

  const stockInInstance = CreateStockInInstance();

  try {
    await stockInInstance.updateDataAsync(data, batchNo);
    
    response.status(200).send({
      success: true,
      message: 'Update successful'
    });

  } catch (error) {
    console.error("Caught in stock.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};


export const handleDeleteStockInById = async (
  request: Request<{}, {}, {}, StockInGetById>,
  response: Response<WMSResponse<StockInType>>
) => {
  const { batchNo } = request.query;

  // if (!stockInId && !companyId && !vendorId) {
  //   const parameters = [
  //     {
  //       name: "stockInId",
  //       value: stockInId,
  //     },
  //     {
  //       name: "companyId",
  //       value: companyId,
  //     },
  //     {
  //       name: "vendorId",
  //       value: vendorId,
  //     },
  //   ];

  //   const missingParameters = parameters.filter(
  //     (param) => !!param.value === false && param.name
  //   );

  //   const missingParametersString = missingParameters.join(", ");

  //   response.status(422).send({
  //     success: false,
  //     error: "Missing parameters",
  //     message: `${missingParametersString} ${
  //       missingParametersString.length > 1 ? "properties are" : "property is"
  //     } missing`,
  //   });

  //   return;
  // }

  const stockInInstance = CreateStockInInstance();

  try {
    await stockInInstance.deleteDataAsync(batchNo);
    
    response.status(200).send({
      success: true,
      message: 'Delete successful'
    });

  } catch (error) {
    console.error("Caught in stock.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};