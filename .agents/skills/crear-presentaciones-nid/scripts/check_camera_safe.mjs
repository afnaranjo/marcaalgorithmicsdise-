import fs from "node:fs/promises";

const inspectPath = process.argv[2];
if (!inspectPath) {
  console.error("Uso: node scripts/check_camera_safe.mjs salida.pptx.inspect.ndjson");
  process.exit(2);
}

const safe = { x: 998, y: 556, w: 238, h: 134 };
const allowedNames = new Set(["editorial-canvas", "brand-background"]);
const records = (await fs.readFile(inspectPath, "utf8"))
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));

const conflicts = records.filter((record) => {
  if (!record.bbox || !record.slide) return false;
  if (allowedNames.has(record.name)) return false;
  if (record.name?.startsWith("practice-dark-canvas-")) return false;
  const [x, y, w, h] = record.bbox;
  if (x === 0 && y === 0 && w === 1280 && h === 720) return false;
  return (
    x < safe.x + safe.w &&
    x + w > safe.x &&
    y < safe.y + safe.h &&
    y + h > safe.y
  );
});

if (conflicts.length) {
  console.error("RECHAZADO: hay objetos dentro de la zona de cámara.");
  console.error(JSON.stringify(conflicts, null, 2));
  process.exit(1);
}

console.log("APROBADO: camera-safe-zone=clear");
