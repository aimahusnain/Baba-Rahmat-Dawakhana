'use client'

// CategoryList.tsx

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  price: number;
  imageUrls: string[];
  name: string;
}

interface Props {
  list: Product[];
}

const CategoryList: React.FC<Props> = ({ list }) => {
  const [sortedList, setSortedList] = useState<Product[]>([...list]);

  const handleSort = (order: "asc" | "desc") => {
    const sorted = [...list].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setSortedList(sorted);
  };

  return (
    <div className="category-list">
      <div className="flex justify-center space-x-4 my-4">
        <button
          onClick={() => handleSort("asc")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sort by Price: Lowest to Highest
        </button>
        <button
          onClick={() => handleSort("desc")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sort by Price: Highest to Lowest
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedList.map((product) => (
          <div key={product.id} className="group relative">
            <span className="absolute top-5 right-8 z-20 inline-flex items-center justify-center rounded-full bg-pink-500 py-2 px-4 text-sm font-semibold capitalize text-white">
              $ {product.price}
            </span>
            <div>
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.imageUrls[0]}
                  alt="Product image"
                  className="h-72 object-cover object-top hover:opacity-90 transition-all w-full bg-emerald-500 rounded-xl"
                  width={600}
                  height={300}
                />
              </Link>
            </div>
            <div className="mt-1 text-center">
              <div>
                <h3 className="text-xl mt-6 text-black font-bold">
                  <Link href={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
