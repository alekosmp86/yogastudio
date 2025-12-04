import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { scheduleService } from "app/api";
import { ScheduledClassDto } from "./(dto)/ScheduledClassDto";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";

const logger =  new ConsoleLogger('ScheduleController');

export async function GET() {
  try {
    const schedule = await scheduleService.getScheduledClasses();
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: schedule.map(ScheduledClassDto.fromWeeklySchedule) });
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
    const scheduledClassDto: Omit<ScheduledClassDto, "id"> = body;
    const newScheduledClass = await scheduleService.createScheduledClass(scheduledClassDto);
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: ScheduledClassDto.fromWeeklySchedule(newScheduledClass) });
  } catch (error) {
    logger.error("Error adding class to schedule:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}