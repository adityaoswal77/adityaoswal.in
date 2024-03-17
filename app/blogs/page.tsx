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
        <img className="absolute top-0 left-0" src="" alt="" />
        <div className="container px-4 mx-auto">
          <div className="mb-12 md:max-w-md text-center mx-auto">
            <h2 className="mb-4 text-3xl text-white tracking-3xl">
              Experiences
            </h2>
            <p className="mb-6 text-white text-opacity-60">
              Random musings & A bit about me.
            </p>
            <div className="flex flex-wrap justify-center items-center -m-2">
              <div className="w-auto p-2">
                <img
                  src="nightsable-assets/images/blog-content/avatar.png"
                  alt=""
                />
              </div>
              <div className="w-auto p-2">
                <p className="text-sm text-white font-medium tracking-tighter">
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
                <p className="text-sm text-white font-medium tracking-tighter">
                  Short read
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative px-4">
          <img
            className="hidden md:block absolute -top-44 right-0"
            src="assets/aditya.jpg"
            alt=""
          />
          <img
            className="relative z-10 mx-auto border border-white border-opacity-10 rounded-5xl"
            src="nightsable-assets/images/blog-content/header.png"
            alt=""
          />
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
                  A bit about me.
                </h2>
                <h3 className="mb-9 text-xl text-gray-100 tracking-2xl">
                  Working as a Product Designer at
                  <span className="text-bold">
                    <a
                      className="text-bold text-teal-500"
                      href="https://www.alivecor.com/"
                    >
                     {" "} Alivecor. {" "}
                    </a>
                  </span>{" "}
                  with a stellar Product & engineering team. 
                  <span className="text-bold">
                    <a
                      className="text-bold text-teal-500"
                      href="https://www.figma.com/proto/upYjzU2eQ4hDYXVhhvSqPn/Portfolio-Deck?page-id=0%3A1&type=design&node-id=415-443&viewport=-2824%2C-1072%2C0.19&t=ctFdwdz4IBYm11gK-1&scaling=contain&mode=design"
                    > {" "}
                      Worked at a Design studio{" "}
                    </a>
                  </span>{" "}
                  for a short while before that.
                </h3>
                <h3 className="mb-9 text-xl text-gray-100 tracking-2xl">
                  I am a big fan of Sahil Bloom and his thinking & a particular
                  thing that he preaches a lot about is the concept of Luck
                  Surface Area. If I had to sum up the thinking behind LSA (yeah
                  we are doing acronyms now) It will be -
                </h3>
                <div className="flex flex-wrap mb-9">
                  <div className="w-auto p-3">
                    <div className="w-0.5 bg-green-400 h-full rounded-md" />
                  </div>
                  <div className="flex-1 mb-5 p-3">
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
                  </p>
                </div>
                <p className="text-xl mt-2 text-blue Gray-200 mb-9">
                  So yeah, This website is my try at increasing my Luck Surface
                  Area.
                </p>
                <p className="text-xl mt-2 text-blue Gray-200 mb-9">
                  Reachout if you want to just talk. Always up for helping :){" "}
                </p>

                {/* <ul className="mb-9">
                  <li className="text-2xl text-gray-100">
                    1. Lectus id duis vitae porttitor enim gravida morbi.
                  </li>
                  <li className="text-2xl text-gray-100">
                    2. Eu turpis posuere semper feugiat volutpat elit, ultrices
                    suspendisse. Auctor vel in vitae placerat.
                  </li>
                  <li className="text-2xl text-gray-100">
                    3. Suspendisse maecenas ac donec scelerisque diam sed est
                    duis purus.
                  </li>
                </ul>
                <h3 className="mb-12 text-2xl text-gray-100 tracking-2xl">
                  Vestibulum placerat magna nulla, sit amet venenatis sapien
                  consequat ut. Cras pulvinar, lorem tristique pharetra finibus,
                  dui erat finibus orci, a vehicula arcu sapien id metus.
                  Quisque quis lorem a sem porttitor feugiat. Etiam quis congue
                  est. Donec fermentum ac libero a pretium. Nulla nisl sem,
                  euismod ut eros vitae, egestas scelerisque enim.{" "}
                  <a className="text-green-500 underline" href="#">
                    Vivamus id pharetra massa
                  </a>
                  . Nulla aliquet erat elit, a gravida dui efficitur vel. Sed
                  pulvinar diam sed neque ullamcorper semper. Nulla elementum
                  arcu lacus, quis porta nisl posuere varius. Quisque tempus
                  libero sed urna posuere hendrerit.
                </h3> */}
                <div className="flex flex-wrap justify-center -m-2">
                  <div className="w-auto p-2">
                    <a
                      className="flex items-center justify-center text-white hover:text-black font-medium tracking-tighter hover:bg-green-400 border-2 border-white focus:border-green-400 focus:border-opacity-40 hover:border-green-400 focus:ring-4 focus:ring-green-400 focus:ring-opacity-40 rounded-full transition duration-300"
                      href="https://www.linkedin.com/in/oswaladitya/"
                      style={{ width: 60, height: 60 }}
                    >
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className="w-auto p-2">
                    <a
                      className="flex items-center justify-center text-white hover:text-black font-medium tracking-tighter hover:bg-green-400 border-2 border-white focus:border-green-400 focus:border-opacity-40 hover:border-green-400 focus:ring-4 focus:ring-green-400 focus:ring-opacity-40 rounded-full transition duration-300"
                      href="https://github.com/adityaoswal77"
                      style={{ width: 60, height: 60 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fill="currentColor"
                          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className="w-auto p-2">
                    <a
                      className="flex items-center justify-center text-white hover:text-black font-medium tracking-tighter hover:bg-green-400 border-2 border-white focus:border-green-400 focus:border-opacity-40 hover:border-green-400 focus:ring-4 focus:ring-green-400 focus:ring-opacity-40 rounded-full transition duration-300"
                      href="https://twitter.com/oswaluxd"
                      style={{ width: 60, height: 60 }}
                    >
                      <svg
                        width={18}
                        height={14}
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.3346 1.83326C16.7083 2.10501 16.0458 2.28465 15.368 2.3666C16.0831 1.93936 16.619 1.26725 16.8763 0.474931C16.2043 0.874983 15.4686 1.15684 14.7013 1.30826C14.1884 0.752074 13.5054 0.381844 12.7595 0.25564C12.0135 0.129436 11.2468 0.254396 10.5795 0.610922C9.91217 0.967448 9.38208 1.53537 9.07234 2.22563C8.76259 2.91588 8.69071 3.68942 8.86797 4.42493C7.50916 4.3562 6.18 4.00239 4.96685 3.38648C3.75369 2.77057 2.68367 1.90634 1.8263 0.84993C1.52558 1.37507 1.36757 1.96978 1.36797 2.57493C1.3669 3.13692 1.50482 3.69044 1.76943 4.18623C2.03405 4.68202 2.41715 5.10469 2.88464 5.4166C2.34128 5.40181 1.80954 5.25601 1.33464 4.9916V5.03326C1.33871 5.82067 1.61463 6.58251 2.11573 7.1899C2.61683 7.7973 3.31235 8.21297 4.08464 8.3666C3.78735 8.45707 3.4787 8.50477 3.16797 8.50826C2.95288 8.50575 2.73832 8.48625 2.5263 8.44993C2.74623 9.12727 3.17182 9.71922 3.74386 10.1434C4.31591 10.5676 5.00595 10.8029 5.71797 10.8166C4.51564 11.7627 3.03121 12.279 1.5013 12.2833C1.22275 12.2842 0.944415 12.2675 0.667969 12.2333C2.22999 13.2418 4.05031 13.7772 5.90964 13.7749C7.19271 13.7883 8.46558 13.5458 9.6539 13.0617C10.8422 12.5775 11.9222 11.8615 12.8306 10.9553C13.7391 10.0492 14.4579 8.97109 14.9451 7.78402C15.4323 6.59695 15.678 5.3247 15.668 4.0416C15.668 3.89993 15.668 3.74993 15.668 3.59993C16.3219 3.11227 16.8859 2.51445 17.3346 1.83326Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="pt-16">
            <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">
              The latest news
            </span>
            <h2 className="mb-16 text-5xl lg:text-7xl xl:text-8xl text-white tracking-5xl lg:tracking-7xl xl:tracking-8xl">
              From the blog
            </h2>
            <div className="flex flex-wrap -m-4"> */}
          {/* <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="mb-8 overflow-hidden rounded-3xl">
                  <img
                    className="w-full transform hover:scale-125 transition duration-1000"
                    src="nightsable-assets/images/blog-content/cash.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-wrap items-center -m-2 mb-4">
                  <div className="w-auto p-2">
                    <span className="text-sm text-white font-medium tracking-tighter">
                      Blog Post
                    </span>
                  </div>
                  <div className="w-auto p-2">
                    <svg
                      width={3}
                      height={3}
                      viewBox="0 0 3 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.492 2.5H0.574V0.33H2.492V2.5Z" fill="white" />
                    </svg>
                  </div>
                  <div className="w-auto p-2">
                    <span className="text-sm text-white font-medium tracking-tighter">
                      9 min read
                    </span>
                  </div>
                </div> */}
          {/* <a className="group block" href="#">
                  <h3 className="mb-4 text-3xl text-white tracking-3xl hover:underline">
                    Women in business
                  </h3>
                </a>
                <p className="mb-6 text-white text-opacity-60">
                  Nightsable is a strategic branding agency focused on brand
                  creation
                </p>
                <div className="flex flex-wrap -m-1.5">
                  <div className="w-auto p-1.5">
                    <span className="inline-block px-6 py-3.5 text-sm text-white font-medium bg-blueGray-900 hover:bg-blueGray-900 bg-opacity-30 hover:bg-opacity-40 rounded-full transition duration-300">
                      Corporate Gifting
                    </span>
                  </div>
                  <div className="w-auto p-1.5">
                    <span className="inline-block px-6 py-3.5 text-sm text-white font-medium bg-blueGray-900 hover:bg-blueGray-900 bg-opacity-30 hover:bg-opacity-40 rounded-full transition duration-300">
                      Sales
                    </span>
                  </div>
                  <div className="w-auto p-1.5">
                    <span className="inline-block px-6 py-3.5 text-sm text-white font-medium bg-blueGray-900 hover:bg-blueGray-900 bg-opacity-30 hover:bg-opacity-40 rounded-full transition duration-300">
                      Marketing
                    </span>
                  </div>
                </div> 
              </div>*/}
        </div>
      </section>
    </React.Fragment>
  );
}
