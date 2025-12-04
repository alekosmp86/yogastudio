import { NextResponse } from "next/server";
import { RequestStatus } from "@/enums/RequestStatus";
import { classesService } from "app/api";
import { ClassesDto } from "./(dto)/ClassesDto";

export async function GET() {
  try {
    const allClasses = await classesService.getAllClasses();
    const classesDto = allClasses.map((classTemplate) => ClassesDto.fromClassTemplate(classTemplate));
    return NextResponse.json({ message: RequestStatus.SUCCESS, data: classesDto });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { message: RequestStatus.ERROR },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
    try {
        const { title, description, capacity, instructor } = await request.json();
        const classDto: Omit<ClassesDto, "id"> = { title, description, capacity, instructor };
        const newClass = await classesService.createClass(classDto);
        return NextResponse.json({ message: RequestStatus.SUCCESS, data: ClassesDto.fromClassTemplate(newClass) });
    } catch (error) {
        console.error("Error creating class:", error);
        return NextResponse.json(
            { message: RequestStatus.ERROR },
            { status: 500 }
        );
    }
}