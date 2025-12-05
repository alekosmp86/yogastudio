export interface MailService {
    sendMail(email: string, subject: string, body: string): Promise<void>;
}