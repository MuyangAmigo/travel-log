import type { NextConfig } from "next";
import { siteBasePath } from "./src/lib/base-path";

const nextConfig: NextConfig = {
  output: "export",
  basePath: siteBasePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
