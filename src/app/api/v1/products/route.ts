import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/configs/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, description, price, stock, image } = await req.json();

    if (!name || !price || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        image,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nameFilter = searchParams.get("name") || undefined;
    const orderByField = searchParams.get("orderBy") || "createdAt";
    const orderDirection = (
      searchParams.get("orderDir") || "desc"
    ).toLowerCase();

    const validOrderFields = ["price", "createdAt"];
    const orderBy = validOrderFields.includes(orderByField)
      ? orderByField
      : "createdAt";

    const order = orderDirection === "asc" ? "asc" : "desc";

    const products = await prisma.product.findMany({
      where: nameFilter
        ? {
            name: {
              contains: nameFilter,
              mode: "insensitive",
            },
          }
        : undefined,
      orderBy: {
        [orderBy]: order,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get products" },
      { status: 500 }
    );
  }
}
