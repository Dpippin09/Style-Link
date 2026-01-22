import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Add turbopack config to suppress warning
  turbopack: {},
};

export default nextConfig;
