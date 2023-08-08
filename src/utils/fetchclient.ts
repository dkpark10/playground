/* eslint-disable no-useless-catch */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export type RequestConfig = AxiosRequestConfig;

export type Error = AxiosError;

export interface HttpClient {
  instance: AxiosInstance;
  get: <T>(url: string, config?: RequestConfig) => Promise<AxiosResponse<T>>;
  post: <T, D>(url: string, data?: D, config?: RequestConfig) => Promise<AxiosResponse<T>>;
  patch: <T, D>(url: string, data?: D, config?: RequestConfig) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string, config?: RequestConfig) => Promise<AxiosResponse<T>>;
  put: <T, D>(url: string, data?: D, config?: RequestConfig) => Promise<AxiosResponse<T>>;
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
  (error) => {
    console.log(error.response.status);
    return Promise.reject({ data: error.response.status });
  },
);

export const fetchClient: HttpClient = {
  instance,

  get<T>(url: string, config?: RequestConfig): Promise<any> {
    try {
      return this.instance.get<T>(url, config);
    } catch (error: any) {
      throw error;
    }
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
