import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // This folder is the project root. Without it, Turbopack walks up the file
  // tree, finds an unrelated package-lock.json and warns about it.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
