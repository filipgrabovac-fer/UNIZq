type CustomFetchType = {
  endpointUrl: string;
  method: string;
  body?: Record<string, string>;
  headers?: Record<string, string>;
};

export const customFetch = async ({
  endpointUrl,
  method,
  body,
  headers,
}: CustomFetchType) => {
  return await fetch(`http://mock-database-url/${endpointUrl}`, {
    method,
    body: JSON.stringify(body),
    headers,
  }).then((data) => data.json);
};