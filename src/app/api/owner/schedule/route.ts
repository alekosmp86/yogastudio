import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { scheduleMapper, scheduleService } from "app/api";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { ScheduledClass } from "@/types/schedule/ScheduledClass";

const logger =  new ConsoleLogger('ScheduleController');

export async function GET() {
  try {
    const schedule = await scheduleService.getScheduledClasses();
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: schedule.map(scheduleMapper.toScheduledClass) });
  } catch (error) {
    logger.error("Error getting schedule:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const scheduledClassDto: Omit<ScheduledClass, "id"> = body;
    const newScheduledClass = await scheduleService.createScheduledClass(scheduledClassDto);
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: scheduleMapper.toScheduledClass(newScheduledClass) });
  } catch (error) {
    logger.error("Error adding class to schedule:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}