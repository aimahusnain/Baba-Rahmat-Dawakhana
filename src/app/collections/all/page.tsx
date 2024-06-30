import { prisma } from "@/src/lib/db/prisma";
import Asc from '../../../components/category/All Collections';

const AllCollections = async () => {

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
     <Asc product={products} />
  );
};

export default AllCollections;
