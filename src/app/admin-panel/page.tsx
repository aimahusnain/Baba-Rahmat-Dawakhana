import AddProductForm from "@/src/components/admin/AddproductForm";
import AdminProductCard from "@/src/components/admin/AdminProductCard";
import { prisma } from "@/src/lib/db/prisma";
import React from "react";

const AdminPanel = async () => {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  const collections = await prisma.product.findMany({
    distinct: ["collections"],
  });

  return (
    <div>
      <AddProductForm collections={collections} />
      <div className="grid grid-cols-2 gap-10 p-4">
        {products.map((product) => (
          <AdminProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
