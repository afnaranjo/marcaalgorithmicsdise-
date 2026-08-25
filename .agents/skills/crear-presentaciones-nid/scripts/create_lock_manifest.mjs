import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const protectedFiles = [
  "SKILL.md",
  "AGENTS.md",
  "agents/openai.yaml",
  "package.json",
  "references/FORMATO_INMUTABLE.md",
  "references/PATRONES_POR_MATERIA.md",
  "references/FLUJO_Y_CONTROL_DE_CALIDAD.md",
  "references/MASTER_PROMPT_GLOBAL.txt",
  "scripts/locked_design_system.mjs",
  "scripts/check_camera_safe.mjs",
  "scripts/check_build_source.mjs",
  "scripts/verify_locked_system.mjs",
  "assets/brand-lock.json",
  "assets/brand/background-branded.png",
  "assets/brand/nid-dark.png",
  "assets/brand/nid-white.png",
  "assets/brand/nid-mask.png",
  "assets/template.pptx",
  "assets/examples/Matematicas_NID_Aprobado.pptx",
  "assets/examples/Biologia_NID_Aprobado.pptx",
  "assets/examples/Literatura_NID_Aprobado.pptx"
];

const files = [];
for (const relativePath of protectedFiles) {
  const bytes = await fs.readFile(path.join(root, relativePath));
  files.push({
    path: relativePath,
    sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
  });
}

const output = {
  algorithm: "sha256",
  policy: "Any mismatch rejects the package.",
  files,
};
await fs.writeFile(
  path.join(root, "assets", "locked-manifest.json"),
  `${JSON.stringify(output, null, 2)}\n`,
);
console.log(`Manifest created for ${files.length} protected files.`);
