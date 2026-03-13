import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const canonicalLogin = path.join(root, "app", "login", "page.tsx");
const legacyAuthGroup = path.join(root, "app", "(auth)");
const legacyLogin = path.join(legacyAuthGroup, "login", "page.tsx");
const nextCacheDir = path.join(root, ".next");

if (fs.existsSync(canonicalLogin) && fs.existsSync(legacyLogin)) {
  fs.rmSync(legacyAuthGroup, { recursive: true, force: true });
  console.log("[prepare-dev] Removed legacy route group: app/(auth)");
}

if (fs.existsSync(nextCacheDir)) {
  fs.rmSync(nextCacheDir, { recursive: true, force: true });
  console.log("[prepare-dev] Cleared stale .next cache");
}
