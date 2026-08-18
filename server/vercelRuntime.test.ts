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
      source: "/:path((?!api(?:/|$)).*)",
      destination: "/index.html",
    });
  });

  it("provides a JavaScript catch-all Function for the Express API runtime", () => {
    const handlerPath = path.join(projectRoot, "api", "[...path].js");
    const handler = fs.readFileSync(handlerPath, "utf8");

    expect(handler).toContain('import { createApp } from "../server/_core/app"');
    expect(handler).toContain("export default createApp()");
  });
});
