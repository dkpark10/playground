import { Client, type Response } from './client';
import type { Method, QueryParams, EndPoint } from './endpoint';

export class ApiClient<
  Url extends EndPoint,
  Data extends any = any,
  Body extends Record<string, any> = any,
> extends Client {
  private url: URL;

  private body: Body;

  private method: Method = 'get';
  
  private headers: Record<string, any> = {};

  constructor() {
    super();
  }

  public setUrl(url: Url) {
    try {
      this.url = new URL(`${this.baseURL}/${url}`);
      return this;
    } catch (error) {
      console.error('URL error', error);
      return this;
    }
  }

  public setMethod<M extends Method = 'get'>(method: M) {
    this.method = method;
    return this;
  }

  public setQuery<K extends keyof QueryParams[Url]>(
    key: K,
    value: QueryParams[Url][typeof key]
  ) {
    if (!this.url) throw new Error('url이 설정되어 있지 않습니다.');

    this.url.searchParams.set(String(key), String(value));
    return this;
  }

  public setBody(body: Body) {
    this.body = body;
    return this;
  }

  public async retrieve(): Promise<Response<Data>> {
    const reqData = this.transform<Body>({
      url: this.url,
      method: this.method,
      body: this.body,
      headers: this.headers,
    });
    return await this.instance<Data>(reqData).then((res) => this.response(res));
  }
}
