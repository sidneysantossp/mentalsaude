import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");

describe("Vercel runtime configuration", () => {
  it("publishes the Vite public build and preserves the API namespace", () => {
    const config = JSON.parse(fs.readFileSync(path.join(projectRoot, "vercel.json"), "utf8")) as {
      outputDirectory?: string;
      rewrites?: Array<{ source: string; destination: string }>;
    };

    expect(config.outputDirectory).toBe("dist/public");
    expect(config.rewrites).toContainEqual({
      source: "/api/:path*",
      destination: "/api/[...path]",
    });
    expect(config.rewrites).toContainEqual({
      source: "/sitemap.xml",
      destination: "/api/seo?type=sitemap",
    });
    expect(config.rewrites).toContainEqual({
      source: "/feed.xml",
      destination: "/api/seo?type=feed",
    });
    const spaRewrite = config.rewrites?.find(rewrite => rewrite.destination === "/index.html");
    expect(spaRewrite?.source).toContain("manus-storage");
    expect(spaRewrite?.source).toContain("robots\\.txt");
  });

  it("provides a JavaScript catch-all Function for the Express API runtime", () => {
    const handlerPath = path.join(projectRoot, "api", "[...path].js");
    const handler = fs.readFileSync(handlerPath, "utf8");
    const packageConfig = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")) as {
      scripts?: { build?: string };
    };

    expect(handler).toContain('import { createApp } from "./app.js"');
    expect(handler).toContain("export default createApp()");
    expect(packageConfig.scripts?.build).toContain("esbuild server/_core/app.ts");
    expect(packageConfig.scripts?.build).toContain("--outfile=api/app.js");
  });
});
