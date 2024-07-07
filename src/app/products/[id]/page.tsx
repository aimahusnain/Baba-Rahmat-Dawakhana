import { Button } from "@/src/components/ui/button";
import { prisma } from "@/src/lib/db/prisma";
import { Star } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import ImageGallary from "./ImageGallary";
import { incrementProductQuantity } from "./actions";
import React from "react";
import dynamic from "next/dynamic";
import '@/src/styles/editorjs-output.css';

const EditorJSOutput = dynamic(
  () => import("@/src/components/EditorjsOutput"),
  { ssr: false }
);

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + " - Baba Rahmat dawakhana",
    description: product.description.replace(/<brh \/>/g, "<br />"), // Replace <brh /> with <br />
    openGraph: {
      images: [{ url: product.imageUrls[0] }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  const isUrdu = (text: string) => {
    // Simple heuristic to detect Urdu text
    // Replace with your own logic based on actual data
    const urduCharactersRegex = /[\u0600-\u06FF]/; // Range for Urdu Unicode characters
    return urduCharactersRegex.test(text);
  };

  const determineFontClass = (text: string) => {
    return isUrdu(text) ? "nastaleeqFont" : "font-sans";
  };

  return (
    <div>
      <div className="flex md:flex-row gap-7 px-7 mb-10">
        <div className="mt-7">
          <ImageGallary images={product.imageUrls} />
        </div>

        <div>
          <div className="mx-auto max-w-screen-xl px-4 md:px-8 sm:mt-[50px] mt-[1px]">
            <div className="grid gap-1 md:grid-cols-1">
              <div className="md:py-2">
                <div className="mb-2 md:mb-3">
                  <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                    {product.name}
                  </h2>
                  <span className="mt-0.5 inline-block text-gray-00 font-normal">
                    {product.collections}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <Button className="gap-x-2 bg-primaryorange-100">
                    <Star className="h-5 w-5" />
                    <span className="text-sm mt-[1px]">4.2</span>
                  </Button>
                </div>

                <div className="flex gap-2">
                  <span className="text-xl font-bold text-gray-800 md:text-2xl">
                    Rs. {product.price}
                  </span>
                  <span className="text-red-500 mt-[5px] line-through">
                    Rs. {product.price + 230}
                  </span>
                </div>
              </div>

              {/* Render product description with language-specific fonts */}
              <div className="text-md tracking-wide mb-6">
                {product.description.split("<brh />").map((line, index) => (
                  <React.Fragment key={index}>
                    <p className={determineFontClass(line)}>{line}</p>
                    {index <
                      product.description.split("<brh />").length - 1 && (
                      <div className="my-4" />
                    )}{" "}
                    {/* Add space between paragraphs */}
                  </React.Fragment>
                ))}
              </div>

              <div className="grid gap-3 grid-cols-2 mt-2">
                <button className="bg-primaryorange-300 w-full text-white rounded-md">
                  Buy Now
                </button>
                <AddToCartButton
                  productId={product.id}
                  incrementProductQuantity={incrementProductQuantity}
                />
              </div>

              <p className="mt-4">
                <span className="font-bold">Delivery</span> (2/4 day)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-7 justify-start items-start">
        {product.detailedDescription && (
          <EditorJSOutput data={product.detailedDescription} />
        )}
      </div>
    </div>
  );
}