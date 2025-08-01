/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
