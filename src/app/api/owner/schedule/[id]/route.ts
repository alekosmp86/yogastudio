import { RequestStatus } from "@/enums/RequestStatus";
import { NextResponse } from "next/server";
import { ConsoleLogger } from "app/api/logger/impl/ConsoleLogger";
import { scheduleMapper, scheduleService } from "app/api";

const logger =  new ConsoleLogger('ScheduleController');

type RequestParams = {
  params: Promise<{ id: string }>;
};

export async function PUT(
  req: Request,
  { params }: RequestParams
) {
  const { id } = await params;
  const body = await req.json();

  try {
    const updatedSchedule = await scheduleService.updateScheduledClass(body, Number(id));
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: scheduleMapper.toScheduledClass(updatedSchedule) });
  } catch (error) {
    logger.error("Error updating schedule:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: RequestParams
) {
  const { id } = await params;

  try {
    const deletedId = await scheduleService.deleteScheduledClass(Number(id));
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: deletedId });
  } catch (error) {
    logger.error("Error deleting scheduled class:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}