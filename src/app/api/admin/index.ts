import { ConsoleLogger } from "../logger/impl/ConsoleLogger";
import { AdminServiceImpl } from "./(services)/impl/AdminServiceImpl";

export const adminService = new AdminServiceImpl(new ConsoleLogger("AdminService"));