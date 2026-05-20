export const createRequest = (
  method: "GET" | "POST" | "DELETE",
  body?: { term: string },
): RequestInit => ({
  headers: { "Content-Type": "application/json" },
  method: method,
  ...(body !== undefined && {
    body: JSON.stringify(body),
  }),
});
