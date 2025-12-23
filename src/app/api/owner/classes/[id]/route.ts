import { NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";
import { classesService } from "app/api";
import { ConsoleLogger } from "app/api/logger/_services/impl/ConsoleLogger";

const logger =  new ConsoleLogger('ClassesController');

type RequestParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
  req: Request,
  { params }: RequestParams
) {
  const { id } = await params;

  try {
    const deletedId = await classesService.deleteClass(Number(id));
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: deletedId });
  } catch (error) {
    logger.error("Error deleting class:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: RequestParams
) {
  const { id } = await params;
  const body = await req.json();

  try {
    await classesService.updateClass({ ...body, id: Number(id) });
    return NextResponse.json({ message: RequestStatus.SUCCESS });
  } catch (error) {
    logger.error("Error updating class:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}