import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const lock = JSON.parse(
  await fs.readFile(path.join(root, "assets", "brand-lock.json"), "utf8"),
);
const errors = [];

const expected = {
  slide: { width: 1280, height: 720, ratio: "16:9" },
  font: { family: "Arial", coverMin: 58, titleMin: 35, bodyMin: 16 },
  cameraSafe: { x: 998, y: 556, w: 238, h: 134 },
  canvas: { x: 24, y: 24, w: 1232, h: 672 },
  logo: { x: 1156, y: 44, w: 76, h: 34 },
};

for (const [key, value] of Object.entries(expected)) {
  if (JSON.stringify(lock[key]) !== JSON.stringify(value)) {
    errors.push(`Bloque ${key} modificado.`);
  }
}

const manifestPath = path.join(root, "assets", "locked-manifest.json");
try {
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  for (const item of manifest.files) {
    const bytes = await fs.readFile(path.join(root, item.path));
    const hash = crypto.createHash("sha256").update(bytes).digest("hex");
    if (hash !== item.sha256) errors.push(`Archivo protegido modificado: ${item.path}`);
  }
} catch (error) {
  errors.push(`No se pudo validar locked-manifest.json: ${error.message}`);
}

if (errors.length) {
  console.error("RECHAZADO: el sistema visual protegido fue alterado.");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("APROBADO: sistema visual y archivos protegidos intactos.");
