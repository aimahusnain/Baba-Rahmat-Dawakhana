import PriceTag from "@/src/components/PriceTag";
import { prisma } from "@/src/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache, useRef } from "react";
import AddToCartButton from "./AddToCartButton";
import { Button } from "@/src/components/ui/button";
import { incrementProductQuantity } from "./actions";
import { Star, Truck } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import ImageGallary from "./ImageGallary";

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
    title: product.name + " - Flowmazon",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrls[0] }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    // <div>
    //   <div className="mx-auto max-w-screen-xl px-4 md:px-8">
    //     <div className="grid gap-8 md:grid-cols-2">
    //       {/* <ImageGallery images={product.imageUrls[0]} /> */}
    //       <div className="md:py-2">
    //         <div className="mb-2 md:mb-3">
    //           <span className="mb-0.5 inline-block text-gray-500">
    //             {/* {product.categoryName} */}
    //           </span>
    //           <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
    //             {product.name}
    //           </h2>
    //         </div>

    //         <div className="flex items-center gap-3 mb-5">
    //           <Button className="gap-x-2">
    //             <Star className="h-5 w-5" />
    //             <span className="text-sm mt-[1px]">4.2</span>
    //           </Button>

    //           <span className="text-sm text-gray-500 transition duration-100">
    //             56 Ratings
    //           </span>
    //         </div>

    //         <div className="mb-1">
    //           <div className="flex items-end gap-2">
    //             <span className="text-xl font-bold text-gray-800 md:text-2xl">
    //               ${product.price}
    //             </span>
    //             <span className="mb-0.5 text-red-500 line-through">
    //               ${product.price + 25}
    //             </span>
    //           </div>

    //           <span className="text-sm text-gray-500">
    //             Incl. Vat plus shipping
    //           </span>
    //         </div>

    //         <div className="mb-4 flex items-center gap-2 text-gray-500">
    //           <Truck className="w-6 h-6" />
    //           <span className="text-sm">2-4 Day Shipping</span>
    //         </div>
    //         <AddToCartButton
    //           productId={product.id}
    //           incrementProductQuantity={incrementProductQuantity}
    //         />
    //       </div>

    //       <p className="mt-1 text-base text-gray-500 tracking-wide">
    //         {product.description}
    //       </p>
    //     </div>
    //   </div>
    // </div>
    // <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
    //   <Image
    //     src={product.imageUrl}
    //     alt={product.name}
    //     width={500}
    //     height={500}
    //     className="rounded-lg"
    //     priority
    //   />

    //   <div>
    //     <h1 className="text-5xl font-bold">{product.name}</h1>
    //     <PriceTag price={product.price} className="mt-4" />
    //     <p className="py-6">{product.description}</p>
    //     <AddToCartButton
    //       productId={product.id}
    //       incrementProductQuantity={incrementProductQuantity}
    //     />
    //   </div>
    // </div>

    <div className="grid sm:grid-cols-2 grid-rows-1 gap-7 px-7">
      {/* Text Husnain Div */}

    <div className="mt-7">  <ImageGallary images={product.imageUrls} /></div>

      {/* Text Taha Div */}
      <div>
        <div>
          <div className="mx-auto max-w-screen-xl px-4 md:px-8 sm:mt-[50px] mt-[1px]">
            <div className="grid gap-1 md:grid-cols-1">
              {/* <ImageGallery images={product.imageUrls[0]} /> */}
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
                  <Button className="gap-x-2">
                    <Star className="h-5 w-5" />
                    <span className="text-sm mt-[1px]">4.2</span>
                  </Button>
                </div>

                <div>
                  <div className="flex gap-2">
                    <span className="text-xl font-bold text-gray-800 md:text-2xl">
                      Rs. {product.price}
                    </span>
                    <span className="text-red-500 mt-[5px] line-through">
                      Rs. {product.price + 354}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-base text-gray-500 tracking-wide">
                {product.description}
              </p>
              <div className="grid gap-3 grid-cols-2 mt-2">
                {" "}
                <button className="bg-black w-full text-white rounded-md">
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
    </div>
  );
}
