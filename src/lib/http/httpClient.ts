import { ApiType } from "@/enums/ApiTypes";

export interface HttpClient {
  get<TResponse>(url: string, apiType: ApiType,options?: RequestInit): Promise<TResponse>;

  post<TResponse, TBody = unknown>(
    url: string,
    apiType: ApiType,
    body?: TBody,
    options?: RequestInit
  ): Promise<TResponse>;

  put<TResponse, TBody = unknown>(
    url: string,
    apiType: ApiType,
    body?: TBody,
    options?: RequestInit,
  ): Promise<TResponse>;

  patch<TResponse, TBody = unknown>(
    url: string,
    apiType: ApiType,
    body?: TBody,
    options?: RequestInit,
  ): Promise<TResponse>;

  delete<TResponse>(url: string, apiType: ApiType, options?: RequestInit): Promise<TResponse>;

  getFullUrl(url: string, apiType: ApiType): string;
}
