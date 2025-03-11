import { Request, Response } from "express-serve-static-core";
import { WMSResponse } from "../types/dto";
import { CreatePutAwayInstance } from "../config/database.config";
import { errorHandlerInstance } from "../config/errorHandler.config";
import { PutAwayGetById } from "../types/dto/Stock.dtotypes";
import { PutAwayItem } from "../dto/PutAway.dto";

const checkMandatoryParameters = async (
  stockInId: string | undefined,
  companyId: string | undefined,
  vendorId: string | undefined,
  response: Response
) => {
  if (!stockInId && !companyId && !vendorId) {
    const parameters = [
      {
        name: "stockInId",
        value: stockInId,
      },
      {
        name: "companyId",
        value: companyId,
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
};

export const handleSavePutAway = async (
  request: Request<{}, {}, PutAwayItem>,
  response: Response<WMSResponse<null>>
) => {
  const data = request.body;

  const putAwayInstance = CreatePutAwayInstance();

  try {
    await putAwayInstance.saveDataAsync(data, data.item.id);
    response.status(200).send({
      success: true,
      message: "Data saved successfully ",
    });
    return;
  } catch (error) {
    console.error("Caught in putaway.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
    return;
  }
};

export const handleGetPutAwayById = async (
  request: Request<{}, {}, {}, PutAwayGetById>,
  response: Response<WMSResponse<PutAwayItem>>
) => {
  const { stockInId, companyId, vendorId, itemId } = request.query;

  if (!itemId) {
    response.status(422).send({
      success: false,
      error: "Missing parameters",
      message: "itemId parameter is missing",
    });

    return;
  }

  await checkMandatoryParameters(stockInId, companyId, vendorId, response);

  const putAwayInstance = CreatePutAwayInstance();

  try {
    const data = await putAwayInstance.findByIdAsync(
      stockInId,
      companyId,
      vendorId,
      itemId
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
      data: data as PutAwayItem,
    });
  } catch (error) {
    console.error("Caught in putaway.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};

export const handleUpdatePutAwayById = async (
  request: Request<{}, {}, Partial<PutAwayItem >, {itemId: string}>,
  response: Response<WMSResponse<PutAwayItem>>
) => {
  const data = request.body;
  const {itemId} = request.query

  if (!data) {
    response.status(422).send({
      success: false,
      error: "Data from body is empty",
      message: "Empty body",
    });
    return;
  }

  // if (!data.has) {
  //   response.status(422).send({
  //     success: false,
  //     error: "Missing parameters",
  //     message: "itemId parameter is missing",
  //   });

  //   return;
  // }

  await checkMandatoryParameters(
    data.stockInId,
    data.companyId,
    data.vendorId,
    response
  );

  const putAwayInstance = CreatePutAwayInstance();

  try {
    await putAwayInstance.updateDataAsync(data, itemId);

    response.status(200).send({
      success: true,
      message: "Update successful",
    });
  } catch (error) {
    console.error("Caught in PutAway.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};

export const handleDeletePutAwayById = async (
  request: Request<{}, {}, {}, PutAwayGetById>,
  response: Response<WMSResponse<PutAwayItem>>
) => {
  const {
    stockInId,
    companyId,
    vendorId,
    warehouseLocation,
    itemId,
  }: PutAwayGetById = request.query;

  await checkMandatoryParameters(stockInId, companyId, vendorId, response);

  if (!warehouseLocation || !itemId) {
    const missing = [];
    if (!warehouseLocation) missing.push("warehouseLocation");
    if (!itemId) missing.push("itemId");

    const msg = missing.join(", ");
    response.status(422).send({
      success: false,
      error: "Missing parameters",
      message: `${msg} missing`,
    });
    return;
  }

  const putAwayInstance = CreatePutAwayInstance();

  try {
    await putAwayInstance.deleteDataAsync(
      stockInId,
      companyId,
      vendorId,
      warehouseLocation,
      itemId
    );

    response.status(200).send({
      success: true,
      message: "Delete successful",
    });
  } catch (error) {
    console.error("Caught in PutAway.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};
