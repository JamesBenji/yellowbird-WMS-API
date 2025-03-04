import { Response } from "express-serve-static-core";

export interface ErrorHandlerInterface {
    sendError(response: Response, error: Error | string, message: string): void;
}
