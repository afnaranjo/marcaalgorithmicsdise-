import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

export const W = 1280;
export const H = 720;
export const FONT = "Arial";
export const CAMERA_SAFE = Object.freeze({ x: 998, y: 556, w: 238, h: 134 });

export const C = Object.freeze({
  navy: "#091127",
  navy2: "#18233D",
  ink: "#17223B",
  muted: "#65738C",
  blue: "#2F7ED8",
  lavender: "#7E70C9",
  cyan: "#35B4C2",
  coral: "#F18779",
  green: "#48A585",
  paleBlue: "#E5EFFB",
  paleLavender: "#EEEAFB",
  paleCyan: "#E5F6F8",
  paleCoral: "#FDEBE8",
  paleGreen: "#E8F5F0",
  ice: "#F7F9FD",
  white: "#FFFFFF",
  line: "#DCE4F1",
});

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const SKILL_ROOT = path.resolve(SCRIPT_DIR, "..");

export async function loadBytes(filePath) {
  return new Uint8Array(await fs.readFile(filePath));
}

export async function loadBrandAssets() {
  const brand = path.join(SKILL_ROOT, "assets", "brand");
  return {
    background: await loadBytes(path.join(brand, "background-branded.png")),
    logoDark: await loadBytes(path.join(brand, "nid-dark.png")),
    logoWhite: await loadBytes(path.join(brand, "nid-white.png")),
  };
}

export function createDeck() {
  return Presentation.create({ slideSize: { width: W, height: H } });
}

export function addText(
  slide,
  {
    name,
    x,
    y,
    w,
    h,
    text,
    size,
    color = C.ink,
    bold = false,
    italic = false,
    align = "left",
    valign = "top",
    wrap = "square",
  },
) {
  if (size < 11) throw new Error(`Tipografía demasiado pequeña en ${name}: ${size}`);
  const shape = slide.shapes.add({
    geometry: "textbox",
    name,
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    typeface: FONT,
    fontSize: size,
    color,
    bold,
    italic,
    alignment: align,
    verticalAlignment: valign,
    autoFit: "shrinkText",
    wrap,
    insets: { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return shape;
}

export function addRect(
  slide,
  { name, x, y, w, h, fill, radius = "rounded-xl", line = "none" },
) {
  return slide.shapes.add({
    geometry: radius ? "roundRect" : "rect",
    name,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: "solid", fill: line, width: line === "none" ? 0 : 1 },
    ...(radius ? { borderRadius: radius } : {}),
  });
}

export function addRule(slide, { name, x, y, w, h = 1, fill = C.line }) {
  return addRect(slide, { name, x, y, w, h, fill, radius: null });
}

export function addImage(
  slide,
  { name, blob, x, y, w, h, alt, fit = "cover", contentType = "image/png" },
) {
  return slide.images.add({
    name,
    blob: new Uint8Array(blob),
    contentType,
    alt,
    fit,
    position: { left: x, top: y, width: w, height: h },
  });
}

export function addBase(slide, backgroundBlob, { canvas = true, fill = C.ice } = {}) {
  addImage(slide, {
    name: "brand-background",
    blob: backgroundBlob,
    x: 0,
    y: 0,
    w: W,
    h: H,
    alt: "Fondo pastel oficial NID",
  });
  if (canvas) {
    addRect(slide, {
      name: "editorial-canvas",
      x: 24,
      y: 24,
      w: 1232,
      h: 672,
      fill,
      radius: "rounded-2xl",
    });
  }
}

export function addLogo(
  slide,
  logoBlob,
  { name = "nid-logo", x = 1156, y = 44, w = 76, h = 34 } = {},
) {
  return addImage(slide, {
    name,
    blob: logoBlob,
    x,
    y,
    w,
    h,
    alt: "Logotipo oficial NID",
    fit: "contain",
  });
}

export function addPage(slide, page, total, { color = C.muted, x = 72 } = {}) {
  return addText(slide, {
    name: `page-${page}`,
    x,
    y: 662,
    w: 110,
    h: 18,
    text: `${String(page).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    size: 12,
    color,
    bold: true,
    wrap: "none",
  });
}

export function addHeader(
  slide,
  {
    page,
    total,
    subject,
    unit,
    phase,
    logoBlob,
    dark = false,
  },
) {
  const color = dark ? "#B9C4DD" : C.muted;
  addText(slide, {
    name: `header-${page}`,
    x: 72,
    y: 48,
    w: 880,
    h: 20,
    text: `${subject.toUpperCase()}   ·   ${unit.toUpperCase()}   ·   ${phase.toUpperCase()}`,
    size: 13,
    color,
    bold: true,
    wrap: "none",
  });
  addLogo(slide, logoBlob, { name: `logo-${page}` });
  addPage(slide, page, total, { color });
}

export function setNotes(
  slide,
  {
    purpose,
    talk = [],
    teacherKey = [],
    sourceLines = [],
    brandSource = "Activos oficiales incluidos en el paquete NID.",
  },
) {
  const lines = [
    `Propósito docente: ${purpose}`,
    ...talk,
    ...teacherKey,
    "[Sources]",
    `- Identidad visual y logotipo: ${brandSource}`,
    ...sourceLines.map((line) => `- ${line}`),
    "- Ejemplos, secuencia y ejercicios: elaboración didáctica propia.",
    "[/Sources]",
  ];
  slide.speakerNotes.textFrame.setText(lines);
  slide.speakerNotes.setVisible(true);
}

export async function exportDeck(
  deck,
  { outputPptx, renderDir, montagePath, inspectPath = `${outputPptx}.inspect.ndjson` },
) {
  await fs.mkdir(path.dirname(outputPptx), { recursive: true });
  await fs.mkdir(renderDir, { recursive: true });

  const inspect = await deck.inspect({
    kind: "slide,textbox,shape,image,notes",
    maxChars: 500000,
  });
  await fs.writeFile(inspectPath, inspect.ndjson);

  for (const [index, slide] of deck.slides.items.entries()) {
    const png = await deck.export({ slide, format: "png", scale: 1 });
    const number = String(index + 1).padStart(2, "0");
    await fs.writeFile(
      path.join(renderDir, `slide-${number}.png`),
      new Uint8Array(await png.arrayBuffer()),
    );
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(
      path.join(renderDir, `slide-${number}.layout.json`),
      await layout.text(),
    );
  }

  const montage = await deck.export({ format: "png", montage: true, scale: 1 });
  await fs.writeFile(montagePath, new Uint8Array(await montage.arrayBuffer()));

  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save(outputPptx);

  return {
    slides: deck.slides.items.length,
    outputPptx,
    renderDir,
    montagePath,
    inspectPath,
    cameraSafe: CAMERA_SAFE,
  };
}
