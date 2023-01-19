/** @type {import('next').NextConfig} */

// module.exports = {
//   reactStrictMode: true,
//   env: {
//     NEXT_PUBLIC_CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
//     CLERK_API_KEY: process.env.CLERK_API_KEY,
//     NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT: process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT,
//     NEXT_PUBLIC_HASURA_REST_API: process.env.NEXT_PUBLIC_HASURA_REST_API,
//     HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
//     NEXT_PUBLIC_HOSTNAME: process.env.NEXT_PUBLIC_HOSTNAME, 
//     GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
//     IP_API_URL: process.env.IP_API_URL,
//     NEXT_PUBLIC_GOOGLEADS_CLIENT: process.env.NEXT_PUBLIC_GOOGLEADS_CLIENT,
//   },
// }

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  env: {
    NEXT_PUBLIC_CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
    CLERK_API_KEY: process.env.CLERK_API_KEY,
    NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT: process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT,
    NEXT_PUBLIC_HASURA_REST_API: process.env.NEXT_PUBLIC_HASURA_REST_API,
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
    NEXT_PUBLIC_HOSTNAME: process.env.NEXT_PUBLIC_HOSTNAME, 
    GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    IP_API_URL: process.env.IP_API_URL,
    NEXT_PUBLIC_GOOGLEADS_CLIENT: process.env.NEXT_PUBLIC_GOOGLEADS_CLIENT,
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true
});

module.exports = withPWA(nextConfig);
