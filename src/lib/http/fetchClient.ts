import { HttpClient } from "./httpClient";

export const fetchClient: HttpClient = {
  async get<TResponse>(url: string, options: RequestInit = {}) {
    const res = await fetch(url, {
      ...options,
      method: "GET",
      credentials: "include",
    });

    return res.json() as Promise<TResponse>;
  },

  async post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options: RequestInit = {}
  ) {
    const res = await fetch(url, {
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
    body?: TBody,
    options: RequestInit = {}
  ) {
    const res = await fetch(url, {
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

  async delete<TResponse>(url: string, options: RequestInit = {}) {
    const res = await fetch(url, {
      ...options,
      method: "DELETE",
      credentials: "include",
    });

    return res.json() as Promise<TResponse>;
  },
};
