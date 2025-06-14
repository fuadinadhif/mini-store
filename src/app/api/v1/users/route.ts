import { NextResponse } from "next/server";

import { prisma } from "@/configs/prisma";

export async function GET() {
  try {
    const result = await prisma.user.findMany();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
