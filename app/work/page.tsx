// // // pages/work.js
// // import Head from 'next/head';
// // import Link from 'next/link';
// // import Image from 'next/image';

// // export default function Work() {
// //   // Data for featured case studies
// //   const featuredCaseStudies = [
// //     {
// //       id: 1,
// //       title: "Reimagining Financial Management for Millennials",
// //       category: "UX/UI Design",
// //       description: "Redesigned a personal finance app to increase engagement and retention among millennial users.",
// //       image: "/api/placeholder/600/400",
// //       link: "/case-study/financial-app",
// //       stats: {
// //         increase: "73%",
// //         statInfo: "increase in daily active users"
// //       }
// //     },
// //     {
// //       id: 2,
// //       title: "E-commerce Conversion Optimization",
// //       category: "UX Research & Strategy",
// //       description: "Overhauled the checkout experience for a fashion retailer, reducing cart abandonment by 34%.",
// //       image: "/api/placeholder/600/400",
// //       link: "/case-study/ecommerce",
// //       stats: {
// //         increase: "34%",
// //         statInfo: "reduction in cart abandonment"
// //       }
// //     },
// //     {
// //       id: 3,
// //       title: "Healthcare App Accessibility Redesign",
// //       category: "Accessibility & Inclusive Design",
// //       description: "Transformed a healthcare app to meet WCAG 2.1 AA standards while improving the experience for all users.",
// //       image: "/api/placeholder/600/400",
// //       link: "/case-study/healthcare-app",
// //       stats: {
// //         increase: "98%",
// //         statInfo: "compliance with accessibility standards"
// //       }
// //     }
// //   ];

// //   // Data for client projects
// //   const clientProjects = [
// //     {
// //       id: 4,
// //       title: "Corporate Website Redesign",
// //       client: "TechCorp Industries",
// //       year: "2023",
// //       image: "/api/placeholder/400/300",
// //       link: "/case-study/techcorp"
// //     },
// //     {
// //       id: 5,
// //       title: "Mobile Banking App",
// //       client: "First Secure Bank",
// //       year: "2022",
// //       image: "/api/placeholder/400/300",
// //       link: "/case-study/banking-app"
// //     },
// //     {
// //       id: 6,
// //       title: "Online Learning Platform",
// //       client: "EduSmart",
// //       year: "2021",
// //       image: "/api/placeholder/400/300",
// //       link: "/case-study/edusmart"
// //     }
// //   ];

// //   // Data for experimental projects
// //   const experimentalProjects = [
// //     {
// //       id: 7,
// //       title: "VR Meditation Experience",
// //       tools: "Unity, Oculus SDK",
// //       description: "Exploring mindfulness in virtual reality environments",
// //       image: "/api/placeholder/400/300",
// //       link: "/case-study/vr-meditation"
// //     },
// //     {
// //       id: 8,
// //       title: "Voice User Interface Prototype",
// //       tools: "Adobe XD, Dialogflow",
// //       description: "Conversational UI for elderly home assistance",
// //       image: "/api/placeholder/400/300",
// //       link: "/case-study/voice-ui"
// //     },
// //     {
// //       id: 9,
// //       title: "Data Visualization Dashboard",
// //       tools: "D3.js, React",
// //       description: "Interactive visualization of climate change data",
// //       image: "/api/placeholder/400/300",
// //       link: "/case-study/data-viz"
// //     }
// //   ];

// //   return (
// //     <>
// //       <Head>
// //         <title>My Work | UX Designer & Researcher</title>
// //         <meta name="description" content="Explore my portfolio of UX design case studies, client projects, and experimental work" />
// //         <link rel="icon" href="/favicon.ico" />
// //       </Head>

// //       <main className="min-h-screen bg-gray-50">
// //         {/* Hero section */}
// //         <section className="bg-gray-900 text-white py-20">
// //           <div className="container mx-auto px-6 text-center">
// //             <h1 className="text-4xl md:text-5xl font-bold mb-6">My Work</h1>
// //             <p className="text-xl max-w-3xl mx-auto text-gray-300">
// //               A collection of selected projects that showcase my approach to solving complex design challenges
// //               and creating meaningful user experiences.
// //             </p>
// //           </div>
// //         </section>

// //         {/* Featured Case Studies Section */}
// //         <section className="py-20 bg-white">
// //           <div className="container mx-auto px-6">
// //             <h2 className="text-3xl font-bold text-gray-800 mb-3">Featured Case Studies</h2>
// //             <p className="text-gray-600 mb-12 max-w-3xl">
// //               In-depth explorations of my most impactful design projects, with detailed processes and outcomes.
// //             </p>

// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
// //               {featuredCaseStudies.map((study) => (
// //                 <Link href={study.link} key={study.id}>
// //                   <div className="group bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl h-full flex flex-col transform hover:-translate-y-1">
// //                     <div className="relative h-56 overflow-hidden">
// //                       <Image
// //                         src={study.image}
// //                         alt={study.title}
// //                         layout="fill"
// //                         objectFit="cover"
// //                         className="transition-transform duration-500 group-hover:scale-105"
// //                       />
// //                       <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
// //                       <div className="absolute bottom-4 left-4">
// //                         <span className="px-3 py-1 bg-blue-600 text-white text-xs uppercase tracking-wider rounded-full">
// //                           {study.category}
// //                         </span>
// //                       </div>
// //                     </div>

// //                     <div className="p-6 flex-grow flex flex-col">
// //                       <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
// //                         {study.title}
// //                       </h3>
// //                       <p className="text-gray-600 mb-6 flex-grow">{study.description}</p>
// //                       <div className="mt-auto">
// //                         <div className="flex items-center">
// //                           <span className="text-2xl font-bold text-blue-600 mr-2">{study.stats.increase}</span>
// //                           <span className="text-sm text-gray-500">{study.stats.statInfo}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </Link>
// //               ))}
// //             </div>

// //             <div className="mt-12 text-center">
// //               <Link href="/all-case-studies">
// //                 <span className="inline-block px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer">
// //                   View All Case Studies
// //                 </span>
// //               </Link>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Client Projects Section */}
// //         <section className="py-20 bg-gray-50">
// //           <div className="container mx-auto px-6">
// //             <h2 className="text-3xl font-bold text-gray-800 mb-3">Client Projects</h2>
// //             <p className="text-gray-600 mb-12 max-w-3xl">
// //               A selection of professional work Ive delivered for clients across various industries.
// //             </p>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //               {clientProjects.map((project) => (
// //                 <Link href={project.link} key={project.id}>
// //                   <div className="group relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
// //                     <Image
// //                       src={project.image}
// //                       alt={project.title}
// //                       layout="fill"
// //                       objectFit="cover"
// //                       className="transition-transform duration-500 group-hover:scale-105"
// //                     />
// //                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-90 transition-opacity"></div>
// //                     <div className="absolute bottom-0 left-0 right-0 p-6">
// //                       <div className="text-sm font-medium text-white opacity-70 mb-1">{project.client} · {project.year}</div>
// //                       <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
// //                       <span className="w-0 h-0.5 bg-blue-500 block transition-all duration-300 group-hover:w-16"></span>
// //                     </div>
// //                   </div>
// //                 </Link>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Experimental Projects Section */}
// //         <section className="py-20 bg-white">
// //           <div className="container mx-auto px-6">
// //             <h2 className="text-3xl font-bold text-gray-800 mb-3">Experimental Work</h2>
// //             <p className="text-gray-600 mb-12 max-w-3xl">
// //               Self-initiated projects where I explore new technologies, design methods, and creative concepts.
// //             </p>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //               {experimentalProjects.map((project) => (
// //                 <Link href={project.link} key={project.id}>
// //                   <div className="group rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:border-blue-200 hover:shadow-md bg-white h-full flex flex-col">
// //                     <div className="relative h-48 overflow-hidden bg-gray-100">
// //                       <Image
// //                         src={project.image}
// //                         alt={project.title}
// //                         layout="fill"
// //                         objectFit="cover"
// //                         className="opacity-90 group-hover:opacity-100 transition-opacity"
// //                       />
// //                     </div>
                    
// //                     <div className="p-6 flex-grow flex flex-col">
// //                       <div className="mb-3">
// //                         <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
// //                           {project.tools}
// //                         </span>
// //                       </div>
// //                       <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
// //                         {project.title}
// //                       </h3>
// //                       <p className="text-gray-600 text-sm flex-grow">{project.description}</p>
                      
// //                       <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
// //                         <span>View project</span>
// //                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                         </svg>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </Link>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Contact CTA Section */}
// //         <section className="py-16 bg-blue-900 text-white">
// //           <div className="container mx-auto px-6 text-center">
// //             <h2 className="text-3xl font-bold mb-6">Interested in working together?</h2>
// //             <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
// //               Im always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
// //             </p>
// //             <Link href="/contact">
// //               <span className="inline-block px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
// //                 Get in Touch
// //               </span>
// //             </Link>
// //           </div>
// //         </section>
// //       </main>

// //       {/* Footer */}
// //       <footer className="bg-gray-900 text-gray-400 py-12">
// //         <div className="container mx-auto px-6">
// //           <div className="flex flex-col md:flex-row justify-between items-center">
// //             <div className="mb-6 md:mb-0">
// //               <p className="font-semibold text-gray-300 text-lg mb-2">Your Name</p>
// //               <p>UX Designer & Researcher</p>
// //             </div>
// //             <div className="flex space-x-6">
// //               <a href="#" className="hover:text-white transition duration-300">
// //                 <span className="sr-only">LinkedIn</span>
// //                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
// //                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
// //                 </svg>
// //               </a>
// //               <a href="#" className="hover:text-white transition duration-300">
// //                 <span className="sr-only">Twitter</span>
// //                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
// //                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
// //                 </svg>
// //               </a>
// //               <a href="#" className="hover:text-white transition duration-300">
// //                 <span className="sr-only">Dribbble</span>
// //                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
// //                   <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z" />
// //                 </svg>
// //               </a>
// //             </div>
// //           </div>
// //           <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
// //             <p>&copy; 2025 Your Name. All rights reserved.</p>
// //           </div>
// //         </div>
// //       </footer>
// //     </>
// //   );
// // }

// // pages/case-study.js
// import Head from 'next/head';
// import Image from 'next/image';

// export default function CaseStudy() {
//   return (
//     <>
//       <Head>
//         <title>Reimagining Financial Management for Millennials - UX Case Study</title>
//         <meta name="description" content="A UX case study on redesigning the personal finance app Budgetly" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="min-h-screen bg-gray-50">
//         {/* Hero section */}
//         <section className="relative h-[70vh] bg-blue-900 flex items-center justify-center overflow-hidden">
//           <div className="absolute inset-0 opacity-30">
//             <Image
//               src="/api/placeholder/1920/1080"
//               alt="Background illustration of financial app interface"
//               layout="fill"
//               objectFit="cover"
//               priority
//             />
//           </div>
//           <div className="container mx-auto px-6 z-10 text-center">
//             <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
//               Reimagining Financial Management for Millennials
//             </h1>
//             <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
//               A UX case study on redesigning the personal finance app Budgetly
//             </p>
//           </div>
//         </section>

//         {/* Overview section */}
//         <section className="container mx-auto px-6 py-16 max-w-4xl">
//           <div className="flex flex-col md:flex-row gap-12 items-center">
//             <div className="md:w-1/2">
//               <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Overview</h2>
//               <p className="text-gray-600 mb-4">
//                 Budgetly approached our design team to reimagine their personal finance app
//                 for the millennial market. Their existing solution was functional but lacked
//                 engagement, with high drop-off rates after initial signup.
//               </p>
//               <p className="text-gray-600">
//                 Our challenge was to transform the experience into something that resonated
//                 with younger users while maintaining the robust financial tools that made
//                 Budgetly valuable in the first place.
//               </p>
//             </div>
//             <div className="md:w-1/2 rounded-lg overflow-hidden shadow-xl">
//               <Image
//                 src="/api/placeholder/600/400"
//                 alt="Before and after screenshots of the Budgetly app"
//                 width={600}
//                 height={400}
//                 className="w-full h-auto"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Process section */}
//         <section className="bg-white py-16">
//           <div className="container mx-auto px-6 max-w-4xl">
//             <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Design Process</h2>
            
//             <div className="space-y-20">
//               {/* Research phase */}
//               <div className="flex flex-col md:flex-row gap-12 items-center">
//                 <div className="md:w-1/2 order-2 md:order-1">
//                   <h3 className="text-2xl font-semibold text-gray-800 mb-4">User Research</h3>
//                   <p className="text-gray-600 mb-4">
//                     We conducted interviews with 20 millennials across different income brackets
//                     to understand their relationship with money, financial goals, and pain points
//                     with existing financial tools.
//                   </p>
//                   <p className="text-gray-600 mb-6">
//                     Our research uncovered that millennials wanted their financial app to be:
//                   </p>
//                   <ul className="list-disc pl-6 text-gray-600 space-y-2">
//                     <li>Visual and intuitive rather than spreadsheet-like</li>
//                     <li>Focused on goals rather than just tracking expenses</li>
//                     <li>Educational without being condescending</li>
//                     <li>Transparent about fees and privacy</li>
//                   </ul>
//                 </div>
//                 <div className="md:w-1/2 order-1 md:order-2">
//                   <Image
//                     src="/api/placeholder/600/400"
//                     alt="Collage of user interview sessions"
//                     width={600}
//                     height={400}
//                     className="rounded-lg shadow-md w-full h-auto"
//                   />
//                 </div>
//               </div>

//               {/* Quote section */}
//               <div className="bg-blue-50 rounded-xl p-8 md:p-12">
//                 <p className="text-xl md:text-2xl text-blue-900 italic font-light leading-relaxed">
//                   I dont just want to see where my money went. I want to understand what
//                   it means for my future and get guidance on what to do differently.
//                 </p>
//                 <p className="mt-4 text-blue-800 font-medium">— Sarah, 28, Marketing Manager</p>
//               </div>

//               {/* Ideation phase */}
//               <div className="flex flex-col md:flex-row gap-12 items-center">
//                 <div className="md:w-1/2">
//                   <Image
//                     src="/api/placeholder/600/400"
//                     alt="Design team collaborating on wireframes"
//                     width={600}
//                     height={400}
//                     className="rounded-lg shadow-md w-full h-auto"
//                   />
//                 </div>
//                 <div className="md:w-1/2">
//                   <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ideation & Wireframing</h3>
//                   <p className="text-gray-600 mb-4">
//                     Based on our research insights, we conducted multiple design thinking workshops
//                     to generate ideas. We focused on creating a visual language that would make financial
//                     data approachable and actionable.
//                   </p>
//                   <p className="text-gray-600">
//                     Our wireframes evolved through three iterations, each time incorporating feedback
//                     from potential users. We prioritized features that supported goal visualization,
//                     simplified cash flow understanding, and personalized financial education.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Solution section */}
//         <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-800 text-white">
//           <div className="container mx-auto px-6 max-w-4xl">
//             <h2 className="text-3xl font-bold mb-12 text-center">Our Solution</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
//               <div className="p-6 bg-white bg-opacity-10 rounded-lg backdrop-filter backdrop-blur">
//                 <h3 className="text-xl font-semibold mb-4">Goal-Centric Dashboard</h3>
//                 <p className="text-blue-100">
//                   We redesigned the dashboard to prominently feature financial goals, with visual progress
//                   indicators that create a sense of accomplishment as users move toward their targets.
//                 </p>
//               </div>
              
//               <div className="p-6 bg-white bg-opacity-10 rounded-lg backdrop-filter backdrop-blur">
//                 <h3 className="text-xl font-semibold mb-4">Simplified Financial Insights</h3>
//                 <p className="text-blue-100">
//                   Complex financial concepts are broken down with interactive visualizations and bite-sized
//                   explanations, making money management more approachable.
//                 </p>
//               </div>
              
//               <div className="p-6 bg-white bg-opacity-10 rounded-lg backdrop-filter backdrop-blur">
//                 <h3 className="text-xl font-semibold mb-4">Educational Journey</h3>
//                 <p className="text-blue-100">
//                   Personalized financial tips and lessons are integrated throughout the experience,
//                   delivered in moments when theyre most relevant to the user.
//                 </p>
//               </div>
              
//               <div className="p-6 bg-white bg-opacity-10 rounded-lg backdrop-filter backdrop-blur">
//                 <h3 className="text-xl font-semibold mb-4">Social Features</h3>
//                 <p className="text-blue-100">
//                   Optional community features allow users to share goals (anonymously if preferred)
//                   and celebrate financial wins with friends, creating accountability.
//                 </p>
//               </div>
//             </div>
            
//             <div className="mt-12 text-center">
//               <Image
//                 src="/api/placeholder/1200/600"
//                 alt="Final design of the Budgetly app on multiple devices"
//                 width={1200}
//                 height={600}
//                 className="rounded-lg shadow-2xl w-full h-auto"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Results section */}
//         <section className="container mx-auto px-6 py-16 max-w-4xl">
//           <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Impact & Results</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//             <div className="bg-blue-50 p-6 rounded-lg text-center">
//               <p className="text-4xl font-bold text-blue-600 mb-2">73%</p>
//               <p className="text-gray-700">Increase in daily active users</p>
//             </div>
            
//             <div className="bg-blue-50 p-6 rounded-lg text-center">
//               <p className="text-4xl font-bold text-blue-600 mb-2">42%</p>
//               <p className="text-gray-700">Reduction in user drop-off</p>
//             </div>
            
//             <div className="bg-blue-50 p-6 rounded-lg text-center">
//               <p className="text-4xl font-bold text-blue-600 mb-2">87%</p>
//               <p className="text-gray-700">User satisfaction score</p>
//             </div>
//           </div>
          
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">Key Learnings</h3>
//             <p className="text-gray-600 mb-4">
//               This project reinforced that financial tools need to speak the emotional language
//               of their users, not just the numerical one. For millennials specifically, we found:
//             </p>
//             <ul className="list-disc pl-6 text-gray-600 space-y-3">
//               <li>Visual representation of abstract financial concepts dramatically improves engagement</li>
//               <li>Goal orientation creates stronger motivation than pure expense tracking</li>
//               <li>Educational content works best when contextually relevant and bite-sized</li>
//               <li>Community features create accountability that drives behavioral change</li>
//             </ul>
//           </div>
//         </section>

//         {/* Testimonial section */}
//         <section className="bg-blue-900 py-16 text-white">
//           <div className="container mx-auto px-6 max-w-4xl text-center">
//             <svg className="w-12 h-12 mx-auto mb-6 text-blue-300" fill="currentColor" viewBox="0 0 32 32">
//               <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
//             </svg>
//             <blockquote className="text-2xl md:text-3xl font-light italic leading-relaxed mb-8 max-w-3xl mx-auto">
//               The redesigned Budgetly has transformed how our users interact with their finances.
//               What was once seen as a tedious necessity is now experienced as an empowering journey.
//               The metrics speak for themselves, but the real win is in the stories we hear from users
//               about finally feeling in control of their financial future
//             </blockquote>
//             <div className="flex items-center justify-center">
//               <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
//                 <Image
//                   src="/api/placeholder/64/64"
//                   alt="Alex Chen, CEO of Budgetly"
//                   width={64}
//                   height={64}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="text-left">
//                 <p className="font-semibold">Alex Chen</p>
//                 <p className="text-blue-300">CEO, Budgetly</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA section */}
//         <section className="container mx-auto px-6 py-16 text-center max-w-2xl">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to elevate your digital product?</h2>
//           <p className="text-xl text-gray-600 mb-8">
//             We combine research, design thinking, and user-centered methodologies to create
//             experiences that resonate with your audience and drive business results.
//           </p>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
//             Get in Touch
//           </button>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-gray-400 py-12">
//           <div className="container mx-auto px-6 max-w-4xl">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="mb-6 md:mb-0">
//                 <p className="font-semibold text-gray-300 text-lg mb-2">Design Studio</p>
//                 <p>Creating meaningful digital experiences since 2015</p>
//               </div>
//               <div className="flex space-x-6">
//                 <a href="#" className="hover:text-white transition duration-300">
//                   <span className="sr-only">Twitter</span>
//                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                   </svg>
//                 </a>
//                 <a href="#" className="hover:text-white transition duration-300">
//                   <span className="sr-only">LinkedIn</span>
//                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                   </svg>
//                 </a>
//                 <a href="#" className="hover:text-white transition duration-300">
//                   <span className="sr-only">Instagram</span>
//                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//             <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
//               <p>&copy; 2025 Design Studio. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>
//       </main>
//     </>
//   );
// }