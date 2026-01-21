/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "fakestoreapi.com",
      },
      {
        hostname: "cdn.dummyjson.com",
      },
      {
        hostname: "rukminim2.flixcart.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "www.apple.com",
      },
      {
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
