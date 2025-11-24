export interface HttpClient {
  get<TResponse>(url: string, options?: RequestInit): Promise<TResponse>;

  post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestInit
  ): Promise<TResponse>;

  put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: RequestInit
  ): Promise<TResponse>;

  delete<TResponse>(url: string, options?: RequestInit): Promise<TResponse>;
}
