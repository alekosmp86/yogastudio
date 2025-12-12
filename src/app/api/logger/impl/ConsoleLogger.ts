import { LoggerService } from "../LoggerService";

export class ConsoleLogger implements LoggerService {
    loggerClass: string;

    constructor(loggerClass: string) {
        this.loggerClass = loggerClass;
    }

    log(message: string, data?: unknown): void {
        console.log(`INFO ${this.loggerClass}: ${message}`, data || '');
    }
    
    error(message: string, data?: unknown): void {
        console.error(`ERROR ${this.loggerClass}: ${message}`, data || '');
    }
}