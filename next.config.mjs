import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
};

export default withPWA(pwaConfig)(nextConfig);
