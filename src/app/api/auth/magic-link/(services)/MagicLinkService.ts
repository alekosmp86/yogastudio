import { MagicLink } from "@prisma/client";

export interface MagicLinkService {
    generateMagicLink(email: string): Promise<string>;
    findLinkByToken(token: string): Promise<MagicLink | null>;
}