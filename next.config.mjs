/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "images.pexels.com" },
      { hostname: "th.bing.com" },
      { hostname: "bing.com" },
      { hostname: "chat.google.com" },
      { hostname: "chat.com" },
      { hostname: "google.com" },
      { hostname: "*.google.com" },
      { hostname: "raw.githubusercontent.com" },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
