export async function apiGetRequest<ResponseType>(
  endpoint: string
): Promise<ResponseType> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );

    const responseData: ResponseType = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
}

export async function apiPutOrPostRequest<PayloadType, ResponseType>(
  endpoint: string,
  payload: PayloadType,
  method: string = "POST"
): Promise<ResponseType> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
      {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "cors",
        credentials: "include",
      }
    );

    const responseData: ResponseType = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
}

export async function apiDeleteRequest<ResponseType>(endpoint: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
      {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      }
    );

    const responseData: ResponseType = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
}
