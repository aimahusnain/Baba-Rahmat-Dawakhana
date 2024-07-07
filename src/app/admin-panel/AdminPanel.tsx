import AddProductForm from "@/src/components/admin/AddproductForm";
import AdminProductCard from "@/src/components/admin/AdminProductCard";
import { prisma } from "@/src/lib/db/prisma";
import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  // const products = await prisma.product.findMany({
  //   orderBy: { id: "desc" },
  // });

  // const collections = await prisma.product.findMany({
  //   distinct: ["collections"],
  // });

  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch('/api/admin/products');
        const productsData = await productsResponse.json();
        setProducts(productsData.data);

        const collectionsResponse = await fetch('/api/admin/collections');
        const collectionsData = await collectionsResponse.json();
        setCollections(collectionsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-8 p-5">
      <AddProductForm collections={collections} />
      <div className="flex flex-col gap-10 p-4 max-h-[60rem] overflow-y-scroll">
        {products.map((product) => (
          <AdminProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
