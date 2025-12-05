import { UserLinkServiceImpl } from "./user-link/(services)/impl/UserLinkService";
import { PrismaClient } from "@prisma/client";
import { UserServiceImpl } from "./users/(services)/impl/UserServiceImpl";
import { ResendMailServiceImpl } from "./mailer/services/impl/ResendMailServiceImpl";
import { ClassesServiceImpl } from "./owner/classes/(services)/impl/ClassesServiceImpl";
import { ScheduleServiceImpl } from "./owner/schedule/(services)/impl/ScheduleServiceImpl";
import { ClassesMapperImpl } from "./owner/classes/(mappers)/impl/ClassesMapperImpl";
import { ScheduleMapperImpl } from "./owner/schedule/(mappers)/impl/ScheduleMapperImpl";
import { UserMapperImpl } from "./owner/users/(mappers)/impl/UserMapperImpl";

const prisma = new PrismaClient();

export const userLinkService = new UserLinkServiceImpl(prisma);
export const userService = new UserServiceImpl(prisma);
export const mailService = new ResendMailServiceImpl();
export const classesService = new ClassesServiceImpl(prisma);
export const scheduleService = new ScheduleServiceImpl(prisma);

export const classesMapper = new ClassesMapperImpl();
export const scheduleMapper = new ScheduleMapperImpl();
export const userMapper = new UserMapperImpl();