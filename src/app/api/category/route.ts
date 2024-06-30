export const dynamic = 'force-dynamic'

import { prisma } from "@/src/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try { 
    const { searchParams } = new URL(request.url);
    const extractCategoryID = searchParams.get("categoryID");

    const getBlogPostListBasedOnCurrentCategoryID = await prisma.product.findMany({
      where: {
        collections: extractCategoryID || "",
      },
    });

    if (getBlogPostListBasedOnCurrentCategoryID) {
      return NextResponse.json({
        success: true,
        data: getBlogPostListBasedOnCurrentCategoryID,
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