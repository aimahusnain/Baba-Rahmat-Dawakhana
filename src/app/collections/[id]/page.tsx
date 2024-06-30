import CategoryList from "@/src/components/category";
import Asc from "@/src/components/category/All Collections";

async function getAllListsByCategory(getId: string) {
  const res = await fetch(
    `https://beauty-bugz.vercel.app/api/category?categoryID=${getId}`
  );

  const data = await res.json();

  if (data.success) return data.data;
}

export default async function Category({ params }: { params: any }) {
  const { id } = params;

  const getAllList = await getAllListsByCategory(id);

  return (
    // <div className="container mx-auto py-8">
    //         <div className="circlePositon w-[590px] h-[400px] bg-pink-600/60 rounded-full absolute -z-[1] top-[30%] left-[0%] translate-x-[-50%] translate-y-[-50%] blur-[90px]" />

    // <h1 className="text-3xl font-bold mb-4">Category Page</h1>
    //   <CategoryList list={getAllList} />
    // </div>

    <Asc product={getAllList} />
  );
}
