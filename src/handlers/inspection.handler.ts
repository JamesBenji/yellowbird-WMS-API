import { Request, Response } from "express-serve-static-core";
import { InspectionResults } from "../dto/InspectionResults.dto";
import { WMSResponse } from "../types/dto";
import { CreateInspectionInstance } from "../config/database.config";
import { errorHandlerInstance } from "../config/errorHandler.config";
import { InspectionGetById } from "../types/dto/Stock.dtotypes";

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

export const handleSaveInspection = async (
  request: Request<{}, {}, InspectionResults>,
  response: Response<WMSResponse<null>>
) => {
  const data = request.body;

  const inspectionInstance = CreateInspectionInstance();

  try {
    await inspectionInstance.saveDataAsync(data);
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

export const handleGetInspectionById = async (
  request: Request<{}, {}, {}, InspectionGetById>,
  response: Response<WMSResponse<InspectionResults>>
) => {
  const { stockInId, companyId, vendorId } = request.query;

  await checkMandatoryParameters(stockInId, companyId, vendorId, response);

  const inspectionInstance = CreateInspectionInstance();

  try {
    const data = await inspectionInstance.findByIdAsync(
      stockInId,
      companyId,
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
      data: data as InspectionResults,
    });
  } catch (error) {
    console.error("Caught in stock.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};

export const handleUpdateInspectionById = async (
  request: Request<{}, {}, Partial<InspectionResults>>,
  response: Response<WMSResponse<InspectionResults>>
) => {
  const data = request.body;

  await checkMandatoryParameters(
    data.stockInId,
    data.companyId,
    data.vendorId,
    response
  );

  const inspectionInstance = CreateInspectionInstance();

  try {
    await inspectionInstance.updateDataAsync(data);

    response.status(200).send({
      success: true,
      message: "Update successful",
    });
  } catch (error) {
    console.error("Caught in stock.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};

export const handleDeleteInspectionById = async (
  request: Request<{}, {}, {}, InspectionGetById>,
  response: Response<WMSResponse<InspectionResults>>
) => {
  const { stockInId, companyId, vendorId } = request.query;

  await checkMandatoryParameters(stockInId, companyId, vendorId, response);

  const inspectionInstance = CreateInspectionInstance();

  try {
    await inspectionInstance.deleteDataAsync(stockInId, companyId, vendorId);

    response.status(200).send({
      success: true,
      message: "Delete successful",
    });
  } catch (error) {
    console.error("Caught in stock.handler.ts :: handleStockIn");
    console.error(error);
    errorHandlerInstance.sendError(response, error);
  }
};
