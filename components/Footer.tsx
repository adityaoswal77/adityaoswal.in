"use client";

import React from "react";

export default function Footer() {
  return (
  <section className="py-16 overflow-hidden">
  <div className="container px-4 mx-auto">
    <div className="flex flex-wrap items-center justify-between -m-8">
      <div className="w-auto p-8">
        Made with ❤ by Aditya
        {/* <img src="nightsable-assets/logos/logo.svg" alt=""/> */}
      </div>
      <div className="w-auto p-8">
        <ul className="flex flex-wrap -m-5">
          <li className="p-5"><a className="inline-block text-lg font-medium text-gray-300 hover:text-white transition duration-300" href="https://www.linkedin.com/in/oswaladitya/">Linkedin</a></li>
          <li className="p-5"><a className="inline-block text-lg font-medium text-gray-300 hover:text-white transition duration-300" href="https://github.com/adityaoswal77#">GitHub</a></li>
          <li className="p-5"><a className="inline-block text-lg font-medium text-gray-300 hover:text-white transition duration-300" href="https://twitter.com/oswaluxd">Twitter</a></li>
        </ul>
      </div>
      {/* <div className="w-auto p-8">
        <div className="relative border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl">
        </div>
      </div> */}
    </div>
  </div>
</section>
  );
}