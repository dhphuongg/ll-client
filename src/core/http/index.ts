import type { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

import CookieUtil from '@utils/cookie';
import { AuthConstant } from '@/constants/auth.constant';

const headers = { 'Content-Type': 'application/json' };
const API_REQUEST_TIMEOUT = 20000; // 20s

abstract class Http {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers,
      timeout: API_REQUEST_TIMEOUT
    });
    this._initializeResponseInterceptor(this.instance);
  }

  private _initializeResponseInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.request.use(this._handleRequest as any, this._handleRequestError);
    instance.interceptors.response.use(this._handleResponse, this._handleResponseError);
  };

  private _handleRequest = (request: AxiosRequestConfig) => {
    request.headers = request.headers ?? {};
    const token = CookieUtil.getCookie(AuthConstant.ACCESS_TOKEN_KEY) || '';
    request.headers['Authorization'] = `Bearer ${token}`;

    if (import.meta.env.VITE_NODE_ENV === 'development') {
      const { method, url, baseURL } = request;
      console.log(
        `%c>>> [${method?.toUpperCase()}] | %c${url?.replace(baseURL!, '')} \n`,
        'color: blue; font-weight: bold',
        'color: violet; font-weight: bold',
        request
      );
    }
    return request;
  };

  private _handleRequestError = (error: any) => {
    console.error(error?.response?.data);
    return Promise.reject(error);
  };

  private _handleResponse = (response: AxiosResponse) => {
    if (import.meta.env.VITE_NODE_ENV === 'development') {
      const {
        config: { method, url, baseURL }
      } = response;
      console.log(
        `%c<<< [${method?.toUpperCase()}] | %c${url?.replace(baseURL!, '')} \n`,
        'color: green; font-weight: bold',
        'color: violet; font-weight: bold',
        response
      );
    }
    return response;
  };

  protected _handleResponseError = (error: any) => {
    if (import.meta.env.VITE_NODE_ENV === 'development') {
      const {
        config: { method, url, baseURL }
      } = error;
      console.log(
        `%c<<< [${method?.toUpperCase()}] | %c${url?.replace(baseURL!, '')} \n`,
        'color: red; font-weight: bold',
        'color: violet; font-weight: bold',
        error
      );
    }
    const httpCode = error?.response?.status;
    const config = error?.response?.config;
    const errorData = {
      title: 'Error',
      detail: 'Error'
    };

    // Handle some special http errors
    if ([403, 404, 500, 501, 502, 503, 504].includes(httpCode)) {
      return Promise.reject(error?.response?.data || errorData);
    }

    if (httpCode === 401 && config?.url !== '/auth/login' && config?.url !== '/auth/refresh') {
      const refreshToken = CookieUtil.getCookie(AuthConstant.REFRESH_TOKEN_KEY);

      return this.instance
        .post<{ data: { accessToken: string } }>('/auth/refresh-token', {
          refreshToken: refreshToken
        })
        .then((res) => {
          const newToken = res.data.data.accessToken;
          CookieUtil.setCookie(AuthConstant.REFRESH_TOKEN_KEY, newToken);

          return new Promise((resolve, reject) => {
            axios
              .request({
                ...config,
                headers: {
                  ...config?.headers,
                  Authorization: `Bearer ${newToken}`
                }
              })
              .then((response: any) => {
                resolve(response);
              })
              .catch((error: any) => {
                console.error(error);
                reject(error);
              });
          });
        })
        .catch((error) => {
          console.error('🚀 ~ HttpClient ~ error:', error);
          const errorExpired = {
            title: 'Error',
            detail: 'Expired'
          };
          CookieUtil.removeCookie(AuthConstant.ACCESS_TOKEN_KEY);
          CookieUtil.removeCookie(AuthConstant.REFRESH_TOKEN_KEY);
          return Promise.reject(error?.response?.data || error || errorExpired);
        });
    }
    return Promise.reject(error);
  };

  public get = <T>(url: string, params = {}, config: AxiosRequestConfig = {}): AxiosPromise<T> =>
    this.instance.get<T>(url, { params, ...config });

  public post = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
    this.instance.post<T>(url, data, config);

  public put = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
    this.instance.put<T>(url, data, config);

  public patch = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
    this.instance.patch<T>(url, data, config);

  public delete = <T>(url: string, config: AxiosRequestConfig = {}) =>
    this.instance.delete<T>(url, config);
}

class HttpAuth extends Http {
  private static classInstance?: HttpAuth;
  private constructor() {
    super(import.meta.env.VITE_BASE_API_URL);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new HttpAuth();
    }

    return this.classInstance;
  }
}

const HttpRequest = HttpAuth.getInstance();

export default HttpRequest;
