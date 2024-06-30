import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex flex-col py-6 gap-6 justify-between h-screen">
      <div />

      <div className="  w-full flex items-center flex-col justify-center">
        <Image width={300} height={300} src="/Logo.svg" alt="Logo" />

        <div
          className="bg-cover bg-no-repeat w-full"
          style={{
            // Change the url to https://beautybugz.com/
            backgroundImage: `url(https://beautybugz.com/Gradient%20for%20comming%20soon.jpg)`,
          }}
        >
          <h1 className=" py-3 font-bold text-7xl sm:text-9xl bg-white mix-blend-lighten uppercase text-center">
            Coming Soon
          </h1>
        </div>

        <p className="text-center my-3 text-lg text-white">
          Get ready! We&apos;re launching our product soon! <br /> See what all
          the buzz is about in our launch email.
        </p>
        <h3 className="text-xl font-semibold text-white">
          info@beautybugz.com
        </h3>
      </div>

      <section className="p-4">
        <div className="w-full md:w-[70%] md:mx-auto flex flex-col md:flex-row items-center justify-center text-center">
          <img
            className="h-40 w-[40%] border-4 border-white shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-white mb-6 md:w-96 mr-6 object-top object-cover rounded-full"
            src="/CEO Image.jpg"
            alt="CEO Image"
          />

          <div className="flex flex-col">
            <div className="md:text-justify mb-3">
              <p className="text-white font-bold text-xl mb-3">CEO Message</p>
              <div className="text-slate-300 font-semibold text-center md:text-left">
                <p>
                  My name is Rafe Vefa, and this has been my dream since 2020,
                  which is now turning into reality. Our goal is to
                  revolutionize the beauty industry. We aim to establish a
                  beauty empire. Our objective is to bring a new essence to both
                  present and future.
                </p>
                <p></p>
                <p>
                  We are rapidly approaching the launch phase and entering the
                  market swiftly. And we would like you to be a part of our
                  mission as well.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}