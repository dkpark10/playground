import axios, {
  AxiosResponse,
  type AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import type { Method } from './endpoint';

const baseURL = 'https://example.com';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

export interface Request<Body> {
  url: URL;
  method: Method;
  body?: Body;
  headers?: Record<string, any>;
}

export interface Response<D> {
  status: number;
  data: D;
}

export abstract class Client {
  protected baseURL = baseURL;

  protected instance: AxiosInstance;

  constructor() {
    this.instance = axiosInstance;
  }

  protected response<Data>(response: AxiosResponse<Data>): Response<Data> {
    const { status, data } = response;
    return { status, data };
  }

  protected transform<Body>({ url, method, body }: Request<Body>): AxiosRequestConfig {
    return {
      url: url.href,
      method,
      data: body,
    };
  }
}
