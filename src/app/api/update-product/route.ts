import { prisma } from "@/src/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const extractIdOfBlogItem = url.searchParams.get("id") || "";
    const extractNameOfBlogItem = url.searchParams.get("name") || "";
    const extractDescOfBlogItem = url.searchParams.get("description") || "";
    const extractPriceOfBlogItem = url.searchParams.get("price") || "";
    const extractCollectionsOfBlogItem = url.searchParams.get("collection") || "";

    const updatedBlogPost = await prisma.product.update({
      where: {
        id: extractIdOfBlogItem,
      },
      data: {
        name: extractNameOfBlogItem,
        description: extractDescOfBlogItem,
        price: Number(extractPriceOfBlogItem),
        collections: extractCollectionsOfBlogItem
      },
    });

    if (updatedBlogPost) {
      return NextResponse.json({
        success: true,
        message: "Blog deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to delete the blog! Please try again",
      });
    }
  } catch (e) {
    console.error(e);

    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
}