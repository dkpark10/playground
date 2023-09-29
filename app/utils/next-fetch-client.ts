type METHOD = "get" | "post" | "put" | "patch" | "delete";

type NextFetchClient = {
  [key in METHOD]: <T>(url: string, option?: RequestInit) => Promise<T>;
};

export const nextFetchClient: NextFetchClient = {
  get: async (url: string, option?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`, option).then((res) => res.json());
  },

  post: async (url: string, option?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`, {
      method: "POST",
      ...option,
    }).then((res) => res.json());
  },

  put: async (url: string, option?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`, {
      method: "PUT",
      ...option,
    }).then((res) => res.json());
  },

  patch: async (url: string, option?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`, {
      method: "PATCH",
      ...option,
    }).then((res) => res.json());
  },

  delete: async (url: string, option?: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${url}`, {
      method: "DELETE",
      ...option,
    }).then((res) => res.json());
  },
};
