import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { prisma } from "@/src/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import Pioneers from "@/src/components/Pioneers";
import StayInTouch from "@/src/components/StayInTouch";
import TheCarousel from "@/src/components/TheCarousel";
import WhyChoose from "@/src/components/WhyChoose";
import HelpingSection from "@/src/components/helping section";

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = 7;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  const collections = await prisma.product.findMany({
    distinct: ["collections"],
  });

  const imageUrls = [
    "/Acne Prone.jpg",
    "/Enlarged Pores.jfif",
    "/Pigmentation.jfif",
    "/Pigmentation.jfif",
  ];

  return (
    <>
      <div className="circlePositon w-[590px] h-[400px] bg-pink-600/60 rounded-full absolute -z-[1] top-[110%] left-[0%] translate-x-[-50%] translate-y-[-50%] blur-[90px]" />

      <div className="relative sm:hidden block">
        <Image
          width={900}
          height={506}
          src="/homepage - mobile.jpg"
          draggable={false}
          alt="HomePage Image"
          className="w-full"
        />
        <div className="absolute bottom-3 left-4 p-4 right-4 sm:left-10 sm:right-10 hover:bg-black/20 transition-all bg-gradient-to-tr rounded-none from-black/40 to-transparent backdrop-blur-sm  text-white">
          <h3 className="text-xl font-semibold mb-1">-Presenting-</h3>
          <h3 className="text-2xl sm:text-xl font-semibold">
            <span className="text-pink-600">Dream Glow</span> Cream{" "}
          </h3>
          <h4 className="text-xl mb-4">Instant Skin Reviviever</h4>
          <h3 className="text-xl font-semibold mb-">
            The #1 Beauty Cream in Pakistan
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-sm sm:text-base">${products[0].price}</p>
            <Link
              className="inline-block bg-pink-600 hover:bg-purple-600 text-white py-2 px-4 rounded-md font-semibold uppercase tracking-wide transition duration-300"
              href={`products/${products[0].id}`}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden sm:block">
        <Image
          width={900}
          height={506}
          src="/homepage.png"
          draggable={false}
          alt="HomePage Image"
          className="w-full"
        />
        <div className="absolute bottom-6 w-[60%] md:w-[50%] lg:w-[40%] left-4 right-4 md:left-10 md:right-10 hover:bg-black/20 transition-all bg-gradient-to-tr rounded-none from-black/40 to-transparent backdrop-blur-sm md:p-8 p-4 text-white">
          <h3 className="text-2xl font-semibold mb-1">-Presenting-</h3>
          <h3 className="text-4xl font-semibold mb-1">
            <span className="text-pink-600">Dream Glow</span> Cream{" "}
          </h3>
          <h4 className="text-xl font-semibold mb-4">
            Instant Skin Reviviever
          </h4>
          <h3 className="text-4xl font-semibold mb-14">
            The #1 Beauty Cream in Pakistan
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-sm">${products[0].price}</p>
            <Link
              className="inline-block bg-pink-600 hover:bg-purple-600 text-white py-2 px-4 rounded-md font-semibold uppercase tracking-wide transition duration-300"
              href={`products/${products[0].id}`}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-2xl px-4 pt-10 sm:pb-6 lg:max-w-7xl">
        {currentPage === 1 && (
          // <AssetsMotion>
          <div className="items-center flex-col flex justify-center">
            {/* <h1 className="mb-5 text-4xl font-bold font-sans text-pink-500">
                The Ultimate Skin Assets
              </h1> */}
            <TheCarousel products={products} />
          </div>
          // </AssetsMotion>
        )}

        <WhyChoose />

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {collections.map((collection, index) => (
              <CarouselItem
                key={index}
                className="relative w-fit md:basis-1/2 lg:basis-1/4"
              >
                <Link href={`collections/${collection.collections}`}>
                  <Image
                    src={imageUrls[index]}
                    alt={`Image ${index + 1}`}
                    width={700}
                    height={700}
                    className="rounded-[3rem] transition-all hover:opacity-80 shadow-md shadow-pink-200 bg-pink-600 object-cover object-center h-full w-full"
                  />
                  <h1 className="absolute bottom-5 left-[4rem] w-fit bg-pink-600 backdrop-blur-sm rounded-full text-white text-xl font-bold py-2 px-6">
                    {collection.collections}
                  </h1>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* <Pioneers /> */}
        <StayInTouch />
        <HelpingSection />
      </section>
    </>
  );
}
