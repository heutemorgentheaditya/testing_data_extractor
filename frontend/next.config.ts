/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/dashboard',
        has: [
          {
            type: 'cookie',
            key: 'token',
            missing: true,
          },
        ],
        permanent: false,
        destination: '/',
      },
    ];
  },
}

module.exports = nextConfig