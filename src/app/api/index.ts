import { UserLinkServiceImpl } from "./user-link/(services)/impl/UserLinkService";
import { PrismaClient } from "@prisma/client";
import { UserServiceImpl } from "./users/(services)/impl/UserServiceImpl";
import { ResendMailServiceImpl } from "./mailer/services/impl/ResendMailServiceImpl";
import { ClassesServiceImpl } from "./owner/classes/(services)/impl/ClassesServiceImpl";
import { ScheduleServiceImpl } from "./owner/schedule/(services)/impl/ScheduleServiceImpl";
import { ClassesMapperImpl } from "./owner/classes/(mappers)/impl/ClassesMapperImpl";

const prisma = new PrismaClient();

export const userLinkService = new UserLinkServiceImpl(prisma);
export const userService = new UserServiceImpl(prisma);
export const mailService = new ResendMailServiceImpl();
export const classesService = new ClassesServiceImpl(prisma);
export const scheduleService = new ScheduleServiceImpl(prisma);

export const classesMapper = new ClassesMapperImpl();