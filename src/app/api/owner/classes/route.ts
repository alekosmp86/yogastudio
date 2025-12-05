import { NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";
import { classesMapper, classesService } from "app/api";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { GymClass } from "@/types/classes/GymClass";

const logger =  new ConsoleLogger('ClassesController');

export async function GET() {
  try {
    const allClasses = await classesService.getAllClasses();
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: allClasses.map(classesMapper.toClassesDto) });
  } catch (error) {
    logger.error("Error fetching classes:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
    try {
        const { title, description, capacity, instructor } = await request.json();
        const classDto: Omit<GymClass, "id"> = { title, description, capacity, instructor };
        const newClass = await classesService.createClass(classDto);
        return NextResponse.json({ message: RequestStatus.SUCCESS, data: classesMapper.toClassesDto(newClass) });
    } catch (error) {
        logger.error("Error creating class:", error);
        return NextResponse.json(
            { message: RequestStatus.ERROR },
            { status: 500 }
        );
    }
}