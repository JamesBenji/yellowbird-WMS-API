export type AccountType = "ADMIN" | "WH_CLIENT" | "WMS_USER";

type ErrorOrFailedResponse = {
  success: boolean;
  error?: string | Error;
  message?: string;
};

type SuccessResponse<T> = {
    success: boolean,
    data?: T,
    message?: string
}

export type WMSResponse<T> = SuccessResponse<T> | ErrorOrFailedResponse