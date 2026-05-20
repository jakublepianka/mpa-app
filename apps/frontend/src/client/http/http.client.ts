import { getOrCreateUserId } from "../identity/userId";

export const httpClient = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const userId = getOrCreateUserId();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "client-id": userId,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json() as Promise<T>;
};
