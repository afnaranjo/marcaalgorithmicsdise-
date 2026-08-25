import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  C,
  addBase,
  addHeader,
  addImage,
  addLogo,
  addRect,
  addText,
  createDeck,
  exportDeck,
  loadBrandAssets,
  loadBytes,
  setNotes,
} from "../locked_design_system.mjs";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(currentDir, "output");
const assetsDir = path.join(currentDir, "lesson-assets");
const total = 6;
const deck = createDeck();
const brand = await loadBrandAssets();

// Sustituye únicamente estos textos y las imágenes de lesson-assets.
const lesson = {
  subject: "Materia",
  unit: "Tema de la clase",
  title: "Título que expresa el aprendizaje",
  subtitle: "Una promesa breve y concreta para el estudiante.",
  source: "Añade aquí la fuente académica verificada.",
};

// 01 — Portada
{
  const slide = deck.slides.add();
  addBase(slide, brand.background, { canvas: false });
  addRect(slide, {
    name: "cover-panel",
    x: 0,
    y: 0,
    w: 690,
    h: 720,
    fill: C.navy,
    radius: null,
  });
  addLogo(slide, brand.logoWhite, { x: 72, y: 54, w: 76, h: 34 });
  addText(slide, {
    name: "cover-subject",
    x: 72,
    y: 110,
    w: 520,
    h: 24,
    text: lesson.subject.toUpperCase(),
    size: 14,
    color: C.cyan,
    bold: true,
    wrap: "none",
  });
  addText(slide, {
    name: "cover-title",
    x: 72,
    y: 176,
    w: 530,
    h: 190,
    text: lesson.title,
    size: 62,
    color: C.white,
    bold: true,
  });
  addText(slide, {
    name: "cover-subtitle",
    x: 72,
    y: 398,
    w: 520,
    h: 80,
    text: lesson.subtitle,
    size: 22,
    color: C.paleBlue,
  });
  setNotes(slide, {
    purpose: "Presentar la promesa de aprendizaje.",
    sourceLines: [lesson.source],
  });
}

// 02 — Pregunta de entrada
{
  const slide = deck.slides.add();
  addBase(slide, brand.background);
  addHeader(slide, {
    page: 2,
    total,
    subject: lesson.subject,
    unit: lesson.unit,
    phase: "Activación",
    logoBlob: brand.logoDark,
  });
  addText(slide, {
    name: "hook-title",
    x: 72,
    y: 112,
    w: 1020,
    h: 58,
    text: "Formula aquí una pregunta que active conocimientos previos.",
    size: 44,
    color: C.navy,
    bold: true,
  });
  addRect(slide, {
    name: "hook-space",
    x: 72,
    y: 226,
    w: 890,
    h: 300,
    fill: C.paleBlue,
    radius: "rounded-xl",
  });
  addText(slide, {
    name: "hook-instruction",
    x: 108,
    y: 338,
    w: 818,
    h: 64,
    text: "Coloca un problema, visual o caso breve.\nNo uses este espacio como decoración.",
    size: 25,
    color: C.navy,
    bold: true,
    align: "center",
  });
  setNotes(slide, {
    purpose: "Activar conocimiento previo sin explicar aún la respuesta.",
    sourceLines: [lesson.source],
  });
}

// 03 — Explicación
{
  const slide = deck.slides.add();
  addBase(slide, brand.background);
  addHeader(slide, {
    page: 3,
    total,
    subject: lesson.subject,
    unit: lesson.unit,
    phase: "Explicación",
    logoBlob: brand.logoDark,
  });
  addText(slide, {
    name: "explain-title",
    x: 72,
    y: 104,
    w: 1020,
    h: 62,
    text: "Escribe una conclusión clara como título.",
    size: 44,
    color: C.navy,
    bold: true,
  });
  addText(slide, {
    name: "explain-body",
    x: 72,
    y: 210,
    w: 500,
    h: 286,
    text: "Explica la idea central con frases breves.\n\n• Primera evidencia\n• Segunda evidencia\n• Regla o consecuencia",
    size: 24,
    color: C.ink,
  });
  addRect(slide, {
    name: "explain-visual",
    x: 628,
    y: 202,
    w: 556,
    h: 326,
    fill: C.paleLavender,
    radius: "rounded-xl",
  });
  addText(slide, {
    name: "explain-visual-label",
    x: 670,
    y: 336,
    w: 472,
    h: 54,
    text: "Imagen, diagrama, fórmula o ejemplo",
    size: 23,
    color: C.lavender,
    bold: true,
    align: "center",
  });
  setNotes(slide, {
    purpose: "Explicar una sola idea mediante texto y evidencia.",
    sourceLines: [lesson.source],
  });
}

// 04 — Práctica guiada
{
  const slide = deck.slides.add();
  addBase(slide, brand.background);
  addHeader(slide, {
    page: 4,
    total,
    subject: lesson.subject,
    unit: lesson.unit,
    phase: "Práctica guiada",
    logoBlob: brand.logoDark,
  });
  addText(slide, {
    name: "guided-title",
    x: 72,
    y: 104,
    w: 1000,
    h: 58,
    text: "Resuelve primero; después comprueba.",
    size: 44,
    color: C.navy,
    bold: true,
  });
  for (const [index, x, y, accent] of [
    [1, 72, 194, C.blue],
    [2, 640, 194, C.lavender],
    [3, 72, 392, C.cyan],
    [4, 640, 392, C.coral],
  ]) {
    const h = y === 392 ? 160 : 172;
    addRect(slide, {
      name: `guided-card-${index}`,
      x,
      y,
      w: 544,
      h,
      fill: C.white,
      line: C.line,
      radius: "rounded-xl",
    });
    addText(slide, {
      name: `guided-number-${index}`,
      x: x + 18,
      y: y + 18,
      w: 40,
      h: 24,
      text: String(index).padStart(2, "0"),
      size: 16,
      color: accent,
      bold: true,
    });
    addText(slide, {
      name: `guided-question-${index}`,
      x: x + 66,
      y: y + 18,
      w: 430,
      h: 96,
      text: "Sustituye esta consigna por un ejercicio.",
      size: 20,
      color: C.navy,
      bold: true,
    });
  }
  setNotes(slide, {
    purpose: "Aplicar el método con retroalimentación inmediata.",
    teacherKey: ["Clave docente: sustituye esta línea por las cuatro respuestas."],
    sourceLines: [lesson.source],
  });
}

// 05 — Ruptura
{
  const slide = deck.slides.add();
  addRect(slide, {
    name: "disruptive-background",
    x: 0,
    y: 0,
    w: 1280,
    h: 720,
    fill: C.navy,
    radius: null,
  });
  addLogo(slide, brand.logoWhite);
  addText(slide, {
    name: "disruptive-label",
    x: 80,
    y: 86,
    w: 500,
    h: 24,
    text: "PAUSA PARA PENSAR",
    size: 14,
    color: C.cyan,
    bold: true,
  });
  addText(slide, {
    name: "disruptive-message",
    x: 80,
    y: 200,
    w: 860,
    h: 240,
    text: "Escribe una frase temática, una moraleja o un humor inteligente.",
    size: 56,
    color: C.white,
    bold: true,
  });
  addText(slide, {
    name: "disruptive-prompt",
    x: 80,
    y: 500,
    w: 760,
    h: 42,
    text: "Debe fijar una idea; no puede ser motivación genérica.",
    size: 22,
    color: C.paleBlue,
  });
  setNotes(slide, {
    purpose: "Romper el ritmo y fijar una idea memorable.",
    sourceLines: [lesson.source],
  });
}

// 06 — Cierre
{
  const slide = deck.slides.add();
  addBase(slide, brand.background);
  addHeader(slide, {
    page: 6,
    total,
    subject: lesson.subject,
    unit: lesson.unit,
    phase: "Cierre",
    logoBlob: brand.logoDark,
  });
  addText(slide, {
    name: "close-title",
    x: 72,
    y: 104,
    w: 1020,
    h: 62,
    text: "Cierra con una regla que el estudiante pueda usar.",
    size: 44,
    color: C.navy,
    bold: true,
  });
  addRect(slide, {
    name: "close-rule-card",
    x: 72,
    y: 214,
    w: 890,
    h: 230,
    fill: C.navy,
    radius: "rounded-xl",
  });
  addText(slide, {
    name: "close-rule",
    x: 110,
    y: 270,
    w: 814,
    h: 120,
    text: "Si ocurre __________,\nentonces aplica __________.",
    size: 38,
    color: C.white,
    bold: true,
    align: "center",
  });
  addText(slide, {
    name: "close-action",
    x: 72,
    y: 500,
    w: 860,
    h: 60,
    text: "Termina con una aplicación breve, no con “Gracias”.",
    size: 24,
    color: C.muted,
    bold: true,
  });
  setNotes(slide, {
    purpose: "Recuperar la regla y transferirla a un caso nuevo.",
    sourceLines: [lesson.source],
  });
}

// Si la clase necesita fotografías, carga archivos de assetsDir con loadBytes
// y colócalos mediante addImage. No alteres el sistema visual importado.
void addImage;
void loadBytes;
void assetsDir;

const result = await exportDeck(deck, {
  outputPptx: path.join(outputDir, "Clase_NID_Ejemplo.pptx"),
  renderDir: path.join(outputDir, "renders"),
  montagePath: path.join(outputDir, "montage.png"),
});
console.log(JSON.stringify(result, null, 2));
