import { logger } from "./logger";

type METHOD = "get" | "post" | "put" | "patch" | "delete";

type NextFetchClient = {
  [key in METHOD]: <T>(url: string, option?: RequestInit) => Promise<T>;
};

interface Error {
  message: string;
}

const ResponseHandler = (res: Response) => {
  if (res.status >= 400) {
    throw new Error(`error status-code: ${res.status}`);
  }
  return res;
};

export const nextFetchClient: NextFetchClient = {
  get: async (url: string, option?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`, option)
      .then(ResponseHandler)
      .then((res) => res.json())
      .catch((error: Error) => {
        logger.error(`[api error]: GET ${url} ${error.message}`);
        throw new Error(error.message);
      });
  },

  post: async (url: string, option?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`, {
      method: "POST",
      ...option,
    })
      .then(ResponseHandler)
      .then((res) => res.json())
      .catch((error: Error) => {
        logger.error(`[api error]: POST ${url} ${error.message}`);
        throw new Error(error.message);
      });
  },

  put: async (url: string, option?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`, {
      method: "PUT",
      ...option,
    })
      .then(ResponseHandler)
      .then((res) => res.json())
      .catch((error: Error) => {
        logger.error(`[api error]: PUT ${url} ${error.message}`);
        throw new Error(error.message);
      });
  },

  patch: async (url: string, option?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`, {
      method: "PATCH",
      ...option,
    })
      .then(ResponseHandler)
      .then((res) => res.json())
      .catch((error: Error) => {
        logger.error(`[api error]: PATCH ${url} ${error.message}`);
        throw new Error(error.message);
      });
  },

  delete: async (url: string, option?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`, {
      method: "DELETE",
      ...option,
    })
      .then(ResponseHandler)
      .then((res) => res.json())
      .catch((error: Error) => {
        logger.error(`[api error]: DELETE ${url} ${error.message}`);
        throw new Error(error.message);
      });
  },
};
