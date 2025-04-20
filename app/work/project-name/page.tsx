// 'use client';
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
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

const meta = {
  title: "Enhancing Guest EKG Recording | Aditya Oswal",
  meta: [],
  link: [],
  style: [],
  script: [],
};

const experiences = [
  {
    company: "Alivecor",
    role: "Product Designer",
    period: "2023 - Present",
    description: "Working with a stellar Product & engineering team to design healthcare products that make a real difference in people's lives.",
    skills: ["Product Design", "Healthcare", "User Research", "Prototyping"],
    link: "https://www.alivecor.com/"
  },
  {
    company: "Design Studio",
    role: "Product Designer",
    period: "2022 - 2023",
    description: "Worked on various client projects, focusing on creating meaningful digital experiences and solving complex design challenges.",
    skills: ["UI/UX Design", "Client Projects", "Design Systems", "User Testing"],
    link: "https://www.figma.com/proto/upYjzU2eQ4hDYXVhhvSqPn/Portfolio-Deck?page-id=0%3A1&type=design&node-id=415-443&viewport=-2824%2C-1072%2C0.19&t=ctFdwdz4IBYm11gK-1&scaling=contain&mode=design"
  }
];

export default function CaseStudyPage() {
  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      
      <main className="min-h-screen flex flex-col bg-white text-gray-900">
        {/* Project Header */}
        <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl font-normal">
              Enhancing Guest EKG Recording in Kardia
            </h1>

            <div className="grid grid-cols-3 gap-8 pt-8 text-sm">
              <div>
                <h3 className="font-medium mb-2">Platform</h3>
                <p>iOS + Android + Web Experience</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Timeline</h3>
                <p>July &apos;23 - Sept &apos;23</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Collaborators</h3>
                <p>PM, 2 Devs</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Project Overview */}
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
                Kardia is a leading personal electrocardiogram (EKG) device and app that empowers users to monitor their heart 
                health over the span of their lifetime. This includes giving guests the rare opportunity to try Kardia&apos;s features while 
                visiting a friend or family member who owns the device. After observing that many guest users were having trouble getting 
                an EKG or sharing it, I was asked to user test the Guest User flow and provide recording or UX design solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-normal mb-4">What is the Guest Recording flow?</h2>
                <p className="text-gray-600">
                  In our current Kardia Flow, it is sometimes hard to ask for user names quickly when deciding upon a record their 
                  EKG in a fast-paced clinical visit. We need to ensure that we save patient data safely, while also providing valuable EKG 
                  information to the guest user. This is where the Guest User flow comes in.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-normal mb-4">Why</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Low Visibility: Users having small phones find it hard to read recording</li>
                  <li>• Coordination Problems: They have trouble with camera and recording view</li>
                  <li>• Sharing Issues: Guests want to share recordings but can&apos;t</li>
                  <li>• Record Loss: All recordings are lost after 24 hours</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Process Sections */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <h2 className="text-2xl font-normal mb-8">Stages of User Identification</h2>
              <p className="text-gray-600">
                There were also the stages we felt we needed to enhance the user before the flow could grow based on data/gut feel
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-8">Design principles</h2>
              <p className="text-gray-600">
                What were our decisions based on
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-8">Iterations</h2>
              <p className="text-gray-600">
                These were also the stages we felt we needed to enhance the user before the flow could grow based on data/gut feel
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Rapid prototyping for low res to test our hypothesis</li>
                <li>• Usability tests activities</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-normal mb-8">Which metrics/Impact</h2>
              <p className="text-gray-600">
                Two levels:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• First level - Success/fail rate of the solution we added</li>
                <li>• Second level - How it ties into our end success for org</li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Next Steps */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-normal mb-8">Next steps - Future scope</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• How did it go</li>
              <li>• Outline all the learnings</li>
              <li>• With Data</li>
              <li>• What we did to prevent it</li>
              <li>• Decision points</li>
              <li>• Future steps</li>
            </ul>
          </motion.div>
        </section>
      </main>

      <Footer />
    </React.Fragment>
  );
}

// import Footer from '@/components/Footer';
// import Head from 'next/head';
// import Image from 'next/image';
// import React, { memo } from 'react';
// import { ErrorBoundary } from 'react-error-boundary';

// interface Stat {
//   label: string;
//   value: string;
// }

// interface ProjectStatsProps {
//   stats: Stat[];
// }

// const ProjectStats = memo(({ stats }: ProjectStatsProps) => (
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//     {stats.map((stat: Stat) => (
//       <div key={stat.label} className="bg-blue-50 p-6 rounded-lg text-center">
//         <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
//         <p className="text-gray-700">{stat.label}</p>
//       </div>
//     ))}
//   </div>
// ));
// ProjectStats.displayName = 'ProjectStats';

// // Separate data into constants
// const PROJECT_DETAILS = {
//   title: "Project Name",
//   description: "A brief description of the project and its significance.",
//   role: "Product Designer",
//   timeline: "2023 - 2024",
//   client: "Company Name",
//   team: "3 Designers, 4 Engineers"
// };

// interface ProjectDetailProps {
//   label: string;
//   value: string;
// }

// const ProjectDetail = ({ label, value }: ProjectDetailProps) => (
//   <div>
//     <p className="text-sm text-gray-500">{label}</p>
//     <p className="text-lg font-medium">{value}</p>
//   </div>
// );

// function ErrorFallback({error}: {error: Error}) {
//   return (
//     <div className="text-red-500 p-4">
//       <h2>Something went wrong:</h2>
//       <pre>{error.message}</pre>
//     </div>
//   )
// }

// export default function CaseStudy() {
//   return (
//     <ErrorBoundary FallbackComponent={ErrorFallback}>
//       <div className="min-h-screen bg-white text-gray-900">
//         <Head>
//           <title>Project Name - Case Study | Aditya Oswal</title>
//           <meta name="description" content="Detailed case study of Project Name showcasing the design process, solutions, and results" />
//           <meta name="keywords" content="UX design, case study, project name, design process" />
//           <meta property="og:title" content="Project Name - Case Study" />
//           <meta property="og:description" content="A case study for Project Name" />
//           <meta property="og:image" content="/images/hero-image.jpg" />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>

//         {/* Hero Section */}
//         <section className="pt-32 pb-16 px-6" role="main" aria-label="Project Introduction">
//           <div className="max-w-3xl mx-auto">
//             <h1 className="text-5xl font-bold mb-6" tabIndex={0}>
//               {PROJECT_DETAILS.title}
//             </h1>
//             <p className="text-xl text-gray-600 mb-8">
//               A brief description of the project and its significance.
//             </p>
//             <div className="grid grid-cols-2 gap-12">
//               <ProjectDetail label="ROLE" value={PROJECT_DETAILS.role} />
//               <ProjectDetail label="TIMELINE" value={PROJECT_DETAILS.timeline} />
//               <ProjectDetail label="CLIENT" value={PROJECT_DETAILS.client} />
//               <ProjectDetail label="TEAM" value={PROJECT_DETAILS.team} />
//             </div>
//           </div>
//         </section>

//         {/* Full-width Image */}
//         <section className="mb-24">
//           <div className="w-full h-[50vh] relative">
//             <Image 
//               src="/images/hero-image.jpg" 
//               alt="Project hero image"
//               fill
//               loading="eager"
//               priority={true}
//               className="object-cover bg-gray-400" 
//             />
//           </div>
//         </section>

//         {/* Overview */}
//         <section className="px-6 mb-24">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-3xl font-semibold mb-6">Overview</h2>
//             <p className="text-lg mb-6">
//               This project aimed to solve [specific problem] for [target audience]. 
//               The main challenge was to create a solution that was both intuitive 
//               and powerful enough to handle complex workflows.
//             </p>
//             <p className="text-lg">
//               Working closely with the engineering team, we developed a system that 
//               could scale with the company &apos;s growth while maintaining the simplicity 
//               that users loved about the original product.
//             </p>
//           </div>
//         </section>

//         {/* Problem Statement */}
//         <section className="px-6 mb-24 bg-gray-50 py-24">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-3xl font-semibold mb-6">The Problem</h2>
//             <p className="text-lg mb-6">
//               Users were struggling with [specific issues], which led to frustration 
//               and decreased productivity. The existing solution was:
//             </p>
//             <ul className="list-disc pl-6 mb-6 text-lg space-y-2">
//               <li>Too complex for new users</li>
//               <li>Missing key features needed by power users</li>
//               <li>Unable to integrate with other tools in their workflow</li>
//             </ul>
//             <p className="text-lg">
//               Our team was tasked with reimagining the experience while preserving 
//               what users already loved about the product.
//             </p>
//           </div>
//         </section>

//         {/* Process Section */}
//         <section className="px-6 mb-24">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-3xl font-semibold mb-12">Process</h2>
            
//             {/* Research */}
//             <div className="mb-16">
//               <h3 className="text-2xl font-medium mb-4">Research</h3>
//               <p className="text-lg mb-6">
//                 We conducted interviews with 20 users across different segments to 
//                 understand their workflows, pain points, and desired outcomes.
//               </p>
//               <div className="grid grid-cols-2 gap-6 mb-6">
//                 <div className="aspect-video bg-gray-200 relative">
//                   <Image 
//                     src="/images/research-1.jpg" 
//                     alt="Research session"
//                     fill
//                     className="object-cover" 
//                   />
//                 </div>
//                 <div className="aspect-video bg-gray-200 relative">
//                   <Image 
//                     src="/images/research-2.jpg" 
//                     alt="Research artifacts"
//                     fill
//                     className="object-cover" 
//                   />
//                 </div>
//               </div>
//               <p className="text-lg">
//                 Key insights included the need for better onboarding, simplified 
//                 navigation, and more powerful batch processing capabilities.
//               </p>
//             </div>
            
//             {/* Ideation */}
//             <div className="mb-16">
//               <h3 className="text-2xl font-medium mb-4">Ideation</h3>
//               <p className="text-lg mb-6">
//                 We ran multiple design sprints to explore different approaches, 
//                 focusing on the core workflows identified during research.
//               </p>
//               <div className="aspect-video bg-gray-200 mb-6 relative">
//                 <Image 
//                   src="/images/sketches.jpg" 
//                   alt="Sketches and wireframes"
//                   fill
//                   className="object-cover" 
//                 />
//               </div>
//               <p className="text-lg">
//                 Through rapid prototyping and feedback sessions, we narrowed down to 
//                 three concepts that showed the most promise.
//               </p>
//             </div>
            
//             {/* Design System */}
//             <div>
//               <h3 className="text-2xl font-medium mb-4">Design System</h3>
//               <p className="text-lg mb-6">
//                 We developed a comprehensive design system to ensure consistency 
//                 across the product while enabling the team to work efficiently.
//               </p>
//               <div className="grid grid-cols-3 gap-6 mb-6">
//                 <div className="aspect-square bg-gray-200 relative">
//                   <Image 
//                     src="/images/components-1.jpg" 
//                     alt="Design components"
//                     fill
//                     className="object-cover" 
//                   />
//                 </div>
//                 <div className="aspect-square bg-gray-200 relative">
//                   <Image 
//                     src="/images/components-2.jpg" 
//                     alt="Color system"
//                     fill
//                     className="object-cover" 
//                   />
//                 </div>
//                 <div className="aspect-square bg-gray-200 relative">
//                   <Image 
//                     src="/images/components-3.jpg" 
//                     alt="Typography system"
//                     fill
//                     className="object-cover" 
//                   />
//                 </div>
//               </div>
//               <p className="text-lg">
//                 The system included color palettes, typography, component libraries, 
//                 and interaction patterns that could scale across multiple platforms.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Solution */}
//         <section className="px-6 mb-24 bg-gray-50 py-24">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-3xl font-semibold mb-6">The Solution</h2>
//             <p className="text-lg mb-12">
//               After multiple iterations and user testing sessions, we landed on a 
//               solution that addressed the core problems while introducing new 
//               capabilities that users didn&apos;t know they needed.
//             </p>
            
//             <div className="mb-12">
//               <h3 className="text-2xl font-medium mb-4">Key Features</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
//                 <div>
//                   <div className="aspect-video bg-gray-200 mb-4 relative">
//                     <Image 
//                       src="/images/feature-1.jpg" 
//                       alt="Feature 1 screenshot"
//                       fill
//                       className="object-cover" 
//                     />
//                   </div>
//                   <h4 className="text-xl font-medium mb-2">Smart Dashboard</h4>
//                   <p className="text-lg">
//                     A personalized dashboard that adapts to the user&apos;s role and 
//                     frequently used features.
//                   </p>
//                 </div>
//                 <div>
//                   <div className="aspect-video bg-gray-200 mb-4 relative">
//                     <Image 
//                       src="/images/feature-2.jpg" 
//                       alt="Feature 2 screenshot"
//                       fill
//                       className="object-cover" 
//                     />
//                   </div>
//                   <h4 className="text-xl font-medium mb-2">Batch Processing</h4>
//                   <p className="text-lg">
//                     Powerful tools for handling multiple items at once, with 
//                     intelligent suggestions based on past behavior.
//                   </p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                 <div>
//                   <div className="aspect-video bg-gray-200 mb-4 relative">
//                     <Image 
//                       src="/images/feature-3.jpg" 
//                       alt="Feature 3 screenshot"
//                       fill
//                       className="object-cover" 
//                     />
//                   </div>
//                   <h4 className="text-xl font-medium mb-2">Integration Hub</h4>
//                   <p className="text-lg">
//                     Seamless connections with other tools in the workflow, reducing 
//                     context switching and data duplication.
//                   </p>
//                 </div>
//                 <div>
//                   <div className="aspect-video bg-gray-200 mb-4 relative">
//                     <Image 
//                       src="/images/feature-4.jpg" 
//                       alt="Feature 4 screenshot"
//                       fill
//                       className="object-cover" 
//                     />
//                   </div>
//                   <h4 className="text-xl font-medium mb-2">Guided Onboarding</h4>
//                   <p className="text-lg">
//                     An interactive tutorial system that helps new users get 
//                     productive quickly while discovering advanced features.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Results */}
//         <section className="px-6 mb-24">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-3xl font-semibold mb-6">Impact & Results</h2>
//             <p className="text-lg mb-12">
//               The redesigned product launched in phases over six months, with careful 
//               monitoring of user adoption and feedback.
//             </p>
            
//             <ProjectStats stats={[
//               { label: "Increase in user engagement with the platform", value: "87%" },
//               { label: "Reduction in support tickets related to UX issues", value: "42%" },
//               { label: "Increase in user retention after the first month", value: "3.2x" }
//             ]} />
            
//             <div className="bg-gray-100 p-8 rounded-lg mb-12">
//               <blockquote className="text-xl italic mb-4">
//               &quot;The new interface has completely transformed how our team works. 
//                 What used to take days now takes hours, and the learning curve for 
//                 new team members has dropped dramatically&quot;
//               </blockquote>
//               <cite className="text-lg">
//                 — Sarah Johnson, Director of Operations at Client Company
//               </cite>
//             </div>
            
//             <p className="text-lg">
//               The project has been recognized with industry awards for its innovative 
//               approach to complex workflow management, and has become a case study 
//               for effective user-centered design in enterprise software.
//             </p>
//           </div>
//         </section>
//       </div>
//     </ErrorBoundary>
//   )
// } 