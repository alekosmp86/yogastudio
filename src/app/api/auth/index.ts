import { PrismaClient } from "@prisma/client";
import { MagicLinkServiceImpl } from "./magic-link/(services)/impl/MagicLinkServiceImpl";
import { ResendMailServiceImpl } from "../mailer/services/impl/ResendMailServiceImpl";

const prisma = new PrismaClient();

export const magicLinkService = new MagicLinkServiceImpl(prisma);
export const mailService = new ResendMailServiceImpl();