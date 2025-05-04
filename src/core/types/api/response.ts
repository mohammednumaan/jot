interface ApiSucessResponse<T> {
  success: true;
  message: string | null;
  statusCode: number;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  apiErrorCode: string;
  statusCode: number;
  data: null;
  error: any;
}

export type {
  ApiErrorResponse,
  ApiSucessResponse
}
