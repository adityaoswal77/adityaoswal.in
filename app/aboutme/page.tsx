"use client";

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedGradient } from '@/components/background/AnimatedGradient';

const meta = {
  title: "About | Aditya Oswal",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function AboutPage() {
  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      
      <main className="min-h-screen flex flex-col bg-white text-gray-900 relative">
        <AnimatedGradient className="pointer-events-none" />
        
        <div className="relative z-10">
          {/* Personal Header */}
          <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-[1fr,auto] gap-12 items-start"
            >
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl font-normal">
                  Product Designer crafting healthcare experiences at Alivecor
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 text-sm">
                  <div>
                    <h3 className="font-medium mb-2">Current Role</h3>
                    <p>Product Designer @ Alivecor</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Location</h3>
                    <p>Bangalore, India</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Focus</h3>
                    <p>Healthcare Design, User Experience, Design Systems</p>
                  </div>
                </div>
              </div>

              <div className="relative w-48 h-48 rounded-lg overflow-hidden">
                <Image
                  src="/assets/aditya.jpg"
                  alt="Aditya Oswal"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </section>

          {/* About Overview */}
          <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed">
                  I&apos;m a Product Designer focused on creating meaningful healthcare experiences. Currently at Alivecor, 
                  I work on designing solutions that help people monitor and understand their heart health better. My approach 
                  combines user-centered design with healthcare expertise to create products that are both impactful and accessible.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-normal mb-4">What I Do</h2>
                  <p className="text-gray-600">
                    I specialize in healthcare product design, focusing on creating intuitive interfaces that make complex medical 
                    information accessible and actionable for users. My work spans across mobile apps, web platforms, and integrated 
                    healthcare solutions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-normal mb-4">Expertise</h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Healthcare UX Design</li>
                    <li>• Product Strategy</li>
                    <li>• User Research</li>
                    <li>• Design Systems</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Experience */}
          <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div>
                <h2 className="text-2xl font-normal mb-8">Work Experience</h2>
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Product Designer</h3>
                    <p className="text-gray-600 mb-4">Alivecor • 2023 - Present</p>
                    <p className="text-gray-600">
                      Working on designing healthcare products that make a real difference in people&apos;s lives. 
                      Leading design initiatives for heart health monitoring solutions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-2">UX Intern</h3>
                    <p className="text-gray-600 mb-4">Wolffkraft Design Studio • Dec 2022</p>
                    <p className="text-gray-600">
                      Worked on various client projects, focused on abosrbing as much as I could about Design.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </React.Fragment>
  );
}
