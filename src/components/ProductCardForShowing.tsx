import Link from "next/link";
import React from "react";
import Image from "next/image";

const ProductCardForShowing = ({ product }: { product: any }) => {
  return (
    <div className="border border-gray-200 rounded overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105">
      <Link className="block" href={`/products/${product.id}`}>
          <div className="relative h-48">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t"
            />
          </div>
          <div className="p-4 bg-white">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2 line-clamp-3">{product.description}</p>
            <p className="text-gray-800 font-semibold">${product.price}</p>
          </div>
      </Link>
    </div>
  );
};

export default ProductCardForShowing;
