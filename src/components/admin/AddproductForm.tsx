"use client";

import ShowCollections from "@/src/components/category/showcategories";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Editor = dynamic(() => import("@/src/components/Editor"), { ssr: false });

export default function AddProductForm(collections: any) {
  const [editorData, setEditorData] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const productData = {
      name: formData.get("name"),
      description: formData.get("description"),
      detailedDescription: editorData,
      imageUrls: (formData.get("imageUrls") as string)
        .split(",")
        .map((url) => url.trim()),
      price: Number(formData.get("price")),
      collections: formData.get("collections"),
    };

    try {
      const response = await fetch("/api/add-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <div className="flex justify-center mx-3 min-h-screen items-center">
        <div className="bg-white border shadow-xl rounded-xl p-6 py-7 w-full lg:w-2/5">
          <h1 className="text-3xl font-sans font-bold mb-2 text-center">
            Add Product
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Name
              </label>
              <Input
                required
                name="name"
                placeholder="Name"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Description
              </label>
              <textarea
                required
                name="description"
                placeholder="Description"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 py-2"
              ></textarea>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Detailed Description
              </label>
              <Editor onChange={setEditorData} />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Image URLs
              </label>
              <Input
                required
                name="imageUrls"
                placeholder="Image URL 1, Image URL 2, ..."
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Price
              </label>
              <Input
                required
                name="price"
                placeholder="Price"
                type="number"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <ShowCollections collections={collections.collections} />{" "}
            <Button type="submit">Add Product</Button>
          </form>
        </div>
      </div>
  );
}
