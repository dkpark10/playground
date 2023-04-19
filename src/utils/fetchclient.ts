import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type Response<T> = Promise<AxiosResponse<T>>;

export type RequestConfig = AxiosRequestConfig;

export interface HttpClient {
  instance: AxiosInstance;
  get: <T>(url: string, config?: RequestConfig) => Response<T>;
  post: <T, D>(url: string, data?: D, config?: RequestConfig) => Response<T>;
  patch: <T, D>(url: string, data?: D, config?: RequestConfig) => Response<T>;
  delete: <T>(url: string, config?: RequestConfig) => Response<T>;
  put: <T, D>(url: string, data?: D, config?: RequestConfig) => Response<T>;
}

export const fetchClient: HttpClient = {
  instance: axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  }),

  get<T>(url: string, config?: RequestConfig) {
    return this.instance.get<T>(url, config);
  },

  post<T, D>(url: string, data?: D, config?: RequestConfig) {
    return this.instance.post<T>(url, data, config);
  },

  patch<T, D>(url: string, data?: D, config?: RequestConfig) {
    return this.instance.patch<T>(url, data, config);
  },

  delete<T>(url: string, config?: RequestConfig) {
    return this.instance.delete<T>(url, config);
  },

  put<T, D>(url: string, data?: D, config?: RequestConfig) {
    return this.instance.put<T>(url, data, config);
  },
};
