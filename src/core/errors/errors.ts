import { ApiErrorResponse } from "../types/api/response";

export function asyncResponseErrorHandler(response: ApiErrorResponse) {
  let errorMsgs: string[] = [];

  switch (response.statusCode) {
    case 400:
      errorMsgs.push(response.message);
      break;

    case 422:
      for (const field in response.error.fieldErrors) {
        const error = response.error.fieldErrors
        error[field].forEach((err: string) => {
            errorMsgs.push(err);
        })
      }
      break;
  }

  return errorMsgs;
}
