export const dynamic = "force-dynamic";

import { prisma } from "@/src/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
    
    if (products) {
      return NextResponse.json({
        success: true,
        data: products,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch data ! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
