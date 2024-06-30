import AdminProductCard from "@/src/components/admin/AdminProductCard";
import ShowCollections from "@/src/components/category/showcategories";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { prisma } from "@/src/lib/db/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrls = (formData.get("imageUrls") as string)
    .split(",") // Split the comma-separated string into an array
    .map((url) => url.trim()); // Trim whitespace from each URL
  const price = Number(formData.get("price") || 0);
  const collections = formData.get("collections")?.toString();

  if (!name || !description || !imageUrls || !price || !collections) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrls, price, collections },
  });

  redirect("/");
}

export default async function AddProductPage() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/add-product");
  // }

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  const collections = await prisma.product.findMany({
    distinct: ["collections"],
  });

  return (
    <div>
      <div className="flex justify-center mx-3 min-h-screen items-center">
        <div className="bg-white border shadow-xl rounded-xl p-6 py-7 w-full lg:w-2/5">
          <h1 className="text-3xl font-sans font-bold mb-2 text-center">
            Add Product
          </h1>
          <form action={addProduct} className="flex flex-col gap-2">
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
            <ShowCollections collections={collections} />
            <Button type="submit">Add Product</Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 p-4">
        {products.map((product) => (
          <AdminProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
