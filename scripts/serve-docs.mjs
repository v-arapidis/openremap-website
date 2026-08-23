// Local preview helper: serves the openremap-core working tree at
// http://localhost:8900/main/... and runs `next dev` pointed at it.
// Usage: npm run dev:local
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";

const REPO =
  process.env.OPENREMAP_REPO ??
  "/home/pinx/Dev/OpenRemap/openremap-core";
const PORT = 8900;

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  const rel = path.startsWith("/main/") ? path.slice("/main/".length) : path.slice(1);
  const file = join(REPO, rel);
  try {
    const data = await readFile(file);
    res.writeHead(200, { "content-type": "text/markdown; charset=utf-8" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
}).listen(PORT, () => {
  console.log(`[serve-docs] ${REPO} → http://localhost:${PORT}/main`);
});

const child = spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  env: {
    ...process.env,
    OPENREMAP_RAW_BASE: `http://localhost:${PORT}/main`,
  },
});
child.on("exit", (code) => process.exit(code ?? 0));
