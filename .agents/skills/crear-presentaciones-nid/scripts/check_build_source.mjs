import fs from "node:fs/promises";

const sourcePath = process.argv[2];
if (!sourcePath) {
  console.error("Uso: node scripts/check_build_source.mjs ruta/al/generador.mjs");
  process.exit(2);
}

const source = await fs.readFile(sourcePath, "utf8");
const errors = [];

if (!/from\s+["'][^"']*locked_design_system\.mjs["']/.test(source)) {
  errors.push("El generador no importa locked_design_system.mjs.");
}

const forbidden = [
  [/\bconst\s+FONT\s*=/, "No redefinas FONT."],
  [/\bconst\s+C\s*=/, "No redefinas la paleta C."],
  [/\bconst\s+CAMERA_SAFE\s*=/, "No redefinas CAMERA_SAFE."],
  [/\bconst\s+W\s*=\s*\d+/, "No redefinas el ancho W."],
  [/\bconst\s+H\s*=\s*\d+/, "No redefinas el alto H."],
  [/#(?:[0-9A-Fa-f]{6})\b/, "No escribas colores hexadecimales en el generador; usa tokens C."],
  [/typeface\s*:/, "No definas tipografías en el generador; usa addText bloqueado."],
];

for (const [pattern, message] of forbidden) {
  if (pattern.test(source)) errors.push(message);
}

if (!/setNotes\s*\(/.test(source)) {
  errors.push("Falta setNotes: cada diapositiva debe incluir notas y fuentes.");
}

if (!/exportDeck\s*\(/.test(source)) {
  errors.push("Falta exportDeck: se requieren PPTX, renders, montaje e inspección.");
}

if (errors.length) {
  console.error("RECHAZADO: el generador intenta salir del sistema visual bloqueado.");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("APROBADO: el generador respeta el sistema visual bloqueado.");
