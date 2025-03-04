import { Response } from "express-serve-static-core";
import { ErrorHandlerInterface } from "../../interfaces/error/ErrorHandlerInterface";

export class ErrorHandler implements ErrorHandlerInterface {
  constructor() {
  }

  sendError(response: Response, error: Error | string | unknown, message: string = "") {
    const errorObject = {
      success: false,
      error,
      message,
    };
    response.status(500).send(errorObject);
  }
}
