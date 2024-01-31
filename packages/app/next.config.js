/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable filenames/match-exported */
/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // Linting already happens before deployment, so we don't need to lint
    // during the build
    ignoreDuringBuilds: true,
  },
  // Exposing the framework used can make it easier for attackers to
  // discover vulnerabilities, so we hide the `x-powered-by` header
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
