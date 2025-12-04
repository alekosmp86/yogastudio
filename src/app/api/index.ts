import { UserLinkServiceImpl } from "./user-link/(services)/impl/UserLinkService";
import { PrismaClient } from "@prisma/client";
import { UserServiceImpl } from "./users/(services)/impl/UserServiceImpl";

const prisma = new PrismaClient();

export const userLinkService = new UserLinkServiceImpl(prisma);
export const userService = new UserServiceImpl(prisma);