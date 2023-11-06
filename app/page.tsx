import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-12">
        <section className="relative overflow-hidden">
          <div className="relative pt-16 pb-24">
            <div className="relative z-10 container px-4 mx-auto">
              <div className="mb-24 text-center md:max-w-4xl mx-auto">
                {/* <span className="inline-block mb-2.5 text-sm text-green-400 font-medium tracking-tighter">
                  Personal Website
                </span> */}
                <span className="inline-flex items-center mb-5 rounded-md bg-green-200/20 px-2 py-1 text-s font-medium text-green-600 ring-1 ring-inset ring-green-600/60">
                  Personal Website
                </span>
                <h1 className="mb-8 text-7xl lg:text-8xl text-white tracking-tighter">
                  Aditya Oswal
                </h1>
                <p className="mb-10 text-lg text-white md:max-w-sm mx-auto">
                  UX Designer | Webflow Developer
                </p>
                <div className="flex flex-wrap justify-center -m-2">
                  <div className="w-auto mx-2">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-4 mx-2  text-white hover:text-black tracking-tighter hover:bg-blue-500 border-2 border-white focus:border-green-400 focus:border-opacity-40 hover:border-blue-500 focus:ring-4 focus:ring-green-400 focus:ring-opacity-40 rounded-full transition duration-300"
                      href="https://www.figma.com/proto/upYjzU2eQ4hDYXVhhvSqPn/Portfolio-Deck?page-id=0%3A1&type=design&node-id=415-443&viewport=-2824%2C-1072%2C0.19&t=ctFdwdz4IBYm11gK-1&scaling=contain&mode=design"
                    >
                      Portfolio
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-4 mx-2 text-white hover:text-black tracking-tighter hover:bg-blue-500 border-2 border-white focus:border-green-400 focus:border-opacity-40 hover:border-blue-500 focus:ring-4 focus:ring-green-400 focus:ring-opacity-40 rounded-full transition duration-300"
                      href="https://drive.google.com/drive/folders/1d7JqAFL_SbR3dN9wo7B32x3Uzu-dpfzp?usp=sharing"
                    >
                      Resume
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center -m-2 pt-8">
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
                  {/* <div className="w-auto p-2">
                    <a
                      className="flex items-center justify-center text-white hover:text-black font-medium tracking-tighter hover:bg-green-400 border-2 border-white focus:border-green-400 focus:border-opacity-40 hover:border-green-400 focus:ring-4 focus:ring-green-400 focus:ring-opacity-40 rounded-full transition duration-300"
                      href="#"
                      style={{ width: 60, height: 60 }}
                    >
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.4513 3.55008C13.2535 3.55008 13.0602 3.60873 12.8957 3.71861C12.7313 3.82849 12.6031 3.98467 12.5274 4.1674C12.4517 4.35012 12.4319 4.55119 12.4705 4.74517C12.5091 4.93915 12.6043 5.11734 12.7442 5.25719C12.884 5.39704 13.0622 5.49228 13.2562 5.53087C13.4502 5.56945 13.6513 5.54965 13.834 5.47396C14.0167 5.39827 14.1729 5.2701 14.2828 5.10565C14.3927 4.9412 14.4513 4.74786 14.4513 4.55008C14.4513 4.28486 14.3459 4.03051 14.1584 3.84297C13.9709 3.65544 13.7165 3.55008 13.4513 3.55008V3.55008ZM17.2846 5.56675C17.2684 4.87533 17.1389 4.19125 16.9013 3.54175C16.6894 2.98603 16.3596 2.48281 15.9346 2.06675C15.522 1.6396 15.0176 1.3119 14.4596 1.10841C13.8118 0.863549 13.127 0.73109 12.4346 0.716748C11.5513 0.666748 11.268 0.666748 9.0013 0.666748C6.73464 0.666748 6.4513 0.666748 5.56797 0.716748C4.8756 0.73109 4.19075 0.863549 3.54297 1.10841C2.98603 1.31396 2.48208 1.64138 2.06797 2.06675C1.64082 2.4794 1.31312 2.98378 1.10964 3.54175C0.864769 4.18953 0.73231 4.87438 0.717969 5.56675C0.667969 6.45008 0.667969 6.73342 0.667969 9.00008C0.667969 11.2667 0.667969 11.5501 0.717969 12.4334C0.73231 13.1258 0.864769 13.8106 1.10964 14.4584C1.31312 15.0164 1.64082 15.5208 2.06797 15.9334C2.48208 16.3588 2.98603 16.6862 3.54297 16.8917C4.19075 17.1366 4.8756 17.2691 5.56797 17.2834C6.4513 17.3334 6.73464 17.3334 9.0013 17.3334C11.268 17.3334 11.5513 17.3334 12.4346 17.2834C13.127 17.2691 13.8118 17.1366 14.4596 16.8917C15.0176 16.6883 15.522 16.3606 15.9346 15.9334C16.3615 15.5189 16.6916 15.0152 16.9013 14.4584C17.1389 13.8089 17.2684 13.1248 17.2846 12.4334C17.2846 11.5501 17.3346 11.2667 17.3346 9.00008C17.3346 6.73342 17.3346 6.45008 17.2846 5.56675V5.56675ZM15.7846 12.3334C15.7786 12.8624 15.6828 13.3865 15.5013 13.8834C15.3682 14.2461 15.1545 14.5738 14.8763 14.8417C14.606 15.1172 14.279 15.3304 13.918 15.4667C13.4211 15.6482 12.8969 15.744 12.368 15.7501C11.5346 15.7917 11.2263 15.8001 9.03464 15.8001C6.84297 15.8001 6.53464 15.8001 5.7013 15.7501C5.15204 15.7604 4.60513 15.6758 4.08464 15.5001C3.73945 15.3568 3.42743 15.1441 3.16797 14.8751C2.89138 14.6074 2.68034 14.2794 2.5513 13.9167C2.34785 13.4127 2.23501 12.8767 2.21797 12.3334C2.21797 11.5001 2.16797 11.1917 2.16797 9.00008C2.16797 6.80842 2.16797 6.50008 2.21797 5.66675C2.2217 5.12596 2.32043 4.59004 2.50964 4.08341C2.65634 3.73167 2.88152 3.41813 3.16797 3.16675C3.42115 2.88022 3.73404 2.65266 4.08464 2.50008C4.59259 2.31678 5.12797 2.22098 5.66797 2.21675C6.5013 2.21675 6.80964 2.16675 9.0013 2.16675C11.193 2.16675 11.5013 2.16675 12.3346 2.21675C12.8636 2.22282 13.3877 2.31862 13.8846 2.50008C14.2633 2.64063 14.6032 2.86912 14.8763 3.16675C15.1494 3.42273 15.3628 3.73569 15.5013 4.08341C15.6865 4.59086 15.7824 5.12656 15.7846 5.66675C15.8263 6.50008 15.8346 6.80842 15.8346 9.00008C15.8346 11.1917 15.8263 11.5001 15.7846 12.3334ZM9.0013 4.72508C8.15614 4.72673 7.33044 4.97885 6.62851 5.4496C5.92659 5.92034 5.37995 6.58858 5.05766 7.36988C4.73538 8.15117 4.65191 9.01047 4.8178 9.83919C4.98369 10.6679 5.3915 11.4289 5.9897 12.0259C6.5879 12.6229 7.34964 13.0293 8.17869 13.1935C9.00773 13.3578 9.86686 13.2727 10.6475 12.9489C11.4282 12.6251 12.0954 12.0771 12.5647 11.3743C13.0341 10.6714 13.2846 9.84524 13.2846 9.00008C13.2857 8.43767 13.1756 7.88059 12.9607 7.36088C12.7457 6.84117 12.4301 6.36909 12.032 5.97179C11.634 5.57449 11.1613 5.25981 10.6411 5.04586C10.121 4.8319 9.56371 4.72288 9.0013 4.72508V4.72508ZM9.0013 11.7751C8.45246 11.7751 7.91594 11.6123 7.45959 11.3074C7.00325 11.0025 6.64757 10.5691 6.43754 10.062C6.2275 9.55496 6.17255 8.997 6.27962 8.45871C6.3867 7.92041 6.65099 7.42595 7.03908 7.03786C7.42717 6.64977 7.92163 6.38548 8.45993 6.2784C8.99822 6.17133 9.55618 6.22628 10.0632 6.43632C10.5703 6.64635 11.0037 7.00203 11.3086 7.45837C11.6136 7.91472 11.7763 8.45124 11.7763 9.00008C11.7763 9.3645 11.7045 9.72535 11.5651 10.062C11.4256 10.3987 11.2212 10.7046 10.9635 10.9623C10.7058 11.22 10.3999 11.4244 10.0632 11.5638C9.72657 11.7033 9.36572 11.7751 9.0013 11.7751V11.7751Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
