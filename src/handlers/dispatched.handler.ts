import { Request, Response } from "express-serve-static-core";
import {
    CreatedDispatchedInstance,
  CreateStockOutOrderInstance,
} from "../config/database.config";
import { StockInType } from "../dto/StockIn.dto";
import { DispatchedGetById, StockOutGetById } from "../types/dto/Stock.dtotypes";
import { WMSResponse } from "../types/dto";
import { errorHandlerInstance } from "../config/errorHandler.config";
import { StockOutOrderDTO } from "../dto/StockOutOrder.dto";
import { DispatchedStockDTO } from "../dto/DispatchedStock.dto";

export const handleDispatchedStock = async (
  request: Request<{}, {}, DispatchedStockDTO>,
  response: Response<WMSResponse<null>>
) => {
  const data = request.body;

  const instance = CreatedDispatchedInstance();

  try {
    await instance.saveDataAsync(data);
    response.status(200).send({
      success: true,
      message: "Data saved successfully ",
    });
    return;
  } catch (error) {
    console.error("Caught in dispatched.handler.ts :: handleStockOut");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
    return;
  }
};

export const handleGetDispatchedStockById = async (
  request: Request<{}, {}, {}, DispatchedGetById>,
  response: Response<WMSResponse<DispatchedStockDTO>>
) => {
  const { id, stockOutOrderId } = request.query;

  if (!id && !stockOutOrderId) {
    const parameters = [
      {
        name: "id",
        value: id,
      },
      {
        name: "stockOutOrderId",
        value: stockOutOrderId,
      }      
    ];

    const missingParameters = parameters.filter(
      (param) => !!param.value === false && param.name
    );

    const missingParametersString = missingParameters.join(", ");

    response.status(422).send({
      success: false,
      error: "Missing parameters",
      message: `${missingParametersString} ${
        missingParametersString.length > 1 ? "properties are" : "property is"
      } missing`,
    });

    return;
  }

  const instance = CreatedDispatchedInstance();

  try {
    const data = await instance.findByIdAsync(
      id,
      stockOutOrderId
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
      data: data as DispatchedStockDTO,
    });
  } catch (error) {
    console.error("Caught in stockOut.handler.ts :: handleStockOut");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};

export const handleUpdateDispatchedStockById = async (
  request: Request<{}, {}, Partial<DispatchedStockDTO>>,
  response: Response<WMSResponse<DispatchedStockDTO>>
) => {
  const data = request.body;

  if (!data.id && !data.stockOutOrderId) {
    const parameters = [
      {
        name: "id",
        value: data.id,
      },
      {
        name: "stockOutOrderId",
        value: data.stockOutOrderId,
      }
    ];

    const missingParameters = parameters.filter(
      (param) => !!param.value === false && param.name
    );

    const missingParametersString = missingParameters.join(", ");

    response.status(422).send({
      success: false,
      error: "Missing parameters",
      message: `${missingParametersString} ${
        missingParametersString.length > 1 ? "properties are" : "property is"
      } missing`,
    });

    return;
  }

  const instance = CreatedDispatchedInstance();

  try {
    await instance.updateDataAsync(data);
    
    response.status(200).send({
      success: true,
      message: 'Update successful'
    });

  } catch (error) {
    console.error("Caught in Dispatched.handler.ts :: ");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};


export const handleDeleteDispatchedById = async (
  request: Request<{}, {}, {}, DispatchedGetById>,
  response: Response<WMSResponse<DispatchedStockDTO>>
) => {
  const { id, stockOutOrderId } = request.query;

  if (!id && !stockOutOrderId) {
    const parameters = [
      {
        name: "id",
        value: id,
      },
      {
        name: "stockOutOrderId",
        value: stockOutOrderId,
      },
    ];

    const missingParameters = parameters.filter(
      (param) => !!param.value === false && param.name
    );

    const missingParametersString = missingParameters.join(", ");

    response.status(422).send({
      success: false,
      error: "Missing parameters",
      message: `${missingParametersString} ${
        missingParametersString.length > 1 ? "properties are" : "property is"
      } missing`,
    });

    return;
  }

  const instance = CreatedDispatchedInstance();

  try {
    await instance.deleteDataAsync(id, stockOutOrderId);
    
    response.status(200).send({
      success: true,
      message: 'Delete successful'
    });

  } catch (error) {
    console.error("Caught in DispatchedStock.handler.ts :: handleStockOut");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};