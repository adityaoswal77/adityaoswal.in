'use client';

// pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Aditya Oswal</title>
        <meta name="description" content="Aditya Oswal's personal page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col">
        {/* Top navigation */}
        <nav className="w-full py-6 px-8">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex space-x-24">
              <div>1. Bio</div>
              <div>2. Projects</div>
            </div>
            <div className="flex-grow text-center">3. CV</div>
            <div className="flex space-x-24">
              <div>4. Contact</div>
              <div>5. Social</div>
            </div>
          </div>
        </nav>

        {/* Main content - centered text */}
        <div className="flex-grow flex items-end justify-center pb-16">
          <h1 className="text-8xl font-bold tracking-tight text-gray-900">
            ADITYA OSWAL
          </h1>
        </div>
      </main>
    </div>
  );
}

// import Link from 'next/link';
// import Image from 'next/image';

// const caseStudies = [
//   {
//     id: 'project-name',
//     title: 'Kardia Guest Recording flow',
//     description: 'Kardia Guest Recording flow.',
//     image: '/images/hero-image.jpg',
//     tags: ['UX Design', 'Product Design', 'Web Development'],
//     year: '2023'
//   },
//   {
//     id: 'project-2',
//     title: 'Project 2',
//     description: 'Another project description showcasing different work.',
//     image: '/images/hero-image.jpg',
//     tags: ['UI Design', 'Mobile App', 'User Research'],
//     year: '2022'
//   },
//   {
//     id: 'project-3',
//     title: 'Project 3',
//     description: 'A third project highlighting diverse skills and experience.',
//     image: '/images/hero-image.jpg',
//     tags: ['Branding', 'Visual Design', 'Strategy'],
//     year: '2021'
//   }
// ];

// export default function Work() {
//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <div className="max-w-7xl mx-auto px-6 py-24">
//         <h1 className="text-4xl font-bold mb-12">Selected Work</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
//           {caseStudies.map((project) => (
//             <Link 
//               href={`/work/${project.id}`} 
//               key={project.id}
//               className="group"
//             >
//               <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
//                 <Image
//                   src={project.image}
//                   alt={project.title}
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-start">
//                   <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
//                     {project.title}
//                   </h2>
//                   <span className="text-sm text-gray-500">{project.year}</span>
//                 </div>
//                 <p className="text-gray-600">{project.description}</p>
//                 <div className="flex flex-wrap gap-2">
//                   {project.tags.map((tag) => (
//                     <span 
//                       key={tag}
//                       className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
