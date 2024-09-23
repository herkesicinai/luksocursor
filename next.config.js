/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /** Allow images from all domains
     *  @next/image
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Wildcard for all hostnames
        pathname: "**", // Wildcard for all paths
      },
    ],
    loader: "custom",
    loaderFile: "./lib/imageLoader.js",
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
