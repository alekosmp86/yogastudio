import { ApiType } from "@/enums/ApiTypes";
import { HttpClient } from "./httpClient";

export const fetchClient: HttpClient = {
  getFullUrl(url: string, apiType: ApiType): string {
    const baseUrl = apiType === ApiType.FRONTEND ? '/api' : process.env.NEXT_PUBLIC_URL_BACKEND;
    return `${baseUrl}${url}`;
  },

  async get<TResponse>(url: string, apiType: ApiType, options: RequestInit = {}) {
    const fullUrl = this.getFullUrl(url, apiType);

    const res = await fetch(fullUrl, {
      ...options,
      method: "GET",
      credentials: "include",
    });

    return res.json() as Promise<TResponse>;
  },

  async post<TResponse, TBody = unknown>(
    url: string,
    apiType: ApiType,
    body?: TBody,
    options: RequestInit = {}
  ) {
    const fullUrl = this.getFullUrl(url, apiType);

    const res = await fetch(fullUrl, {
      ...options,
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return res.json() as Promise<TResponse>;
  },

  async put<TResponse, TBody = unknown>(
    url: string,
    apiType: ApiType,
    body?: TBody,
    options: RequestInit = {}
  ) {
    const fullUrl = this.getFullUrl(url, apiType);

    const res = await fetch(fullUrl, {
      ...options,
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return res.json() as Promise<TResponse>;
  },

  async delete<TResponse>(url: string, apiType: ApiType, options: RequestInit = {}) {
    const fullUrl = this.getFullUrl(url, apiType);

    const res = await fetch(fullUrl, {
      ...options,
      method: "DELETE",
      credentials: "include",
    });

    return res.json() as Promise<TResponse>;
  },
};
