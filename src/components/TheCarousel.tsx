"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import ProductCard from "./ProductCard";

const TheCarousel = ({ products }: any) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
      

        {products.map((product: any, index: any) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default TheCarousel;
