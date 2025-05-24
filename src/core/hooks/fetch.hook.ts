import { useEffect, useState } from "react";
import { ApiErrorResponse, ApiSucessResponse } from "../types/api/response";
import { apiGetRequest } from "../utils/request.utils";
import { asyncResponseErrorHandler } from "../errors/errors";

export default function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await apiGetRequest<
        ApiErrorResponse | ApiSucessResponse<T>
      >(endpoint);
      if (response.success) {
        setData(response.data);
        setLoading(false);
        setError(null);
      } else {
        const errors = asyncResponseErrorHandler(response);
        setError(errors);
      }
      setLoading(false);
    }

    getData();
  }, [endpoint]);

  return {
    data,
    error,
    loading,
  };
}
