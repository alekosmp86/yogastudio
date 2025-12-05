export interface LoggerService {
    log(message: string, data?: unknown): void;
    error(message: string, data?: unknown): void;
}