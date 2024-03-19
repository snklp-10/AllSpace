/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wigtenerkoygvencslon.supabase.co",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
