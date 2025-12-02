export interface MagicLinkService {
    generateMagicLink(email: string): Promise<string>;
}