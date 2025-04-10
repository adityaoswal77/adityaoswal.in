"use client";

// export default function Blogs() {
//     return(
//         <>
//         This is the blog section
//         </>
//     );
// };

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function BlogArticle() {
  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <section className="relative py-20 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="mb-12 md:max-w-md text-center mx-auto">
            <h2 className="mb-4 text-3xl text-gray-100 tracking-3xl">
              Experiences
            </h2>
            <p className="mb-6 text-gray-100 text-opacity-60">
              Random musings & A bit about me
            </p>
            <div className="flex flex-wrap justify-center items-center -m-2">
              <div className="w-auto p-2">

              </div>
              <div className="w-auto p-2">
                <p className="text-sm text-gray-100 font-medium tracking-tighter">
                  Aditya Oswal
                </p>
              </div>
              <div className="w-auto p-2">
                <svg
                  width={3}
                  height={3}
                  viewBox="0 0 3 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.492 3H0.574V0.83H2.492V3Z" fill="white" />
                </svg>
              </div>
              <div className="w-auto p-2">
                <p className="text-sm text-gray-100 font-medium tracking-tighter">
                  Short read
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative px-4">

        </div>
        <div className="container px-4 mx-auto">
          <div className="border-b border-blueGray-900">
            <div className="max-w-3xl pt-8 mx-auto">
              <div className="border-b border-blueGray-900">
                <h3 className="mb-10 text-2xl text-gray-100 tracking-2xl">
                  Welcome to my place on the internet :)
                </h3>
              </div>
              <div className="pt-8 pb-16">
                {/* <h2 className="mb-4 text-3xl text-blueGray-50 tracking-3xl">
                  A lil bit about me
                </h2>
                <p className="mb-6 text-lg text-blueGray-50">
                  I am currently freelancing between interviews and travel. 
                  I worked at a Design studio for a short while before that. 
                </p>
                <div className="flex flex-wrap mb-9">
                  <div className="w-auto p-3">
                    <div className="w-0.5 bg-green-400 h-full rounded-md" />
                  </div>
                  <div className="flex-1 mb-5 p-3">
                    <h3 className="mb-4 text-2xl text-gray-200 tracking-2xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec ullamcorper mattis lorem non. Ultrices praesent amet
                      ipsum justo massa. Eu dolor aliquet risus gravida nunc at
                      feugiat consequat purus.
                    </h3>
                    <p className="text-lg text-gray-100">
                      — John Doe, CEO &amp; Founder
                    </p>
                  </div>
                  <p className="mb-8 text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec ullamcorper mattis lorem non. Ultrices praesent amet
                    ipsum justo massa. Eu dolor aliquet risus gravida nunc at
                    feugiat consequat purus. Non massa enim vitae duis mattis.
                    Vel in ultricies vel fringilla.
                  </p>
                  <img
                    className="mb-4"
                    src="nightsable-assets/images/blog-content/header2.png"
                    alt=""
                  />
                  <p className="text-lg text-blueGray-200">
                    Non massa enim vitae duis mattis. Vel in ultricies vel
                    fringilla.
                  </p>
                </div> */}
                <h2 className="mb-4 text-3xl text-blueGray-50 tracking-3xl">
                  A bit about me
                </h2>
                <h3 className="mb-9 text-xl text-gray-100 tracking-2xl">
                  Working as a Product Designer at
                  <span className="text-bold">
                    <a
                      className="text-bold text-teal-500"
                      href="https://www.alivecor.com/"
                    >
                      {" "}
                      Alivecor.{" "}
                    </a>
                  </span>{" "}
                  with a stellar Product & engineering team.
                  <span className="text-bold">
                    <a
                      className="text-bold text-teal-500"
                      href="https://www.figma.com/proto/upYjzU2eQ4hDYXVhhvSqPn/Portfolio-Deck?page-id=0%3A1&type=design&node-id=415-443&viewport=-2824%2C-1072%2C0.19&t=ctFdwdz4IBYm11gK-1&scaling=contain&mode=design"
                    >
                      {" "}
                      Worked at a Design studio{" "}
                    </a>
                  </span>{" "}
                  for a short while before that.
                </h3>
                {/* <h3 className="mb-9 text-xl text-gray-100 tracking-2xl">
                  I am a big fan of Sahil Bloom and his thinking & a particular
                  thing that he preaches a lot about is the concept of Luck
                  Surface Area. If I had to sum up the thinking behind LSA (yeah
                  we are doing acronyms now) It will be -
                </h3> */}
                <div className="flex flex-wrap mb-9">
                  <div className="w-auto p-3">
                    <div className="w-0.5 bg-green-400 h-full rounded-md" />
                  </div>
                  {/* <div className="flex-1 mb-5 p-3">
                    <h3 className="mb-4 text-2xl text-gray-200 tracking-2xl">
                      Your luck increases the more you work towards it. The more
                      you work, the bigger your Luck Surface Area, the more
                      lucky you get.
                    </h3>
                  </div>
                  <p className="mb-8 text-lg">
                    {/* What this means is, what differentiates you from all the other people are out there?
                    Do peole know you ? WHY WOULD PEOPLE KNOW YOU? 
                    You have to give something to the people to remember you by. Something that shouts - This is your work, Be awed by it! */}
                  {/* </p> */}
                </div>
                {/* <p className="text-xl mt-2 text-blue Gray-200 mb-9">
                  So yeah, This website is my try at increasing my Luck Surface
                  Area.
                </p> */}
                <p className="text-xl mt-2 text-blue Gray-200 mb-9">
                  Reachout if you want to just talk. Always up for helping :){" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
