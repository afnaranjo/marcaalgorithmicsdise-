import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";
import { TOPICS } from "./topics.mjs";
import { FORMULA_CATALOG } from "./formula-catalog.mjs";

const ROOT = "/Users/afnaranjo/.codex/visualizations/2026/07/30/019fb321-1c1a-7602-b685-17e74fdfa316";
const BUILD_DIR = path.join(ROOT, "tmp/all-topics-editorial");
const OUTPUT_DIR = path.join(ROOT, "output");
const FINAL_PPTX = path.join(OUTPUT_DIR, "Banco_Matematico_Todos_los_Temas_NID_CLASES_EN_VIVO_V2_PROFESIONAL.pptx");
const BACKGROUND = path.join(BUILD_DIR, "assets/background-branded.png");
const FORMULA_DIR = path.join(BUILD_DIR, "assets/formulas");
const LOGO_DARK = path.join(BUILD_DIR, "assets/logo/nid-dark.png");
const LOGO_WHITE = path.join(BUILD_DIR, "assets/logo/nid-white.png");

const W = 1280;
const H = 720;
const TOTAL = 3 + TOPICS.length * 4;
const FONT = "Arial";
const CAMERA_SAFE = { x: 998, y: 556, w: 238, h: 134 };
const METHOD_TITLES = [
  "Moda: identifica la frecuencia mayor",
  "Logaritmos: transforma y calcula",
  "Tangente: referencia y cuadrantes",
  "Distancia de punto a plano",
  "Distancia de punto a recta",
  "Circunferencia: centro y radio",
  "Trinomios: divide el término central",
  "Factor común: extrae lo compartido",
  "Teorema del factor: encuentra k",
  "Sesgo: interpreta la cola",
  "Ángulos de elevación",
  "Ecuaciones exponenciales",
  "Rango de una función racional",
  "Proyección vectorial",
  "Diferencia de conjuntos",
  "Ecuaciones cuadráticas",
];
const SOLVED_TITLES = [
  "La frecuencia mayor determina la moda.",
  "Factorizar convierte el logaritmo en una suma.",
  "El signo determina los cuadrantes.",
  "Sustituye el punto y normaliza.",
  "Evalúa la recta y normaliza.",
  "Los signos son opuestos al centro.",
  "Divide el término central y agrupa.",
  "Extrae el divisor y los exponentes menores.",
  "Sustituye la raíz asociada al factor.",
  "La cola orienta la posición de la media.",
  "Relaciona altura y distancia con la tangente.",
  "Sustituye la potencia repetida.",
  "El desplazamiento vertical queda fuera del rango.",
  "La proyección mide la componente de u sobre v.",
  "Conserva los elementos exclusivos de A.",
  "Identifica a, b y c antes de sustituir.",
];
let LOGO_DARK_BLOB;
let LOGO_WHITE_BLOB;

const C = {
  navy: "#091127",
  navy2: "#111C3A",
  ink: "#17223B",
  muted: "#65728A",
  blue: "#377FD8",
  lavender: "#7E70C9",
  ice: "#F7F9FD",
  white: "#FFFFFF",
  supportBlue: "#E5EFFB",
  supportLavender: "#EEEAFB",
  line: "#DCE4F1",
  darkLine: "#31405F",
  darkMuted: "#B8C4D9",
};

async function bytes(filePath) {
  return new Uint8Array(await fs.readFile(filePath));
}

function addText(slide, {
  name,
  x,
  y,
  w,
  h,
  text,
  size,
  color = C.ink,
  bold = false,
  align = "left",
  valign = "top",
  italic = false,
  wrap = "square",
}) {
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

function addRect(slide, {
  name,
  x,
  y,
  w,
  h,
  fill,
  radius = "rounded-xl",
  line = "none",
}) {
  return slide.shapes.add({
    geometry: radius ? "roundRect" : "rect",
    name,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: "solid", fill: line, width: line === "none" ? 0 : 1 },
    ...(radius ? { borderRadius: radius } : {}),
  });
}

function addRule(slide, { name, x, y, w, fill }) {
  return addRect(slide, { name, x, y, w, h: 1, fill, radius: null });
}

function addBackground(slide, bg) {
  slide.images.add({
    blob: new Uint8Array(bg),
    contentType: "image/png",
    alt: "Fondo pastel azul y lavanda con logotipo NID",
    fit: "cover",
    position: { left: 0, top: 0, width: W, height: H },
  });
}

function addInnerCanvas(slide, fill = C.ice) {
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

function addPage(slide, page, {
  x = 72,
  color = C.muted,
  align = "left",
} = {}) {
  addText(slide, {
    name: `page-${page}`,
    x,
    y: 661,
    w: 92,
    h: 20,
    text: `${String(page).padStart(2, "0")} / ${TOTAL}`,
    size: 12,
    color,
    bold: true,
    align,
  });
}

function addHeader(slide, topicIndex, phase, page, {
  x = 72,
  color = C.muted,
  pageColor = color,
  pageX = 72,
  pageAlign = "left",
  logoTone = "dark",
} = {}) {
  addText(slide, {
    name: `header-${page}`,
    x,
    y: 48,
    w: 620,
    h: 22,
    text: `TEMA ${String(topicIndex + 1).padStart(2, "0")} / 16   ·   ${phase.toUpperCase()}`,
    size: 13,
    color,
    bold: true,
  });
  addBrandMark(slide, { tone: logoTone, name: `nid-header-${page}` });
  addPage(slide, page, { x: pageX, color: pageColor, align: pageAlign });
}

function addFormula(slide, {
  file,
  x,
  y,
  w,
  h,
  alt,
  blob,
}) {
  slide.images.add({
    blob: new Uint8Array(blob),
    contentType: "image/png",
    alt,
    fit: "contain",
    position: { left: x, top: y, width: w, height: h },
  });
}

function addBrandMark(slide, {
  tone = "dark",
  x = 1164,
  y = 45,
  w = 66,
  h = 30,
  name = "nid-brand-mark",
} = {}) {
  const blob = tone === "white" ? LOGO_WHITE_BLOB : LOGO_DARK_BLOB;
  slide.images.add({
    blob: new Uint8Array(blob),
    contentType: "image/png",
    alt: "Logotipo oficial NID",
    fit: "contain",
    position: { left: x, top: y, width: w, height: h },
    name,
  });
}

function setNotes(slide, topic, purpose, lines = []) {
  const sourceLine = topic?.equivalent
    ? "- El enunciado original estaba incompleto o recortado; se usa un ejemplo equivalente completo."
    : "- Contenido base: /Users/afnaranjo/Downloads/Ejercicios.pdf";
  slide.speakerNotes.textFrame.setText([
    `Propósito docente: ${purpose}`,
    ...lines,
    "[Sources]",
    sourceLine,
    "- Fondo y logotipo: /Users/afnaranjo/Downloads/741258318_1693788871945555_5418664141547494390_n.jpeg",
    "- Fórmulas principales: LaTeX renderizado con MathJax; elaboración y verificación didáctica propia.",
    "- Ejercicios adicionales: elaboración didáctica propia verificada.",
    "[/Sources]",
  ]);
  slide.speakerNotes.setVisible(true);
}

function accentFor(topicIndex) {
  return topicIndex % 2 === 0 ? C.blue : C.lavender;
}

function supportFor(topicIndex) {
  return topicIndex % 2 === 0 ? C.supportBlue : C.supportLavender;
}

function titleSize(text, base = 46) {
  if (text.length > 52) return Math.max(36, base - 7);
  if (text.length > 44) return Math.max(39, base - 4);
  return base;
}

function answerSize(text) {
  if (text.length > 31) return 17;
  if (text.length > 22) return 19;
  return 22;
}

function addCover(deck, bg, page) {
  const slide = deck.slides.add();
  addBackground(slide, bg);
  addRect(slide, {
    name: "cover-navy-field",
    x: 54,
    y: 70,
    w: 770,
    h: 578,
    fill: C.navy,
    radius: "rounded-2xl",
  });
  addText(slide, {
    name: "cover-eyebrow",
    x: 94,
    y: 106,
    w: 560,
    h: 26,
    text: "CLASES DE REPASO MATEMÁTICO",
    size: 15,
    color: C.darkMuted,
    bold: true,
  });
  addText(slide, {
    name: "cover-title",
    x: 92,
    y: 164,
    w: 660,
    h: 180,
    text: "Banco matemático\npara dominar el método",
    size: 61,
    color: C.white,
    bold: true,
  });
  addText(slide, {
    name: "cover-subtitle",
    x: 96,
    y: 368,
    w: 600,
    h: 68,
    text: "Reglas claras, ejemplos resueltos y práctica gradual en 16 temas.",
    size: 24,
    color: C.darkMuted,
  });
  addText(slide, {
    name: "cover-16",
    x: 94,
    y: 505,
    w: 140,
    h: 90,
    text: "16",
    size: 66,
    color: C.blue,
    bold: true,
  });
  addText(slide, {
    name: "cover-16-label",
    x: 214,
    y: 534,
    w: 160,
    h: 30,
    text: "temas",
    size: 22,
    color: C.white,
    bold: true,
  });
  addText(slide, {
    name: "cover-144",
    x: 418,
    y: 505,
    w: 190,
    h: 90,
    text: "144",
    size: 66,
    color: C.lavender,
    bold: true,
  });
  addText(slide, {
    name: "cover-144-label",
    x: 596,
    y: 534,
    w: 160,
    h: 30,
    text: "ejercicios",
    size: 22,
    color: C.white,
    bold: true,
  });
  addBrandMark(slide, {
    tone: "dark",
    x: 900,
    y: 274,
    w: 270,
    h: 122,
    name: "nid-cover-mark",
  });
  addPage(slide, page, { x: 72, color: C.navy });
  setNotes(slide, null, "Abrir la clase presentando la promesa: comprender el método antes de memorizar respuestas.");
}

function addMap(deck, bg, page) {
  const slide = deck.slides.add();
  addBackground(slide, bg);
  addInnerCanvas(slide);
  addText(slide, {
    name: "map-eyebrow",
    x: 72,
    y: 52,
    w: 440,
    h: 24,
    text: "RUTA DE APRENDIZAJE",
    size: 14,
    color: C.muted,
    bold: true,
  });
  addText(slide, {
    name: "map-title",
    x: 72,
    y: 94,
    w: 930,
    h: 68,
    text: "Dieciséis métodos, una misma lógica: reconocer → aplicar → practicar.",
    size: 41,
    color: C.navy,
    bold: true,
  });
  addBrandMark(slide, { tone: "dark", name: "nid-map-mark" });
  TOPICS.forEach((topic, index) => {
    const column = index < 8 ? 0 : 1;
    const row = index % 8;
    const x = column === 0 ? 82 : 664;
    const y = 205 + row * 52;
    const accent = accentFor(index);
    addText(slide, {
      name: `map-number-${index}`,
      x,
      y,
      w: 48,
      h: 26,
      text: String(index + 1).padStart(2, "0"),
      size: 18,
      color: accent,
      bold: true,
    });
    addText(slide, {
      name: `map-topic-${index}`,
      x: x + 58,
      y,
      w: column === 0 ? 460 : (row < 7 ? 470 : 250),
      h: 28,
      text: topic.short,
      size: 20,
      color: C.ink,
      bold: true,
    });
  });
  addPage(slide, page);
  setNotes(slide, null, "Mostrar el mapa completo sin convertirlo en una agenda operativa; enfatizar la progresión común.");
}

function addDisruptiveSlide(deck, page) {
  const slide = deck.slides.add();
  slide.background.fill = C.lavender;
  addBrandMark(slide, {
    tone: "white",
    x: 1156,
    y: 48,
    w: 76,
    h: 34,
    name: "nid-disruptive-mark",
  });
  addText(slide, {
    name: "disruptive-eyebrow",
    x: 78,
    y: 74,
    w: 420,
    h: 24,
    text: "PAUSA MATEMÁTICA",
    size: 14,
    color: C.white,
    bold: true,
  });
  addText(slide, {
    name: "disruptive-title",
    x: 76,
    y: 160,
    w: 780,
    h: 210,
    text: "El signo menos\nno está enojado contigo.",
    size: 66,
    color: C.white,
    bold: true,
  });
  addText(slide, {
    name: "disruptive-punchline",
    x: 80,
    y: 414,
    w: 720,
    h: 70,
    text: "Solo quiere que lo mires dos veces.",
    size: 30,
    color: C.navy,
    bold: true,
  });
  addText(slide, {
    name: "disruptive-reset",
    x: 80,
    y: 510,
    w: 680,
    h: 34,
    text: "Respira. Revisa el signo. Continúa.",
    size: 20,
    color: C.white,
  });
  addPage(slide, page, { x: 80, color: C.white });
  setNotes(slide, null, "Romper el hielo antes de iniciar los temas; normalizar el error como parte del aprendizaje.");
}

function addMethodSlide(deck, bg, topic, topicIndex, formula, methodBlob, page) {
  const slide = deck.slides.add();
  const accent = accentFor(topicIndex);
  const support = supportFor(topicIndex);
  const reverse = topicIndex % 2 === 1;
  addBackground(slide, bg);
  addInnerCanvas(slide);
  addHeader(slide, topicIndex, "Método", page);

  addText(slide, {
    name: `method-big-number-${topicIndex}`,
    x: 72,
    y: 78,
    w: 110,
    h: 98,
    text: String(topicIndex + 1).padStart(2, "0"),
    size: 76,
    color: support,
    bold: true,
  });
  addText(slide, {
    name: `method-title-${topicIndex}`,
    x: 176,
    y: 92,
    w: 990,
    h: 70,
    text: METHOD_TITLES[topicIndex],
    size: titleSize(METHOD_TITLES[topicIndex], 47),
    color: C.navy,
    bold: true,
    wrap: "none",
  });
  addText(slide, {
    name: `method-promise-${topicIndex}`,
    x: 180,
    y: 160,
    w: 880,
    h: 36,
    text: topic.promise,
    size: 22,
    color: C.muted,
  });

  const stepsX = reverse ? 700 : 94;
  const formulaX = reverse ? 88 : 690;
  topic.steps.forEach(([title, body], i) => {
    const y = 248 + i * 108;
    addText(slide, {
      name: `method-step-number-${topicIndex}-${i}`,
      x: stepsX,
      y,
      w: 54,
      h: 34,
      text: String(i + 1).padStart(2, "0"),
      size: 24,
      color: i === 0 ? accent : C.muted,
      bold: true,
    });
    addText(slide, {
      name: `method-step-title-${topicIndex}-${i}`,
      x: stepsX + 62,
      y,
      w: 410,
      h: 30,
      text: title,
      size: 22,
      color: C.navy,
      bold: true,
    });
    addText(slide, {
      name: `method-step-body-${topicIndex}-${i}`,
      x: stepsX + 62,
      y: y + 34,
      w: 420,
      h: 54,
      text: body,
      size: 18,
      color: C.muted,
    });
  });

  addRect(slide, {
    name: `method-formula-surface-${topicIndex}`,
    x: formulaX,
    y: 246,
    w: 500,
    h: 304,
    fill: C.white,
    radius: "rounded-2xl",
  });
  addText(slide, {
    name: `method-formula-kind-${topicIndex}`,
    x: formulaX + 34,
    y: 278,
    w: 300,
    h: 24,
    text: formula.kind.toUpperCase(),
    size: 13,
    color: C.muted,
    bold: true,
  });
  addFormula(slide, {
    file: `t${String(topicIndex + 1).padStart(2, "0")}-method.png`,
    x: formulaX + 28,
    y: 322,
    w: 444,
    h: 126,
    alt: `${formula.kind} de ${topic.short}, renderizada desde LaTeX`,
    blob: methodBlob,
  });
  addRule(slide, {
    name: `method-formula-rule-${topicIndex}`,
    x: formulaX + 34,
    y: 466,
    w: 432,
    fill: support,
  });
  addText(slide, {
    name: `method-symbols-${topicIndex}`,
    x: formulaX + 34,
    y: 486,
    w: 430,
    h: 56,
    text: formula.symbols,
    size: 16,
    color: C.muted,
  });
  setNotes(slide, topic, `Explicar el método de ${topic.short} en tres decisiones y relacionarlo con la fórmula LaTeX.`, [
    `Tipo de fórmula: ${formula.kind}.`,
    `Símbolos: ${formula.symbols}.`,
  ]);
}

function addSolvedSlide(deck, bg, topic, topicIndex, answerBlob, page) {
  const slide = deck.slides.add();
  const accent = accentFor(topicIndex);
  const panelX = 36;
  const lightX = 508;
  const contentW = 690;
  addBackground(slide, bg);
  addInnerCanvas(slide);
  addRect(slide, {
    name: `solved-dark-field-${topicIndex}`,
    x: panelX,
    y: 36,
    w: 420,
    h: 648,
    fill: C.navy,
    radius: "rounded-2xl",
  });
  addHeader(slide, topicIndex, "Ejemplo resuelto", page, {
    x: lightX,
    pageColor: C.white,
    pageX: panelX + 284,
  });
  addText(slide, {
    name: `solved-title-${topicIndex}`,
    x: lightX,
    y: 90,
    w: contentW,
    h: 112,
    text: SOLVED_TITLES[topicIndex],
    size: titleSize(SOLVED_TITLES[topicIndex], 47),
    color: C.navy,
    bold: true,
  });
  addText(slide, {
    name: `solved-example-label-${topicIndex}`,
    x: lightX,
    y: 218,
    w: 220,
    h: 22,
    text: "CASO",
    size: 13,
    color: accent,
    bold: true,
  });
  addText(slide, {
    name: `solved-example-${topicIndex}`,
    x: lightX,
    y: 248,
    w: contentW,
    h: 78,
    text: topic.example,
    size: topic.example.length > 48 ? 25 : 29,
    color: C.ink,
    bold: true,
  });
  topic.exampleSteps.forEach((step, i) => {
    const isBottomStep = i === 2;
    const x = isBottomStep ? lightX : lightX + i * 342;
    const y = isBottomStep ? 526 : 390;
    const width = isBottomStep ? CAMERA_SAFE.x - lightX - 28 : 312;
    addText(slide, {
      name: `solved-step-num-${topicIndex}-${i}`,
      x,
      y: y - 34,
      w: 46,
      h: 30,
      text: String(i + 1).padStart(2, "0"),
      size: 21,
      color: i === 0 ? accent : C.muted,
      bold: true,
    });
    addText(slide, {
      name: `solved-step-${topicIndex}-${i}`,
      x,
      y,
      w: width,
      h: isBottomStep ? 86 : 96,
      text: step,
      size: step.length > 54 ? 19 : 21,
      color: C.ink,
      valign: "top",
    });
  });
  addText(slide, {
    name: `solved-panel-topic-${topicIndex}`,
    x: panelX + 34,
    y: 82,
    w: 300,
    h: 26,
    text: topic.short.toUpperCase(),
    size: 14,
    color: C.darkMuted,
    bold: true,
  });
  addText(slide, {
    name: `solved-panel-number-${topicIndex}`,
    x: panelX + 30,
    y: 122,
    w: 300,
    h: 132,
    text: String(topicIndex + 1).padStart(2, "0"),
    size: 94,
    color: accent,
    bold: true,
  });
  addText(slide, {
    name: `solved-panel-answer-label-${topicIndex}`,
    x: panelX + 34,
    y: 304,
    w: 300,
    h: 24,
    text: "RESULTADO",
    size: 13,
    color: C.darkMuted,
    bold: true,
  });
  addFormula(slide, {
    file: `t${String(topicIndex + 1).padStart(2, "0")}-answer.png`,
    x: panelX + 28,
    y: 342,
    w: 360,
    h: 136,
    alt: `Resultado del ejemplo de ${topic.short}, renderizado desde LaTeX`,
    blob: answerBlob,
  });
  addRule(slide, {
    name: `solved-panel-rule-${topicIndex}`,
    x: panelX + 34,
    y: 508,
    w: 350,
    fill: C.darkLine,
  });
  addText(slide, {
    name: `solved-panel-caption-${topicIndex}`,
    x: panelX + 34,
    y: 532,
    w: 340,
    h: 72,
    text: "Comprueba el resultado sustituyendo o revirtiendo el procedimiento.",
    size: 17,
    color: C.darkMuted,
  });
  setNotes(slide, topic, `Resolver el ejemplo de ${topic.short} paso a paso y comprobar el resultado.`, [
    `Ejercicio: ${topic.example}`,
    `Respuesta: ${topic.answer}`,
  ]);
}

function addGuidedSlide(deck, bg, topic, topicIndex, page) {
  const slide = deck.slides.add();
  const accent = accentFor(topicIndex);
  addBackground(slide, bg);
  addInnerCanvas(slide);
  addHeader(slide, topicIndex, "Práctica guiada", page);
  addText(slide, {
    name: `guided-title-${topicIndex}`,
    x: 72,
    y: 92,
    w: 1010,
    h: 58,
    text: "Practica cuatro variaciones.",
    size: 48,
    color: C.navy,
    bold: true,
    wrap: "none",
  });
  addText(slide, {
    name: `guided-subtitle-${topicIndex}`,
    x: 74,
    y: 154,
    w: 760,
    h: 32,
    text:
      topicIndex === 2
        ? "En todos los casos: 0° ≤ x ≤ 360°; resuelve y compara."
        : "Resuelve primero; usa la respuesta como retroalimentación.",
    size: 21,
    color: C.muted,
  });

  topic.guided.forEach(([problem, answer], i) => {
    const y = 218 + i * 101;
    const answerX = i < 3 ? 982 : 760;
    const answerW = i < 3 ? 224 : 210;
    const rowEnd = i < 3 ? 1206 : 970;
    addText(slide, {
      name: `guided-number-${topicIndex}-${i}`,
      x: 84,
      y,
      w: 54,
      h: 42,
      text: String(i + 1).padStart(2, "0"),
      size: 25,
      color: i === 0 ? accent : C.muted,
      bold: true,
      valign: "middle",
    });
    addText(slide, {
      name: `guided-problem-${topicIndex}-${i}`,
      x: 164,
      y,
      w: 570,
      h: 64,
      text: problem,
      size: problem.length > 42 ? 20 : 23,
      color: C.ink,
      valign: "middle",
    });
    addText(slide, {
      name: `guided-answer-${topicIndex}-${i}`,
      x: answerX,
      y,
      w: answerW,
      h: 64,
      text: answer,
      size: answerSize(answer),
      color: accent,
      bold: true,
      align: "right",
      valign: "middle",
    });
    if (i < 3) {
      addRule(slide, {
        name: `guided-separator-${topicIndex}-${i}`,
        x: 164,
        y: y + 76,
        w: rowEnd - 164,
        fill: C.line,
      });
    }
  });
  addText(slide, {
    name: `guided-footer-${topicIndex}`,
    x: 164,
    y: 638,
    w: 800,
    h: 28,
    text: "La respuesta confirma el método; el procedimiento demuestra el aprendizaje.",
    size: 17,
    color: C.muted,
  });
  setNotes(slide, topic, `Practicar ${topic.short} con retroalimentación inmediata.`, [
    ...topic.guided.map(([problem, answer], i) => `${i + 1}) ${problem} → ${answer}`),
  ]);
}

function addPracticeSlide(deck, bg, topic, topicIndex, page) {
  const slide = deck.slides.add();
  const accent = accentFor(topicIndex);
  addBackground(slide, bg);
  addRect(slide, {
    name: `practice-dark-canvas-${topicIndex}`,
    x: 28,
    y: 28,
    w: 1224,
    h: 664,
    fill: C.navy,
    radius: "rounded-2xl",
  });
  addRect(slide, {
    name: `practice-accent-field-${topicIndex}`,
    x: 44,
    y: 44,
    w: 142,
    h: 632,
    fill: accent,
    radius: "rounded-xl",
  });
  addText(slide, {
    name: `practice-big-number-${topicIndex}`,
    x: 56,
    y: 250,
    w: 118,
    h: 130,
    text: String(topicIndex + 1).padStart(2, "0"),
    size: 74,
    color: C.white,
    bold: true,
    align: "center",
    valign: "middle",
  });
  addHeader(slide, topicIndex, "Ahora tú", page, {
    x: 220,
    color: C.darkMuted,
    pageColor: C.white,
    pageX: 68,
    logoTone: "white",
  });
  addText(slide, {
    name: `practice-title-${topicIndex}`,
    x: 218,
    y: 92,
    w: 930,
    h: 62,
    text: "Resuelve sin ver la clave.",
    size: 48,
    color: C.white,
    bold: true,
    wrap: "none",
  });
  addText(slide, {
    name: `practice-subtitle-${topicIndex}`,
    x: 220,
    y: 162,
    w: 780,
    h: 30,
    text:
      topicIndex === 2
        ? "En todos los casos: 0° ≤ x ≤ 360°. Justifica cada paso."
        : "Aplica el método, justifica cada paso y escribe tu respuesta.",
    size: 20,
    color: C.darkMuted,
  });
  topic.practice.forEach(([problem], i) => {
    const y = 232 + i * 99;
    const answerX = i < 3 ? 990 : 770;
    const answerW = i < 3 ? 216 : 200;
    const rowEnd = i < 3 ? 1206 : 970;
    addText(slide, {
      name: `practice-number-${topicIndex}-${i}`,
      x: 220,
      y,
      w: 54,
      h: 64,
      text: String(i + 1).padStart(2, "0"),
      size: 23,
      color: i === 0 ? accent : C.darkMuted,
      bold: true,
      valign: "middle",
    });
    addText(slide, {
      name: `practice-problem-${topicIndex}-${i}`,
      x: 294,
      y,
      w: 450,
      h: 64,
      text: problem,
      size: problem.length > 42 ? 20 : 23,
      color: C.white,
      valign: "middle",
    });
    addText(slide, {
      name: `practice-answer-line-${topicIndex}-${i}`,
      x: answerX,
      y,
      w: answerW,
      h: 64,
      text: "Respuesta  __________________",
      size: 17,
      color: C.darkMuted,
      align: "right",
      valign: "middle",
    });
    if (i < 3) {
      addRule(slide, {
        name: `practice-separator-${topicIndex}-${i}`,
        x: 294,
        y: y + 76,
        w: rowEnd - 294,
        fill: C.darkLine,
      });
    }
  });
  addText(slide, {
    name: `practice-footer-${topicIndex}`,
    x: 294,
    y: 632,
    w: 676,
    h: 26,
    text: "Clave docente disponible en las notas del presentador.",
    size: 17,
    color: accent,
    bold: true,
  });
  setNotes(slide, topic, `Resolver cuatro ejercicios autónomos de ${topic.short}.`, [
    "Clave docente:",
    ...topic.practice.map(([problem, answer], i) => `${i + 1}) ${problem} → ${answer}`),
  ]);
}

async function main() {
  if (TOPICS.length !== 16 || FORMULA_CATALOG.length !== 16) {
    throw new Error("Se requieren 16 temas y 16 entradas de fórmulas.");
  }
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const bg = await bytes(BACKGROUND);
  LOGO_DARK_BLOB = await bytes(LOGO_DARK);
  LOGO_WHITE_BLOB = await bytes(LOGO_WHITE);
  const methodBlobs = [];
  const answerBlobs = [];
  for (let i = 0; i < TOPICS.length; i += 1) {
    const topic = String(i + 1).padStart(2, "0");
    methodBlobs.push(await bytes(path.join(FORMULA_DIR, `t${topic}-method.png`)));
    answerBlobs.push(await bytes(path.join(FORMULA_DIR, `t${topic}-answer.png`)));
  }

  const deck = Presentation.create({ slideSize: { width: W, height: H } });
  let page = 1;
  addCover(deck, bg, page++);
  addMap(deck, bg, page++);
  addDisruptiveSlide(deck, page++);
  TOPICS.forEach((topic, topicIndex) => {
    addMethodSlide(deck, bg, topic, topicIndex, FORMULA_CATALOG[topicIndex], methodBlobs[topicIndex], page++);
    addSolvedSlide(deck, bg, topic, topicIndex, answerBlobs[topicIndex], page++);
    addGuidedSlide(deck, bg, topic, topicIndex, page++);
    addPracticeSlide(deck, bg, topic, topicIndex, page++);
  });

  if (deck.slides.items.length !== TOTAL) {
    throw new Error(`Conteo inesperado: ${deck.slides.items.length} diapositivas.`);
  }
  const inspect = await deck.inspect({
    kind: "slide,textbox,shape,image,notes",
    maxChars: 200000,
  });
  await fs.writeFile(`${FINAL_PPTX}.inspect.ndjson`, inspect.ndjson);
  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save(FINAL_PPTX);
  console.log(`slides=${deck.slides.items.length}`);
  console.log(FINAL_PPTX);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
