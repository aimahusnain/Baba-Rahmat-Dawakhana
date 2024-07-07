import { prisma } from "@/src/lib/db/prisma"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, description, detailedDescription, imageUrls, price, collections } = body;

    const product = await prisma.product.create({
        data: {
          name,
          description,
          detailedDescription,
          imageUrls,
          price,
          collections,
        },
      });


    if (product) {
      return NextResponse.json({
        success: true,
        message: 'New blog post created successfully!'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong, please try again!'
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message: 'Something went wrong, please try again!'
    })
  }
}