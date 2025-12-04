import { PrismaClient } from "@prisma/client";
import { MagicLinkServiceImpl } from "./magic-link/(services)/impl/MagicLinkServiceImpl";
import { ResendMailServiceImpl } from "../mailer/services/impl/ResendMailServiceImpl";
import { UserServiceImpl } from "../users/(services)/impl/UserServiceImpl";

const prisma = new PrismaClient();

export const userService = new UserServiceImpl(prisma);
export const magicLinkService = new MagicLinkServiceImpl(prisma, userService);
export const mailService = new ResendMailServiceImpl();