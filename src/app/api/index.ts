import { UserLinkServiceImpl } from "./user-link/(services)/impl/UserLinkService";
import { PrismaClient } from "@prisma/client";
import { UserServiceImpl } from "./users/(services)/impl/UserServiceImpl";
import { ResendMailServiceImpl } from "./mailer/services/impl/ResendMailServiceImpl";
import { ClassesServiceImpl } from "./owner/classes/(services)/impl/ClassesServiceImpl";
import { ScheduleServiceImpl } from "./owner/schedule/(services)/impl/ScheduleServiceImpl";
import { ClassesMapperImpl } from "./owner/classes/(mappers)/impl/ClassesMapperImpl";
import { ScheduleMapperImpl } from "./owner/schedule/(mappers)/impl/ScheduleMapperImpl";
import { UserMapperImpl } from "./owner/users/(mappers)/impl/UserMapperImpl";
import { GoogleUserMapperImpl } from "./auth/providers/google/(mappers)/impl/GoogleUserMapperImpl";
import { AccountServiceImpl } from "./account/(services)/impl/AccountServiceImpl";
import { TokenServiceImpl } from "./auth/token/(services)/impl/TokenServiceImpl";
import { CustomerClassesServiceImpl } from "./customer/classes/(services)/impl/CustomerClassesServiceImpl";
import { ReservationServiceImpl } from "./customer/reservations/(services)/impl/ReservationServiceImpl";
import { WeeklyScheduleServiceImpl } from "./weekly-schedule/(services)/impl/WeeklyScheduleServiceImpl";
import { ClassInstanceServiceImpl } from "./class-instance/(services)/impl/ClassInstanceServiceImpl";

const prisma = new PrismaClient();

export const userLinkService = new UserLinkServiceImpl(prisma);
export const userService = new UserServiceImpl(prisma);
export const mailService = new ResendMailServiceImpl();
export const classesService = new ClassesServiceImpl(prisma);
export const scheduleService = new ScheduleServiceImpl(prisma);
export const customerClassesService = new CustomerClassesServiceImpl(prisma);
export const accountService = new AccountServiceImpl(prisma);
export const tokenService = new TokenServiceImpl(userService);
export const reservationService = new ReservationServiceImpl(prisma);
export const weeklyScheduleService = new WeeklyScheduleServiceImpl(prisma);
export const classInstanceService = new ClassInstanceServiceImpl(prisma);

export const classesMapper = new ClassesMapperImpl();
export const scheduleMapper = new ScheduleMapperImpl();
export const userMapper = new UserMapperImpl();
export const googleUserMapper = new GoogleUserMapperImpl();