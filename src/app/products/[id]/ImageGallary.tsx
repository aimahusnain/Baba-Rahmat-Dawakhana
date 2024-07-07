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
    <div className="h-fit">
      {/* Big image */}
      <div className="h-full">
        <Image
          src={bigImage}
          alt="Photo"
          height={800}
          width={800}
          className="h-[550px] rounded-xl"
        />
      </div>

      {images.length > 1 ? (
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
                layout="fixed"
                height={100}
                width={100}
                className="h-30 w-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
