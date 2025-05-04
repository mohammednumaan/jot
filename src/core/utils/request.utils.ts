export async function apiPostRequest<PayloadType, ResponseType>(
  endpoint: string,
  payload: PayloadType
): Promise<ResponseType> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "cors",
      }
    );

    const responseData: ResponseType = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
}
