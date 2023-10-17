"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function Index() {
  return (
    <>
      <Navbar />
      {/* <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
        <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0"> Huh</div>
        <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">Huhhhhhhhhhhhhh</div>
      </div> */}
      <main className="flex min-h-screen flex-col items-center justify-between p-12">
        <section className="relative overflow-hidden">
          <div className="relative pt-16 pb-24">
            <div className="relative z-10 container px-4 mx-auto">
              <div className="mb-24 text-center md:max-w-4xl mx-auto">
                <span className="inline-block mb-2.5 text-sm text-green-400 font-medium tracking-tighter">
                  Work in Progress
                </span>
                <h1 className="mb-8 text-7xl lg:text-8xl text-white tracking-tighter">
                  About Me
                </h1>
                <p className="mb-10 text-lg text-white md:max-w-sm mx-auto">
                  Hey, this is Aditya Oswal, This is my personal portfolio which
                  at the moment doesn&apos;t look much because I am a god-tier
                  procrastinator. If you have any{" "}
                  <span className="text-green-400">
                    {" "}
                    Opportunities | Ideas | Suggestions
                  </span>{" "}
                  you are welcome to send me a{" "}
                  <a
                    className=" text-blue-400"
                    href="https://twitter.com/oswaluxd"
                  >
                    dm over twitter
                  </a>
                  .
                </p>
                <div className="flex flex-wrap justify-center -m-2">
                  <div className="w-auto p-2">
                    <span className="inline-block px-8 py-4 tracking-tighter border-2 border-green-400 bg-green-400 hover:bg-green-500 text-black focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300">
                      Available for opportunities
                    </span>
                  </div>
                  <div className="w-auto p-2">
                    <a
                      className="inline-block px-8 py-4 text-white hover:text-black tracking-tighter hover:bg-green-400 border-2 border-white focus:border-green-400 focus:border-opacity-40 hover:border-green-400 focus:ring-4 focus:ring-green-400 focus:ring-opacity-40 rounded-full transition duration-300"
                      href="https://www.linkedin.com/in/oswaladitya/"
                    >
                      Connect
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <img
        className="absolute top-0 left-0"
        src="nightsable-assets/images/headers/layer-blur.svg"
        alt=""
      /> */}
      <Footer />
    </>
  );
}
