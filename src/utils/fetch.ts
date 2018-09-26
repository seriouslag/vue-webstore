import axios, {AxiosResponse} from 'axios';
import ApiConfig from '@/api/ApiConfig';

export default abstract class Fetch {
  private static retry: number = parseInt(String(process.env.VUE_APP_API_RETRY), 10);
  private static retryMax: number = parseInt(String(process.env.VUE_APP_API_MAXRETRY), 10);

  private static checkResponseStatus<T>(response: AxiosResponse<T>): AxiosResponse<T> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw new Error(response.statusText);
  }

  private static fetch<T>(url: string, method: string, config: ApiConfig = {}): Promise<T> {
    return axios.request<T>({ url, method, headers: config.headers, data: config.data })
      .then(this.checkResponseStatus)
      .then((response: AxiosResponse<T>) => {
        return response.data;
      })
      .catch((error: Error) => {
        // retry logic is temporary
        if (this.retry < this.retryMax) {
          this.retry += 1;
          return this.fetch<T>(url, method, config);
        }
        // add external logger
        throw error; // throw for client error handling
      });
  }

  public static get<T>(url: string, config: ApiConfig = {}): Promise<T> {
    const method = 'get';
    return this.fetch(url, method, config);
  }

  private static post<T>(url: string, config: ApiConfig = {}): Promise<T> {
    const method = 'post';
    return this.fetch(url, method, config);
  }

  private static put<T>(url: string, config: ApiConfig = {}): Promise<T> {
    const method = 'put';
    return this.fetch(url, method, config);
  }

  private static delete<T>(url: string, config: ApiConfig = {}): Promise<T> {
    const method = 'delete';
    return this.fetch(url, method, config);
  }
}
