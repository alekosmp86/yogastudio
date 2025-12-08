import { NextResponse } from "next/server";
import { registryService } from "..";
import { userMapper } from "app/api";
import { RequestStatus } from "@/enums/RequestStatus";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";

const logger = new ConsoleLogger("RegistryRoute");

export async function POST(request: Request) {
    const { name, email, phone } = await request.json();

    try {
        logger.log("Registering user:", { name, email, phone });
        const response = await registryService.register(name, email, phone);
        logger.log("User registered successfully:", response);
        return NextResponse.json({message: RequestStatus.SUCCESS, data: userMapper.toUser(response)});
    } catch (error) {
        logger.error("Error registering user:", error);
        return NextResponse.json(
            { message: RequestStatus.ERROR },
            { status: 500 }
        );
    }
}