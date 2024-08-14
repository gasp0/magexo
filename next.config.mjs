/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jnz3dtiuj77ca.dummycachetest.com',
        port: '',
        pathname: '/media/catalog/product/**',
      },
    ],
  },
};

export default nextConfig;
