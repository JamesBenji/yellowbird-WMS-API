import { Request, Response } from "express-serve-static-core";
import { IncomingStockInterface } from "../dto/IncomingStock.dto";
import {
  CreateIncomingStockInstance,
  CreateStockInInstance,
  CreateStockOutOrderInstance,
} from "../config/database.config";
import { StockInType } from "../dto/StockIn.dto";
import { StockInGetById, StockOutGetById } from "../types/dto/Stock.dtotypes";
import { WMSResponse } from "../types/dto";
import { errorHandlerInstance } from "../config/errorHandler.config";
import { StockOutOrder } from "../classes/module/proc/StockOutOrder.proc";
import { StockOutOrderDTO } from "../dto/StockOutOrder.dto";

export const handleStockOut = async (
  request: Request<{}, {}, StockOutOrderDTO>,
  response: Response<WMSResponse<null>>
) => {
  const data = request.body;

  const stockOutInstance = CreateStockOutOrderInstance();

  try {
    await stockOutInstance.saveDataAsync(data);
    response.status(200).send({
      success: true,
      message: "Data saved successfully ",
    });
    return;
  } catch (error) {
    console.error("Caught in stockOut.handler.ts :: handleStockOut");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
    return;
  }
};

export const handleGetStockOutById = async (
  request: Request<{}, {}, {}, StockOutGetById>,
  response: Response<WMSResponse<StockOutOrderDTO>>
) => {
  const { id, clientId, vendorId } = request.query;

  if (!id && !clientId && !vendorId) {
    const parameters = [
      {
        name: "id",
        value: id,
      },
      {
        name: "clientId",
        value: clientId,
      },
      {
        name: "vendorId",
        value: vendorId,
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

  const stockOutInstance = CreateStockOutOrderInstance();

  try {
    const data = await stockOutInstance.findByIdAsync(
      id,
      clientId,
      vendorId
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
      data: data as StockOutOrderDTO,
    });
  } catch (error) {
    console.error("Caught in stockOut.handler.ts :: handleStockOut");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};

export const handleUpdateStockOutById = async (
  request: Request<{}, {}, Partial<StockOutOrderDTO>>,
  response: Response<WMSResponse<StockOutOrderDTO>>
) => {
  const data = request.body;

  if (!data.id && !data.clientId && !data.vendorId) {
    const parameters = [
      {
        name: "id",
        value: data.id,
      },
      {
        name: "clientId",
        value: data.clientId,
      },
      {
        name: "vendorId",
        value: data.vendorId,
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

  const stockOutInstance = CreateStockOutOrderInstance();

  try {
    await stockOutInstance.updateDataAsync(data);
    
    response.status(200).send({
      success: true,
      message: 'Update successful'
    });

  } catch (error) {
    console.error("Caught in stockOut.handler.ts :: handleStockOut");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};


export const handleDeleteStockOutById = async (
  request: Request<{}, {}, {}, StockOutGetById>,
  response: Response<WMSResponse<StockInType>>
) => {
  const { id, clientId, vendorId } = request.query;

  if (!id && !clientId && !vendorId) {
    const parameters = [
      {
        name: "id",
        value: id,
      },
      {
        name: "clientId",
        value: clientId,
      },
      {
        name: "vendorId",
        value: vendorId,
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

  const stockOutInstance = CreateStockOutOrderInstance();

  try {
    await stockOutInstance.deleteDataAsync(id, clientId, vendorId);
    
    response.status(200).send({
      success: true,
      message: 'Delete successful'
    });

  } catch (error) {
    console.error("Caught in stockOut.handler.ts :: handleStockOut");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};