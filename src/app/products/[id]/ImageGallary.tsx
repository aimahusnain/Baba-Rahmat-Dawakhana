"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState(images?.[0] || "");

  const handleSmallImageClick = (image: string) => {
    setBigImage(image);
  };

  return (
    <div>
      {/* Big image */}
      <Image
        src={bigImage}
        alt="Photo"
        height={5353254}
        width={4565567}
        className="h-[490px] object-cover w-full object-center rounded-xl"
      />

      {/* Row of small images */}
      <div className="flex gap-4 mt-4 bottom-0 left-0 right-0 justify-center">
        {images.map((image, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleSmallImageClick(image)}
          >
            <Image
              src={image}
              alt="photo"
              height={5353254}
              width={4565567}
              className="h-26 w-full  object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
