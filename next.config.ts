import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['via.placeholder.com'],
  },
};
module.exports = {
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@next/next/no-img-element": "off", 
  },
};


export default nextConfig;
