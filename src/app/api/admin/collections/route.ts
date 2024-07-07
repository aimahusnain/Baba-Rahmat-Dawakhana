export const dynamic = 'force-dynamic'

import { prisma } from "@/src/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try { 
    const collections = await prisma.product.findMany({
        distinct: ["collections"],
      });

    if (collections) {
      return NextResponse.json({
        success: true,
        data: collections,
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