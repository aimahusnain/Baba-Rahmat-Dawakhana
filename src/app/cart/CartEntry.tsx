'use client'

import { CartItemWithProduct } from "@/src/lib/db/cart";
import { formatPrice } from "@/src/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <Link href={"/products/" + product.id} className="text-lg font-bold text-blue-600 hover:underline">
            {product.name}
          </Link>
          <div className="text-gray-600">Price: {product.price}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-600">Quantity:</span>
            <select
              className="border border-gray-300 rounded-md px-2 py-1"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold">Total:</span>
            <span>{product.price * quantity}</span>
            {isPending && <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-gray-800 rounded-full"></span>}
          </div>
        </div>
      </div>
    </div>
  );
}
