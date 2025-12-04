import { UserLinkServiceImpl } from "./user-link/(services)/impl/UserLinkService";
import { PrismaClient } from "@prisma/client";
import { UserServiceImpl } from "./users/(services)/impl/UserServiceImpl";
import { ResendMailServiceImpl } from "./mailer/services/impl/ResendMailServiceImpl";
import { ClassesServiceImpl } from "./owner/classes/(services)/impl/ClassesServiceImpl";

const prisma = new PrismaClient();

export const userLinkService = new UserLinkServiceImpl(prisma);
export const userService = new UserServiceImpl(prisma);
export const mailService = new ResendMailServiceImpl();
export const classesService = new ClassesServiceImpl(prisma);