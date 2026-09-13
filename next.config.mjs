/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qjqaclyoxxmvzjzaserg.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

};

export default nextConfig;
