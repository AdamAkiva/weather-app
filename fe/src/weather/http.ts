import { ky } from '@/utils';

/**********************************************************************************/

export default class Http {
  private readonly _handler;

  public constructor() {
    this._handler = ky.create({
      cache: 'default',
      window: null,
      throwHttpErrors: true,
      timeout: 8_000,
      retry: 1
    });
  }

  public async get<T = unknown>(url: string) {
    return await this._handler.get(url).json<T>();
  }
}

export const httpInstance = new Http();
