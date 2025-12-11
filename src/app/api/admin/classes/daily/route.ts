import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getTodayWeekday } from "@/lib/utils";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekday = getTodayWeekday();

    // 1. Get all active schedules for today
    const schedules = await prisma.weeklySchedule.findMany({
      where: {
        weekday,
        isActive: true,
      },
      include: {
        template: true,
      },
    });

    if (!schedules.length) {
      return NextResponse.json({
        success: true,
        message: "No schedules for today",
        created: [],
      });
    }

    const createdInstances = [];

    for (const schedule of schedules) {
      const existing = await prisma.classInstance.findFirst({
        where: {
          templateId: schedule.templateId,
          startTime: schedule.startTime,
          date: today,
        },
      });

      if (!existing) {
        const newInstance = await prisma.classInstance.create({
          data: {
            date: today,
            startTime: schedule.startTime,
            templateId: schedule.templateId,
          },
        });

        createdInstances.push(newInstance);
      }
    }

    return NextResponse.json({
      success: true,
      createdCount: createdInstances.length,
      created: createdInstances,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}