  import Image from "next/image";
  import React from "react";

  const WhyChoose = () => {
    return (
      <div className="sm:grid flex-col my-12 sm:pb-0 pb-8 flex sm:gap-0 gap-7 items-center h-fit bg-pink-600 -mx-4 sm:grid-cols-2">
                
        <Image
          src="/Why Choose.png"
          alt="Why Choose us"
          loading="eager"
          draggable={false}
          width={1024}
          height={1024}
          className="w-full h-full object-top object-cover"
          />
        <div className="w-full h-full flex items-center justify-center flex-col gap-3 text-white text-center">
          <h1 className="lg:text-4xl text-2xl font-extrabold mb-2 text-center text-zinc-300">
            Why Choose <br /> Beauty Bugz?
          </h1>
          <p className="lg:text-2xl mx-5">
            Our mission is to help you achieve beautiful & healthy skin & hair by
            providing a wide range of non-toxic, high-quality and affordable
            products. This is luxury on a budget!{" "}
          </p>
        </div>
      </div>
    );
  };

  export default WhyChoose;
