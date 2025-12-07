import { MagicLink } from "@prisma/client";
import { MagicLinkResponse } from "@/types/requests/MagicLinkResponse";

export interface MagicLinkService {
    generateMagicLink(email: string): Promise<MagicLinkResponse>;
    findLinkByToken(token: string): Promise<MagicLink | null>;
}