"use client";

import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [newName, setNewName] = useState(product.name);
  const [newDesc, setNewDesc] = useState(product.description);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newCollection, setNewCollection] = useState(product.collections);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  async function handleUpdateName() {
    try {
      const res = await fetch(
        `/api/update-product/?id=${product.id}&name=${newName}&description=${newDesc}&price=${newPrice}&collection=${newCollection}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            desc: newDesc,
            price: newPrice,
            collection: newCollection,
          }),
        }
      );

      if (res.ok) {
        router.refresh();
        setIsEditing(false);
      } else {
        throw new Error("Failed to update product name");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    console.log(id);

    const res = await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    const data = await res.json();

    if (data && data.success) router.refresh();
  }

  const EndPrice = (e: any) => {
    setNewPrice(parseFloat(e.target.value));
  };

  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  const slicedDescription = product.description.slice(0, 100) + "...";

  return (
    <div className="bg-white rounded-md shadow-lg flex flex-col">
      <div className="relative flex flex-col lg:flex-row overflow-hidden">
        <Button
          variant="destructive"
          className="absolute right-0 z-50 left-0 w-fit"
          onClick={() => handleDelete(product.id)}
        >
          <Trash />
        </Button>
        <div className="w-full lg:w-64">
          {/* <Image
              src={product.imageUrls[0]}
              alt="Product image"
              className="object-cover rounded-xl hover:opacity-90 transition-all w-full bg-pink-500"
              width={600}
              height={300}
            /> */}

          <Carousel className="w-full">
            <CarouselContent>
              {product.imageUrls.map((url, index) => (
                <CarouselItem key={index}>
                  <Link href={"/products/" + product.id}>
                    <Image
                      src={url}
                      alt={`Product image ${index}`}
                      className="object-cover rounded-xl hover:opacity-90 transition-all w-full bg-pink-500"
                      width={600}
                      height={300}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex-1 p-4">
          <Link
            href={`collections/${product.collections}`}
            className="mt-2 text-sm bg-pink-600 px-2 py-0.5 font-bold text-white inline-block rounded-md"
          >
            {product.collections}
          </Link>
          <h3 className="text-xl mt-1 font-bold hover:text-pink-600 hover:underline text-gray-800">
            <Link href={"/products/" + product.id}>{product.name}</Link>
          </h3>

          <p className="text-sm mt-1 text-gray-600">{slicedDescription}</p>
          {isNew && (
            <div className="text-xs text-gray-500 mt-1">New Arrival</div>
          )}
          <span className="absolute bottom-4 right-4 z-20 flex items-center justify-center rounded-full bg-pink-600 py-1 px-3 text-sm font-semibold capitalize text-white">
            ${product.price}
          </span>
          {isEditing ? null : (
            <Button className="my-4" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-sans font-bold">Edit</h1>
          <div>
            <h3 className="text-xl mt-1 font-bold text-gray-800">
              <Label>Name</Label>
              <Input
                type="text"
                value={newName}
                placeholder="Name"
                onChange={(e) => setNewName(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </h3>

            <p>
              <Label>Description</Label>
              <Textarea
                rows={7}
                value={newDesc}
                placeholder="Description"
                onChange={(e) => setNewDesc(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </p>

            <p>
              <Label>Collection</Label>
              <Input
                type="text"
                value={newCollection}
                placeholder="Collection"
                onChange={(e) => setNewCollection(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </p>

            <p>
              <Label>Price</Label>
              <Input
                type="text"
                value={newPrice}
                placeholder="Price"
                onChange={EndPrice}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="destructive" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateName}>Save</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
