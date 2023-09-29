type Request = RequestInfo | URL;

type METHOD = "get" | "post" | "put" | "patch" | "delete";

type NextFetchClient = {
  [key in METHOD]: <T>(url: Request, option?: RequestInit) => Promise<T>;
};

export const nextFetchClient: NextFetchClient = {
  get: async (url: Request, option?: RequestInit) => {
    return fetch(url, option).then((res) => res.json());
  },

  post: async (url: Request, option?: RequestInit) => {
    return fetch(url, {
      method: "POST",
      ...option,
    }).then((res) => res.json());
  },

  put: async (url: Request, option?: RequestInit) => {
    return fetch(url, {
      method: "PUT",
      ...option,
    }).then((res) => res.json());
  },

  patch: async (url: Request, option?: RequestInit) => {
    return fetch(url, {
      method: "PATCH",
      ...option,
    }).then((res) => res.json());
  },

  delete: async (url: Request, option?: RequestInit) => {
    return fetch(url, {
      method: "DELETE",
      ...option,
    }).then((res) => res.json());
  },
};
