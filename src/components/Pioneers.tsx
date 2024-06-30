import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Pioneers = () => {
  return (
    <div className="relative my-20 bg-black">
      <Image
        width={900}
        height={506}
        src="/Pioneers.png"
        draggable={false}
        alt="HomePage Image"
        className="w-full opacity-70"
      />
      <div className="absolute top-11 sm:top-32 bottom-16 flex-col px-10 py-14 text-white rounded-none flex justify-center sm:text-center text-right sm:pl-0 pl-28 items-center w-full">
        <h1 className="sm:text-4xl text-xl font-semibold mb-1">
          We are Pioneers in natural, premium skincare
        </h1>
        <p className="text-semibold sm:text-lg text-md">
          Quality Sourcing + Intense Concentrations + Complex Chemistry of
          Formulations = Result-driven Products
        </p>
        <Link href="/collections/all">
          <Button className="mt-1 bg-pink-600 hover:bg-pink-700">See All Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default Pioneers;
