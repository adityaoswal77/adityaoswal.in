/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const sources = [
      { path: "/linkedin",  source: "linkedin",  medium: "social"   },
      { path: "/twitter",   source: "twitter",   medium: "social"   },
      { path: "/instagram", source: "instagram", medium: "social"   },
      { path: "/github",    source: "github",    medium: "profile"  },
      { path: "/luma",      source: "luma",      medium: "event"    },
      { path: "/resume",    source: "resume",    medium: "document" },
    ];

    return sources.flatMap(({ path, source, medium }) => [
      {
        source: path,
        destination: `/?utm_source=${source}&utm_medium=${medium}`,
        permanent: false,
      },
      {
        source: `${path}/`,
        destination: `/?utm_source=${source}&utm_medium=${medium}`,
        permanent: false,
      },
    ]);
  },
};

module.exports = nextConfig;
