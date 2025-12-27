/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
