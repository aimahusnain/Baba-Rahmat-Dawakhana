"use client";

import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    
    <div key={product.id} className="group relative my-12">
      <span className="absolute top-5 right-8 z-20 inline-flex items-center justify-center rounded-full bg-pink-500 py-2 px-4 text-sm font-semibold capitalize text-white">
        $ {product.price}
      </span>
      <div>
        <Link href={"/products/" + product.id}>
          <Image  
            src={product.imageUrls[0]}
            alt="Product image"
            className="h-72 object-cover object-top hover:opacity-90 transition-all w-full bg-emerald-500 rounded-xl"
            width={600}
            height={300}
          />
        </Link>
      </div>
          {/* <Link href={`/collections/${product.collections}`} className="mt-2 text-sm bg-pink-500 px-2 py-0.5 font-bold text-white w-fit rounded-xl rounded-l-none">
            {product.collections}
          </Link> */}
      <div className="mt-1 text-center">
        <div>
          <h3 className="text-xl mt-6 text-black font-bold">
            <Link href={"/products/" + product.id}>{product.name}</Link>
          </h3>
          {/* <h3 className="text-sm mt-2 text-slate-600">${product.price}</h3> */}
        </div>
      </div>
    </div>
  );
}
