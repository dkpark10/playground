import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export type Response<T> = AxiosResponse<T>;

export type RequestConfig = AxiosRequestConfig;

export type Error = AxiosError;

export interface FetchClient {
  instance: AxiosInstance;
  get: <T>(url: string, config?: RequestConfig) => Promise<Response<T>>;
  post: <T, D>(url: string, data?: D, config?: RequestConfig) => Promise<Response<T>>;
  patch: <T, D>(url: string, data?: D, config?: RequestConfig) => Promise<Response<T>>;
  delete: <T>(url: string, config?: RequestConfig) => Promise<Response<T>>;
  put: <T, D>(url: string, data?: D, config?: RequestConfig) => Promise<Response<T>>;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error: Error) => {
    return Promise.reject(error.response?.status);
  },
);

export const fetchClient: FetchClient = {
  instance,

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
