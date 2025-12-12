import { AdminServiceImpl } from "./(services)/impl/AdminServiceImpl";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adminService = new AdminServiceImpl(prisma);