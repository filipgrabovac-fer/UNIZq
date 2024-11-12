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
  const data = await fetch(
    `${
      import.meta.env.VITE_DEV ? "http://localhost:8080" : ""
    }/api/${endpointUrl}`,
    {
      method,
      body: JSON.stringify(body),
      headers,
    }
  ).then((data) => data.json());

  return data;
};
