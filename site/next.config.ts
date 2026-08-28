import type { NextConfig } from "next";
import { siteBasePath } from "./src/lib/base-path";

function getEditorApiUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_TRAVEL_LOG_EDITOR_API_URL?.trim() ||
    process.env.TRAVEL_LOG_AUTH_API_URL?.trim();
  if (!configuredUrl) return "";
  try {
    const url = new URL(configuredUrl);
    url.pathname = url.pathname.replace(/\/unlock\/?$/u, "/editor");
    url.search = "";
    url.hash = "";
    return url.href.replace(/\/$/u, "");
  } catch {
    return "";
  }
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: siteBasePath,
  env: {
    NEXT_PUBLIC_TRAVEL_LOG_EDITOR_API_URL: getEditorApiUrl(),
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
