const nextConfig: import('next').NextConfig = {
  distDir: './dist',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
