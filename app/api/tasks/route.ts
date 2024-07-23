import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const url = new URL(req.url);
    const taskId = url.searchParams.get("id");

    if (taskId) {
      // Fetch a specific task by ID
      const task = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });

      if (!task || task.userId !== userId) {
        return NextResponse.json({ error: "Task not found", status: 404 });
      }

      return NextResponse.json(task);
    } else {
      // Fetch all tasks for the user
      const tasks = await prisma.task.findMany({
        where: {
          userId,
        },
      });

      return NextResponse.json(tasks);
    }
  } catch (error) {
    console.log("ERROR GETTING TASKS: ", error);
    return NextResponse.json({ error: "Error fetching tasks", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const { id, title, description, date, isCompleted, isImportant } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        date,
        isCompleted,
        isImportant,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
