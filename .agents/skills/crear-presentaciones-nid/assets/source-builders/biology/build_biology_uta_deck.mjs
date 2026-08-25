import fs from "node:fs/promises";
import path from "node:path";
import {
  Presentation,
  PresentationFile,
} from "/Users/afnaranjo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const ROOT =
  "/Users/afnaranjo/.codex/visualizations/2026/07/30/019fb321-1c1a-7602-b685-17e74fdfa316";
const BUILD_DIR = path.join(ROOT, "tmp/biology-uta");
const ASSETS = path.join(BUILD_DIR, "assets");
const OUTPUT_DIR = path.join(ROOT, "output");
const FINAL_PPTX = path.join(
  OUTPUT_DIR,
  "Clase_Biologia_ADN_ARN_Proteina_Preparacion_UTA_NID_V1_PROFESIONAL.pptx",
);
const RENDER_DIR = path.join(
  OUTPUT_DIR,
  "Clase_Biologia_ADN_ARN_Proteina_UTA_NID_V1",
);
const MONTAGE = path.join(
  OUTPUT_DIR,
  "Clase_Biologia_ADN_ARN_Proteina_UTA_NID_V1_MONTAGE.png",
);

const BACKGROUND = path.join(
  ROOT,
  "tmp/all-topics-editorial/assets/background-branded.png",
);
const LOGO_DARK = path.join(
  ROOT,
  "tmp/all-topics-editorial/assets/logo/nid-dark.png",
);
const LOGO_WHITE = path.join(
  ROOT,
  "tmp/all-topics-editorial/assets/logo/nid-white.png",
);

const W = 1280;
const H = 720;
const TOTAL = 13;
const FONT = "Arial";
const CAMERA_SAFE = { x: 998, y: 556, w: 238, h: 134 };

const C = {
  navy: "#091127",
  navy2: "#18233D",
  ink: "#17223B",
  muted: "#65738C",
  blue: "#2F7ED8",
  cyan: "#3BB7C6",
  lavender: "#7E70C9",
  coral: "#F08A7C",
  green: "#48A585",
  paleBlue: "#E6F0FB",
  paleCyan: "#E5F6F8",
  paleLavender: "#EEEAFB",
  paleCoral: "#FDECEA",
  ice: "#F7F9FD",
  white: "#FFFFFF",
  line: "#DCE4F1",
  warm: "#F2C07B",
};

const sources = {
  utaAdmission: "https://uta.edu.ec/admision-nivelacion/",
  utaSecondary:
    "https://precavidos.com/cronogramas/institucion/universidad-tecnica-de-ambato/",
  centralDogma:
    "https://www.genome.gov/es/genetics-glossary/Central-Dogma",
  dna:
    "https://www.genome.gov/genetics-glossary/Deoxyribonucleic-Acid-DNA",
  replication:
    "https://www.genome.gov/genetics-glossary/DNA-Replication",
  transcription:
    "https://www.genome.gov/genetics-glossary/Transcription",
  translation:
    "https://www.genome.gov/genetics-glossary/Translation",
  codon:
    "https://www.genome.gov/genetics-glossary/Genetic-Code",
  cover:
    "Imagen generada con IA para uso educativo; dirección de arte propia.",
  centralDogmaImage:
    "https://www.genome.gov/sites/default/files/media/images/2022-05/Central-dogma.jpg",
  dnaImage:
    "https://www.genome.gov/sites/default/files/media/images/2024-05/DNA_2024a.jpg",
  replicationImage:
    "https://www.genome.gov/sites/default/files/media/images/tg/DNA-replication.jpg",
  transcriptionImage:
    "https://www.genome.gov/sites/default/files/media/images/2023-05/Transcription.jpg",
  translationImage:
    "https://www.genome.gov/sites/default/files/media/images/2023-05/Translation.jpg",
};

async function loadBytes(filePath) {
  return new Uint8Array(await fs.readFile(filePath));
}

function addText(
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

function addRect(
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

function addRule(slide, { name, x, y, w, h = 1, fill = C.line }) {
  return addRect(slide, { name, x, y, w, h, fill, radius: null });
}

function addImage(
  slide,
  { name, blob, contentType = "image/png", x, y, w, h, alt, fit = "cover" },
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

function addBase(slide, backgroundBlob, { canvas = true, fill = C.ice } = {}) {
  addImage(slide, {
    name: "brand-background",
    blob: backgroundBlob,
    x: 0,
    y: 0,
    w: W,
    h: H,
    alt: "Fondo pastel azul y lavanda de la identidad NID",
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

function addLogo(
  slide,
  logoBlob,
  { name = "nid-logo", x = 1156, y = 44, w = 76, h = 34 } = {},
) {
  addImage(slide, {
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

function addPage(slide, page, { color = C.muted, x = 72 } = {}) {
  addText(slide, {
    name: `page-${page}`,
    x,
    y: 662,
    w: 110,
    h: 18,
    text: `${String(page).padStart(2, "0")} / ${TOTAL}`,
    size: 12,
    color,
    bold: true,
    wrap: "none",
  });
}

function addHeader(slide, page, phase, logoBlob) {
  addText(slide, {
    name: `header-${page}`,
    x: 72,
    y: 48,
    w: 700,
    h: 20,
    text: `BIOLOGÍA · PREPARACIÓN UTA   ·   ${phase.toUpperCase()}`,
    size: 13,
    color: C.muted,
    bold: true,
    wrap: "none",
  });
  addLogo(slide, logoBlob, { name: `logo-${page}` });
  addPage(slide, page);
}

function addPill(
  slide,
  { name, x, y, w, h = 34, text, fill, color = C.navy, size = 14 },
) {
  addRect(slide, { name: `${name}-pill`, x, y, w, h, fill, radius: "rounded-xl" });
  addText(slide, {
    name,
    x: x + 10,
    y: y + 7,
    w: w - 20,
    h: h - 12,
    text,
    size,
    color,
    bold: true,
    align: "center",
    valign: "middle",
    wrap: "none",
  });
}

function addNumber(slide, n, x, y, color) {
  addText(slide, {
    name: `number-${n}-${x}-${y}`,
    x,
    y,
    w: 56,
    h: 40,
    text: String(n).padStart(2, "0"),
    size: 25,
    color,
    bold: true,
    wrap: "none",
  });
}

function addBullet(slide, { name, x, y, w, text, color = C.blue, size = 21 }) {
  addRect(slide, {
    name: `${name}-dot`,
    x,
    y: y + 8,
    w: 8,
    h: 8,
    fill: color,
    radius: "rounded-xl",
  });
  addText(slide, {
    name,
    x: x + 22,
    y,
    w: w - 22,
    h: 60,
    text,
    size,
    color: C.ink,
  });
}

function setNotes(
  slide,
  { purpose, talk = [], sourcesUsed = [], teacherKey = [] },
) {
  const lines = [
    `Propósito docente: ${purpose}`,
    ...talk,
    ...teacherKey,
    "[Sources]",
    "- Identidad visual y logotipo: archivo proporcionado por el usuario.",
    ...sourcesUsed.map((line) => `- ${line}`),
    "- Redacción, secuencias y ejercicios: elaboración didáctica propia.",
    "- Material de preparación; no es una publicación oficial de la UTA.",
    "[/Sources]",
  ];
  slide.speakerNotes.textFrame.setText(lines);
  slide.speakerNotes.setVisible(true);
}

function addQuestionCard(
  slide,
  { idx, x, y, w, h, question, options, answer = null, accent = C.blue },
) {
  addRect(slide, {
    name: `q${idx}-card`,
    x,
    y,
    w,
    h,
    fill: C.white,
    radius: "rounded-xl",
    line: C.line,
  });
  addText(slide, {
    name: `q${idx}-number`,
    x: x + 18,
    y: y + 16,
    w: 40,
    h: 24,
    text: String(idx).padStart(2, "0"),
    size: 16,
    color: accent,
    bold: true,
    wrap: "none",
  });
  addText(slide, {
    name: `q${idx}-question`,
    x: x + 62,
    y: y + 14,
    w: w - 82,
    h: 58,
    text: question,
    size: 18,
    color: C.navy,
    bold: true,
  });
  addText(slide, {
    name: `q${idx}-options`,
    x: x + 62,
    y: y + 76,
    w: w - 82,
    h: h - 90,
    text: options,
    size: 15,
    color: C.muted,
  });
  if (answer) {
    addPill(slide, {
      name: `q${idx}-answer`,
      x: x + w - 96,
      y: y + h - 38,
      w: 76,
      h: 26,
      text: answer,
      fill: accent,
      color: C.white,
      size: 12,
    });
  }
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(RENDER_DIR, { recursive: true });

  const [
    backgroundBlob,
    logoDarkBlob,
    logoWhiteBlob,
    coverBlob,
    centralDogmaBlob,
    dnaBlob,
    replicationBlob,
    transcriptionBlob,
    translationBlob,
  ] = await Promise.all([
    loadBytes(BACKGROUND),
    loadBytes(LOGO_DARK),
    loadBytes(LOGO_WHITE),
    loadBytes(path.join(ASSETS, "cover-central-dogma.png")),
    loadBytes(path.join(ASSETS, "central-dogma.jpg")),
    loadBytes(path.join(ASSETS, "dna.jpg")),
    loadBytes(path.join(ASSETS, "dna-replication.jpg")),
    loadBytes(path.join(ASSETS, "transcription.jpg")),
    loadBytes(path.join(ASSETS, "translation.jpg")),
  ]);

  const deck = Presentation.create({ slideSize: { width: W, height: H } });

  // 01 — Portada
  {
    const slide = deck.slides.add();
    addImage(slide, {
      name: "cover-image",
      blob: coverBlob,
      x: 0,
      y: 0,
      w: W,
      h: H,
      alt:
        "Ilustración científica del flujo desde el ADN hacia el ARN y una proteína",
    });
    addRect(slide, {
      name: "cover-readable-field",
      x: 0,
      y: 0,
      w: 615,
      h: H,
      fill: "#091127D9",
      radius: null,
    });
    addLogo(slide, logoWhiteBlob, {
      name: "logo-1",
      x: 78,
      y: 58,
      w: 82,
      h: 36,
    });
    addText(slide, {
      name: "cover-eyebrow",
      x: 78,
      y: 126,
      w: 420,
      h: 24,
      text: "BIOLOGÍA MOLECULAR · PREPARACIÓN UTA",
      size: 14,
      color: "#B8C4D9",
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "cover-title",
      x: 76,
      y: 176,
      w: 486,
      h: 182,
      text: "Del ADN\na la proteína",
      size: 58,
      color: C.white,
      bold: true,
    });
    addText(slide, {
      name: "cover-subtitle",
      x: 78,
      y: 402,
      w: 458,
      h: 82,
      text:
        "Replicación, transcripción y traducción sin perder la dirección 5′ → 3′.",
      size: 23,
      color: "#C7D2E5",
    });
    addPill(slide, {
      name: "cover-tag",
      x: 78,
      y: 536,
      w: 188,
      text: "CIENCIAS DE LA SALUD",
      fill: C.blue,
      color: C.white,
      size: 13,
    });
    addPage(slide, 1, { color: C.white, x: 78 });
    setNotes(slide, {
      purpose:
        "Presentar el flujo de la información genética como unidad de estudio para Biología molecular.",
      talk: [
        "Pregunta inicial: si todas las células tienen ADN, ¿cómo convierte una célula esa información en una proteína concreta?",
      ],
      sourcesUsed: [
        `Contexto de admisión UTA: ${sources.utaAdmission}`,
        `Síntesis reciente del temario UTA para Ciencias de la Salud: ${sources.utaSecondary}`,
        `Dogma central: ${sources.centralDogma}`,
        sources.cover,
      ],
    });
  }

  // 02 — Activación
  {
    const slide = deck.slides.add();
    slide.background.fill = C.navy;
    addLogo(slide, logoWhiteBlob, { name: "logo-2" });
    addText(slide, {
      name: "hook-eyebrow",
      x: 78,
      y: 72,
      w: 420,
      h: 24,
      text: "PREGUNTA DE ENTRADA",
      size: 14,
      color: "#B8C4D9",
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "hook-title",
      x: 76,
      y: 142,
      w: 1000,
      h: 170,
      text: "Una sola base puede cambiar\nun aminoácido.",
      size: 60,
      color: C.white,
      bold: true,
    });
    addRect(slide, {
      name: "mutation-card",
      x: 78,
      y: 358,
      w: 700,
      h: 116,
      fill: C.navy2,
      radius: "rounded-xl",
      line: "#33415F",
    });
    addText(slide, {
      name: "mutation-sequence",
      x: 110,
      y: 384,
      w: 630,
      h: 46,
      text: "ARNm:  GAG   →   GUG",
      size: 32,
      color: C.white,
      bold: true,
      align: "center",
      wrap: "none",
    });
    addText(slide, {
      name: "mutation-aa",
      x: 110,
      y: 432,
      w: 630,
      h: 26,
      text: "ácido glutámico   →   valina",
      size: 17,
      color: "#B8C4D9",
      align: "center",
      wrap: "none",
    });
    addText(slide, {
      name: "hook-question",
      x: 78,
      y: 520,
      w: 790,
      h: 64,
      text: "¿Qué pasos conectan el cambio del ADN con el producto final?",
      size: 25,
      color: "#CBD5E6",
      bold: true,
    });
    addPage(slide, 2, { color: C.white, x: 78 });
    setNotes(slide, {
      purpose:
        "Activar la idea de que el orden de bases contiene información funcional.",
      talk: [
        "No profundices todavía en mutaciones; usa el ejemplo para justificar por qué importa seguir correctamente ADN, ARNm y proteína.",
      ],
      sourcesUsed: [
        `Código genético y codones: ${sources.codon}`,
        `Dogma central: ${sources.centralDogma}`,
      ],
    });
  }

  // 03 — Mapa
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 3, "Mapa de la clase", logoDarkBlob);
    addText(slide, {
      name: "map-title",
      x: 72,
      y: 92,
      w: 1020,
      h: 64,
      text: "La información genética se mueve mediante tres acciones.",
      size: 43,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    const columns = [
      {
        n: 1,
        x: 72,
        color: C.blue,
        pale: C.paleBlue,
        verb: "Replicar",
        equation: "ADN  →  ADN",
        meaning: "Duplicar el genoma antes de la división celular.",
        place: "Núcleo · fase S",
      },
      {
        n: 2,
        x: 456,
        color: C.lavender,
        pale: C.paleLavender,
        verb: "Transcribir",
        equation: "ADN  →  ARNm",
        meaning: "Copiar la secuencia de un gen en ARN mensajero.",
        place: "Núcleo",
      },
      {
        n: 3,
        x: 840,
        color: C.cyan,
        pale: C.paleCyan,
        verb: "Traducir",
        equation: "ARNm  →  proteína",
        meaning: "Convertir codones en una cadena de aminoácidos.",
        place: "Ribosoma · citoplasma",
      },
    ];
    columns.forEach((item) => {
      addRect(slide, {
        name: `map-card-${item.n}`,
        x: item.x,
        y: 198,
        w: 336,
        h: 356,
        fill: C.white,
        radius: "rounded-xl",
        line: C.line,
      });
      addNumber(slide, item.n, item.x + 24, 224, item.color);
      addText(slide, {
        name: `map-verb-${item.n}`,
        x: item.x + 24,
        y: 280,
        w: 280,
        h: 44,
        text: item.verb,
        size: 31,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
      addRect(slide, {
        name: `map-equation-bg-${item.n}`,
        x: item.x + 24,
        y: 344,
        w: 288,
        h: 54,
        fill: item.pale,
        radius: "rounded-xl",
      });
      addText(slide, {
        name: `map-equation-${item.n}`,
        x: item.x + 34,
        y: 356,
        w: 268,
        h: 30,
        text: item.equation,
        size: 22,
        color: item.color,
        bold: true,
        align: "center",
        wrap: "none",
      });
      addText(slide, {
        name: `map-meaning-${item.n}`,
        x: item.x + 24,
        y: 424,
        w: 288,
        h: 68,
        text: item.meaning,
        size: 18,
        color: C.ink,
      });
      addText(slide, {
        name: `map-place-${item.n}`,
        x: item.x + 24,
        y: 514,
        w: 288,
        h: 22,
        text: item.place.toUpperCase(),
        size: 13,
        color: item.color,
        bold: true,
        wrap: "none",
      });
    });
    setNotes(slide, {
      purpose:
        "Entregar un mapa anticipador que diferencie los tres procesos antes de entrar en el detalle.",
      talk: [
        "Aclara que la ubicación indicada corresponde a células eucariotas.",
      ],
      sourcesUsed: [
        `Dogma central: ${sources.centralDogma}`,
        `Replicación: ${sources.replication}`,
        `Transcripción: ${sources.transcription}`,
        `Traducción: ${sources.translation}`,
      ],
    });
  }

  // 04 — ADN
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 4, "Fundamento", logoDarkBlob);
    addText(slide, {
      name: "dna-title",
      x: 72,
      y: 92,
      w: 1000,
      h: 64,
      text: "El ADN guarda información en el orden de sus bases.",
      size: 43,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "dna-lead",
      x: 72,
      y: 184,
      w: 420,
      h: 72,
      text:
        "Dos hebras antiparalelas forman una doble hélice y se unen por complementariedad.",
      size: 23,
      color: C.ink,
      bold: true,
    });
    addPill(slide, {
      name: "pair-at",
      x: 72,
      y: 292,
      w: 178,
      text: "A  ↔  T",
      fill: C.paleBlue,
      color: C.blue,
      size: 20,
    });
    addPill(slide, {
      name: "pair-cg",
      x: 268,
      y: 292,
      w: 178,
      text: "C  ↔  G",
      fill: C.paleLavender,
      color: C.lavender,
      size: 20,
    });
    addBullet(slide, {
      name: "dna-bullet-1",
      x: 72,
      y: 372,
      w: 420,
      text: "Cada nucleótido contiene azúcar, fosfato y una base.",
      color: C.blue,
      size: 19,
    });
    addBullet(slide, {
      name: "dna-bullet-2",
      x: 72,
      y: 450,
      w: 420,
      text: "Las hebras tienen orientación: 5′ → 3′ y 3′ → 5′.",
      color: C.lavender,
      size: 19,
    });
    addBullet(slide, {
      name: "dna-bullet-3",
      x: 72,
      y: 528,
      w: 420,
      text: "La secuencia codifica instrucciones para ARN o proteínas.",
      color: C.cyan,
      size: 19,
    });
    addRect(slide, {
      name: "dna-image-card",
      x: 540,
      y: 182,
      w: 642,
      h: 370,
      fill: C.white,
      radius: "rounded-xl",
      line: C.line,
    });
    addImage(slide, {
      name: "dna-official-image",
      blob: dnaBlob,
      contentType: "image/jpeg",
      x: 562,
      y: 206,
      w: 598,
      h: 330,
      alt:
        "Ilustración del ADN con doble hélice, pares de bases y estructura química de nucleótidos",
      fit: "contain",
    });
    addPill(slide, {
      name: "dna-spanish-label",
      x: 566,
      y: 518,
      w: 214,
      h: 28,
      text: "DOBLE HÉLICE · PARES DE BASES",
      fill: C.navy,
      color: C.white,
      size: 11,
    });
    setNotes(slide, {
      purpose:
        "Asegurar la base conceptual necesaria para transcribir y replicar secuencias.",
      talk: [
        "Haz que el estudiante diga en voz alta las parejas A–T y C–G.",
        "Resalta que la orientación 5′/3′ no es decoración: cambia la lectura de la secuencia.",
      ],
      sourcesUsed: [
        `Definición y estructura del ADN: ${sources.dna}`,
        `Ilustración NHGRI: ${sources.dnaImage}`,
      ],
    });
  }

  // 05 — Replicación
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 5, "Proceso 1", logoDarkBlob);
    addText(slide, {
      name: "rep-title",
      x: 72,
      y: 92,
      w: 1040,
      h: 64,
      text: "Replicar es duplicar el ADN antes de dividir la célula.",
      size: 42,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addRect(slide, {
      name: "rep-image-card",
      x: 72,
      y: 188,
      w: 720,
      h: 390,
      fill: C.white,
      radius: "rounded-xl",
      line: C.line,
    });
    addImage(slide, {
      name: "replication-official-image",
      blob: replicationBlob,
      contentType: "image/jpeg",
      x: 92,
      y: 208,
      w: 680,
      h: 350,
      alt:
        "Diagrama de replicación del ADN con horquillas, hebra líder y fragmentos de Okazaki",
      fit: "contain",
    });
    addPill(slide, {
      name: "rep-tag",
      x: 96,
      y: 530,
      w: 264,
      h: 28,
      text: "REPRESENTACIÓN ESQUEMÁTICA NHGRI",
      fill: C.navy,
      color: C.white,
      size: 11,
    });
    addText(slide, {
      name: "rep-key-title",
      x: 840,
      y: 198,
      w: 330,
      h: 34,
      text: "Claves de examen",
      size: 26,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addNumber(slide, 1, 840, 258, C.blue);
    addText(slide, {
      name: "rep-key-1",
      x: 900,
      y: 258,
      w: 276,
      h: 62,
      text: "Semiconservativa:\ncada copia conserva una hebra original.",
      size: 18,
      color: C.ink,
      bold: true,
    });
    addNumber(slide, 2, 840, 354, C.lavender);
    addText(slide, {
      name: "rep-key-2",
      x: 900,
      y: 354,
      w: 276,
      h: 62,
      text: "La helicasa separa;\nla ADN polimerasa sintetiza.",
      size: 18,
      color: C.ink,
      bold: true,
    });
    addNumber(slide, 3, 840, 450, C.cyan);
    addText(slide, {
      name: "rep-key-3",
      x: 900,
      y: 450,
      w: 276,
      h: 62,
      text: "La nueva hebra siempre\ncrece en dirección 5′ → 3′.",
      size: 18,
      color: C.ink,
      bold: true,
    });
    setNotes(slide, {
      purpose:
        "Diferenciar replicación de expresión génica y fijar su finalidad celular.",
      talk: [
        "No exijas memorizar todas las enzimas en esta clase; prioriza finalidad, producto, carácter semiconservativo y dirección de síntesis.",
      ],
      sourcesUsed: [
        `Replicación del ADN: ${sources.replication}`,
        `Ilustración NHGRI: ${sources.replicationImage}`,
      ],
    });
  }

  // 06 — Transcripción
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 6, "Proceso 2", logoDarkBlob);
    addText(slide, {
      name: "transcription-title",
      x: 72,
      y: 92,
      w: 1030,
      h: 64,
      text: "Transcribir es hacer una copia de ARN de un gen.",
      size: 43,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addRect(slide, {
      name: "transcription-steps",
      x: 72,
      y: 190,
      w: 440,
      h: 358,
      fill: C.white,
      radius: "rounded-xl",
      line: C.line,
    });
    const steps = [
      {
        n: 1,
        color: C.blue,
        title: "La ARN polimerasa abre el gen.",
        body: "Lee la hebra molde del ADN en dirección 3′ → 5′.",
      },
      {
        n: 2,
        color: C.lavender,
        title: "Construye ARNm complementario.",
        body: "El ARN se sintetiza 5′ → 3′ y usa U en lugar de T.",
      },
      {
        n: 3,
        color: C.cyan,
        title: "El mensaje sale al citoplasma.",
        body: "En eucariotas, el ARNm procesado viaja hacia un ribosoma.",
      },
    ];
    steps.forEach((step, index) => {
      const y = 216 + index * 104;
      addNumber(slide, step.n, 96, y, step.color);
      addText(slide, {
        name: `tr-title-${step.n}`,
        x: 154,
        y,
        w: 326,
        h: 30,
        text: step.title,
        size: 18,
        color: C.navy,
        bold: true,
      });
      addText(slide, {
        name: `tr-body-${step.n}`,
        x: 154,
        y: y + 34,
        w: 326,
        h: 48,
        text: step.body,
        size: 15,
        color: C.muted,
      });
    });
    addRect(slide, {
      name: "transcription-image-card",
      x: 550,
      y: 190,
      w: 632,
      h: 358,
      fill: C.white,
      radius: "rounded-xl",
      line: C.line,
    });
    addImage(slide, {
      name: "transcription-official-image",
      blob: transcriptionBlob,
      contentType: "image/jpeg",
      x: 568,
      y: 208,
      w: 596,
      h: 324,
      alt:
        "Diagrama de transcripción en una célula eucariota con ARN polimerasa y ARNm",
      fit: "contain",
    });
    addPill(slide, {
      name: "transcription-rule",
      x: 72,
      y: 582,
      w: 592,
      h: 36,
      text: "REGLA RÁPIDA:  ADN molde 3′ → 5′  ⇒  ARNm 5′ → 3′",
      fill: C.navy,
      color: C.white,
      size: 15,
    });
    setNotes(slide, {
      purpose:
        "Mostrar cómo la célula copia solo un gen y convertir la dirección de lectura en una regla operativa.",
      talk: [
        "Contrasta con replicación: aquí el producto es ARN, no otra molécula de ADN.",
      ],
      sourcesUsed: [
        `Transcripción: ${sources.transcription}`,
        `Ilustración NHGRI: ${sources.transcriptionImage}`,
      ],
    });
  }

  // 07 — Traducción
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 7, "Proceso 3", logoDarkBlob);
    addText(slide, {
      name: "translation-title",
      x: 72,
      y: 92,
      w: 1030,
      h: 64,
      text: "Traducir es ensamblar aminoácidos según los codones.",
      size: 42,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addRect(slide, {
      name: "translation-image-card",
      x: 72,
      y: 190,
      w: 690,
      h: 382,
      fill: C.white,
      radius: "rounded-xl",
      line: C.line,
    });
    addImage(slide, {
      name: "translation-official-image",
      blob: translationBlob,
      contentType: "image/jpeg",
      x: 90,
      y: 206,
      w: 654,
      h: 350,
      alt:
        "Diagrama de traducción con ARNm, ribosoma, ARN de transferencia y cadena polipeptídica",
      fit: "contain",
    });
    addPill(slide, {
      name: "translation-tag",
      x: 96,
      y: 528,
      w: 244,
      h: 28,
      text: "RIBOSOMA · ARNt · POLIPÉPTIDO",
      fill: C.navy,
      color: C.white,
      size: 11,
    });
    addText(slide, {
      name: "translation-side-title",
      x: 810,
      y: 200,
      w: 350,
      h: 34,
      text: "Cómo leerlo",
      size: 26,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addBullet(slide, {
      name: "translation-bullet-1",
      x: 810,
      y: 260,
      w: 350,
      text: "El ribosoma avanza por el ARNm en dirección 5′ → 3′.",
      color: C.blue,
      size: 18,
    });
    addBullet(slide, {
      name: "translation-bullet-2",
      x: 810,
      y: 342,
      w: 350,
      text: "Cada codón de tres bases especifica un aminoácido o una señal.",
      color: C.lavender,
      size: 18,
    });
    addBullet(slide, {
      name: "translation-bullet-3",
      x: 810,
      y: 424,
      w: 350,
      text: "El ARNt aporta el aminoácido correcto mediante su anticodón.",
      color: C.cyan,
      size: 18,
    });
    addPill(slide, {
      name: "start-codon",
      x: 810,
      y: 524,
      w: 158,
      text: "AUG · INICIO",
      fill: C.paleBlue,
      color: C.blue,
      size: 14,
    });
    addPill(slide, {
      name: "stop-codons",
      x: 982,
      y: 512,
      w: 178,
      text: "UAA · UAG · UGA",
      fill: C.paleCoral,
      color: C.coral,
      size: 13,
    });
    setNotes(slide, {
      purpose:
        "Relacionar codones, ribosoma, ARNt y polipéptido en una secuencia causal.",
      talk: [
        "Aclara que los codones de terminación no añaden aminoácidos.",
      ],
      sourcesUsed: [
        `Traducción: ${sources.translation}`,
        `Código genético: ${sources.codon}`,
        `Ilustración NHGRI: ${sources.translationImage}`,
      ],
    });
  }

  // 08 — Ejemplo resuelto
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 8, "Ejemplo resuelto", logoDarkBlob);
    addText(slide, {
      name: "worked-title",
      x: 72,
      y: 92,
      w: 1030,
      h: 64,
      text: "De una hebra molde al péptido, sin invertir la dirección.",
      size: 42,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "worked-case-label",
      x: 72,
      y: 178,
      w: 100,
      h: 22,
      text: "CASO",
      size: 13,
      color: C.blue,
      bold: true,
      wrap: "none",
    });
    addRect(slide, {
      name: "worked-case",
      x: 72,
      y: 208,
      w: 820,
      h: 64,
      fill: C.navy,
      radius: "rounded-xl",
    });
    addText(slide, {
      name: "worked-dna-sequence",
      x: 98,
      y: 224,
      w: 768,
      h: 34,
      text: "ADN molde:   3′ – TAC  GGA  CTT  ACT – 5′",
      size: 24,
      color: C.white,
      bold: true,
      align: "center",
      wrap: "none",
    });
    const workedSteps = [
      {
        n: 1,
        y: 320,
        color: C.blue,
        title: "Complementa y cambia T por U.",
        result: "ARNm:   5′ – AUG  CCU  GAA  UGA – 3′",
      },
      {
        n: 2,
        y: 418,
        color: C.lavender,
        title: "Divide el ARNm en codones de tres bases.",
        result: "AUG  |  CCU  |  GAA  |  UGA",
      },
      {
        n: 3,
        y: 516,
        color: C.cyan,
        title: "Traduce desde AUG hasta el codón de parada.",
        result: "Metionina  –  Prolina  –  Ácido glutámico  –  STOP",
      },
    ];
    workedSteps.forEach((step) => {
      addNumber(slide, step.n, 72, step.y, step.color);
      addText(slide, {
        name: `worked-step-title-${step.n}`,
        x: 138,
        y: step.y,
        w: 520,
        h: 28,
        text: step.title,
        size: 18,
        color: C.ink,
        bold: true,
      });
      addText(slide, {
        name: `worked-step-result-${step.n}`,
        x: 138,
        y: step.y + 36,
        w: 724,
        h: 34,
        text: step.result,
        size: step.n === 3 ? 19 : 21,
        color: step.color,
        bold: true,
        wrap: "none",
      });
    });
    addRect(slide, {
      name: "worked-answer-card",
      x: 928,
      y: 208,
      w: 250,
      h: 270,
      fill: C.paleBlue,
      radius: "rounded-xl",
    });
    addText(slide, {
      name: "worked-answer-label",
      x: 956,
      y: 240,
      w: 194,
      h: 22,
      text: "RESPUESTA",
      size: 13,
      color: C.blue,
      bold: true,
      align: "center",
      wrap: "none",
    });
    addText(slide, {
      name: "worked-answer",
      x: 952,
      y: 292,
      w: 202,
      h: 96,
      text: "Met\n– Pro –\nGlu",
      size: 34,
      color: C.navy,
      bold: true,
      align: "center",
      valign: "middle",
    });
    addText(slide, {
      name: "worked-answer-note",
      x: 954,
      y: 408,
      w: 198,
      h: 42,
      text: "UGA detiene la traducción.",
      size: 15,
      color: C.muted,
      align: "center",
    });
    setNotes(slide, {
      purpose:
        "Modelar una resolución completa de transcripción y traducción con orientación explícita.",
      talk: [
        "Pide al estudiante verificar cada base antes de mirar los aminoácidos.",
        "La respuesta se detiene en UGA; STOP no es un aminoácido.",
      ],
      sourcesUsed: [
        `Transcripción: ${sources.transcription}`,
        `Traducción y codones: ${sources.translation}`,
        `Código genético: ${sources.codon}`,
      ],
    });
  }

  // 09 — Comparación
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 9, "Comparación", logoDarkBlob);
    addText(slide, {
      name: "compare-title",
      x: 72,
      y: 92,
      w: 1040,
      h: 64,
      text: "No confundas el proceso: identifica entrada, salida y lugar.",
      size: 42,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    const processes = [
      {
        x: 72,
        color: C.blue,
        pale: C.paleBlue,
        title: "REPLICACIÓN",
        rows: [
          ["Entrada", "ADN"],
          ["Salida", "ADN duplicado"],
          ["Lugar", "Núcleo · fase S"],
          ["Clave", "ADN polimerasa"],
        ],
      },
      {
        x: 446,
        color: C.lavender,
        pale: C.paleLavender,
        title: "TRANSCRIPCIÓN",
        rows: [
          ["Entrada", "ADN de un gen"],
          ["Salida", "ARNm"],
          ["Lugar", "Núcleo"],
          ["Clave", "ARN polimerasa"],
        ],
      },
      {
        x: 820,
        color: C.cyan,
        pale: C.paleCyan,
        title: "TRADUCCIÓN",
        rows: [
          ["Entrada", "ARNm"],
          ["Salida", "Polipéptido"],
          ["Lugar", "Ribosoma"],
          ["Clave", "ARNt + codones"],
        ],
      },
    ];
    processes.forEach((process, index) => {
      addRect(slide, {
        name: `compare-card-${index}`,
        x: process.x,
        y: 198,
        w: 336,
        h: 350,
        fill: C.white,
        radius: "rounded-xl",
        line: C.line,
      });
      addRect(slide, {
        name: `compare-cap-${index}`,
        x: process.x,
        y: 198,
        w: 336,
        h: 58,
        fill: process.pale,
        radius: "rounded-xl",
      });
      addText(slide, {
        name: `compare-title-${index}`,
        x: process.x + 22,
        y: 218,
        w: 292,
        h: 24,
        text: process.title,
        size: 16,
        color: process.color,
        bold: true,
        align: "center",
        wrap: "none",
      });
      process.rows.forEach(([label, value], rowIndex) => {
        const y = 284 + rowIndex * 64;
        addText(slide, {
          name: `compare-label-${index}-${rowIndex}`,
          x: process.x + 24,
          y,
          w: 90,
          h: 24,
          text: label.toUpperCase(),
          size: 12,
          color: process.color,
          bold: true,
          wrap: "none",
        });
        addText(slide, {
          name: `compare-value-${index}-${rowIndex}`,
          x: process.x + 118,
          y: y - 2,
          w: 190,
          h: 30,
          text: value,
          size: 17,
          color: C.ink,
          bold: rowIndex < 2,
        });
        if (rowIndex < process.rows.length - 1) {
          addRule(slide, {
            name: `compare-rule-${index}-${rowIndex}`,
            x: process.x + 24,
            y: y + 40,
            w: 288,
          });
        }
      });
    });
    addText(slide, {
      name: "compare-footer",
      x: 72,
      y: 590,
      w: 840,
      h: 40,
      text:
        "Atajo: si el producto es ARN, transcribe; si es proteína, traduce; si es ADN, replica.",
      size: 21,
      color: C.navy,
      bold: true,
    });
    setNotes(slide, {
      purpose:
        "Consolidar diferencias frecuentes en preguntas de opción múltiple.",
      talk: [
        "Haz que el estudiante tape los títulos y deduzca el proceso por entrada y salida.",
      ],
      sourcesUsed: [
        `Replicación: ${sources.replication}`,
        `Transcripción: ${sources.transcription}`,
        `Traducción: ${sources.translation}`,
      ],
    });
  }

  // 10 — Disruptiva
  {
    const slide = deck.slides.add();
    slide.background.fill = C.navy;
    addLogo(slide, logoWhiteBlob, { name: "logo-10" });
    addText(slide, {
      name: "break-label",
      x: 80,
      y: 80,
      w: 260,
      h: 24,
      text: "PAUSA DE MEMORIA",
      size: 14,
      color: C.cyan,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "break-title",
      x: 78,
      y: 176,
      w: 960,
      h: 196,
      text: "La célula no lee palabras.\nLee tripletes.",
      size: 67,
      color: C.white,
      bold: true,
    });
    addText(slide, {
      name: "break-subtitle",
      x: 80,
      y: 430,
      w: 770,
      h: 58,
      text: "Si pierdes la dirección 5′/3′, pierdes la respuesta.",
      size: 27,
      color: "#B8C4D9",
      bold: true,
    });
    ["AUG", "CCU", "GAA", "UGA"].forEach((codon, index) => {
      addPill(slide, {
        name: `break-codon-${index}`,
        x: 80 + index * 148,
        y: 542,
        w: 126,
        text: codon,
        fill: index === 3 ? C.coral : C.navy2,
        color: C.white,
        size: 18,
      });
    });
    addPage(slide, 10, { color: C.white, x: 80 });
    setNotes(slide, {
      purpose:
        "Romper el ritmo y fijar las dos ideas operativas: tripletes y orientación.",
      talk: [
        "Pide repetir la frase y luego señalar cuál codón detiene la secuencia mostrada.",
      ],
      sourcesUsed: [`Código genético: ${sources.codon}`],
    });
  }

  // 11 — Práctica guiada
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 11, "Práctica guiada", logoDarkBlob);
    addText(slide, {
      name: "guided-title",
      x: 72,
      y: 92,
      w: 970,
      h: 56,
      text: "Resuelve primero; usa la respuesta como retroalimentación.",
      size: 39,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addQuestionCard(slide, {
      idx: 1,
      x: 72,
      y: 176,
      w: 544,
      h: 190,
      question: "¿Qué base del ARN reemplaza a la timina?",
      options: "A  Adenina     B  Uracilo\nC  Guanina     D  Citosina",
      answer: "B",
      accent: C.blue,
    });
    addQuestionCard(slide, {
      idx: 2,
      x: 640,
      y: 176,
      w: 544,
      h: 190,
      question: "¿Qué estructura realiza la traducción?",
      options: "A  Núcleo      B  Ribosoma\nC  Lisosoma    D  Aparato de Golgi",
      answer: "B",
      accent: C.lavender,
    });
    addQuestionCard(slide, {
      idx: 3,
      x: 72,
      y: 390,
      w: 544,
      h: 206,
      question: "¿Qué enzima sintetiza una nueva hebra de ADN?",
      options: "A  ARNt         B  ARN polimerasa\nC  ADN polimerasa   D  Ribosoma",
      answer: "C",
      accent: C.cyan,
    });
    addQuestionCard(slide, {
      idx: 4,
      x: 640,
      y: 390,
      w: 544,
      h: 166,
      question: "ADN molde 3′–TAC AAA–5′. ¿Cuál es el ARNm?",
      options:
        "A  5′–AUG UUU–3′    B  5′–UAC AAA–3′\nC  3′–AUG UUU–5′    D  5′–ATG TTT–3′",
      answer: "A",
      accent: C.coral,
    });
    setNotes(slide, {
      purpose:
        "Verificar conceptos básicos y una transcripción corta con retroalimentación inmediata.",
      talk: [
        "En la pregunta 4, exige justificar tanto la complementariedad como la orientación.",
      ],
      sourcesUsed: [
        `ADN: ${sources.dna}`,
        `Replicación: ${sources.replication}`,
        `Transcripción: ${sources.transcription}`,
        `Traducción: ${sources.translation}`,
      ],
      teacherKey: [
        "Clave docente: 1-B; 2-B; 3-C; 4-A.",
      ],
    });
  }

  // 12 — Práctica autónoma
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 12, "Práctica autónoma", logoDarkBlob);
    addText(slide, {
      name: "independent-title",
      x: 72,
      y: 92,
      w: 980,
      h: 56,
      text: "Cuatro preguntas tipo prueba · sin respuestas visibles.",
      size: 40,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addQuestionCard(slide, {
      idx: 1,
      x: 72,
      y: 174,
      w: 544,
      h: 194,
      question: "¿Cuál secuencia representa el dogma central?",
      options:
        "A  Proteína → ARN → ADN\nB  ADN → ARN → proteína\nC  ARN → ADN → proteína\nD  ADN → proteína → ARN",
      accent: C.blue,
    });
    addQuestionCard(slide, {
      idx: 2,
      x: 640,
      y: 174,
      w: 544,
      h: 194,
      question: "Replicación semiconservativa significa que cada ADN hijo…",
      options:
        "A  conserva dos hebras nuevas.\nB  conserva una hebra original y una nueva.\nC  contiene solo ARN.\nD  pierde una hebra.",
      accent: C.lavender,
    });
    addQuestionCard(slide, {
      idx: 3,
      x: 72,
      y: 394,
      w: 544,
      h: 198,
      question: "ARNm 5′–AUG GCU UGA–3′. ¿Cuántos aminoácidos se incorporan?",
      options: "A  Uno     B  Dos\nC  Tres    D  Cuatro",
      accent: C.cyan,
    });
    addQuestionCard(slide, {
      idx: 4,
      x: 640,
      y: 394,
      w: 544,
      h: 156,
      question: "Si un codón cambia de UAU a UAA, ¿qué ocurre?",
      options:
        "A  Inicia replicación.\nB  Termina antes la traducción.\nC  Añade tirosina.\nD  Forma ADN.",
      accent: C.coral,
    });
    setNotes(slide, {
      purpose:
        "Aplicar el modelo sin apoyo visual de respuestas y detectar errores de concepto.",
      talk: [
        "Da entre 4 y 5 minutos y pide marcar la evidencia que descarta cada distractor.",
      ],
      sourcesUsed: [
        `Dogma central: ${sources.centralDogma}`,
        `Replicación: ${sources.replication}`,
        `Código genético y traducción: ${sources.translation}`,
      ],
      teacherKey: [
        "Clave docente: 1-B; 2-B; 3-B; 4-B.",
        "Pregunta 3: UGA es señal de terminación y no añade aminoácido.",
        "Pregunta 4: UAA es codón de terminación; la traducción se detiene prematuramente.",
      ],
    });
  }

  // 13 — Cierre
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 13, "Cierre", logoDarkBlob);
    addText(slide, {
      name: "close-title",
      x: 72,
      y: 92,
      w: 1030,
      h: 64,
      text: "Antes de responder, ejecuta tres filtros.",
      size: 43,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    const filters = [
      {
        x: 72,
        color: C.blue,
        pale: C.paleBlue,
        n: "01",
        title: "Dirección",
        body: "¿La hebra está escrita 5′ → 3′ o 3′ → 5′?",
      },
      {
        x: 428,
        color: C.lavender,
        pale: C.paleLavender,
        n: "02",
        title: "Alfabeto",
        body: "¿Trabajas con ADN —T— o con ARN —U—?",
      },
      {
        x: 784,
        color: C.cyan,
        pale: C.paleCyan,
        n: "03",
        title: "Producto",
        body: "¿Buscas ADN, ARNm o una cadena de aminoácidos?",
      },
    ];
    filters.forEach((filter, index) => {
      addRect(slide, {
        name: `close-card-${index}`,
        x: filter.x,
        y: 196,
        w: 320,
        h: 220,
        fill: C.white,
        radius: "rounded-xl",
        line: C.line,
      });
      addText(slide, {
        name: `close-number-${index}`,
        x: filter.x + 24,
        y: 222,
        w: 60,
        h: 34,
        text: filter.n,
        size: 23,
        color: filter.color,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `close-card-title-${index}`,
        x: filter.x + 24,
        y: 276,
        w: 272,
        h: 38,
        text: filter.title,
        size: 28,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
      addRule(slide, {
        name: `close-rule-${index}`,
        x: filter.x + 24,
        y: 326,
        w: 272,
        h: 3,
        fill: filter.color,
      });
      addText(slide, {
        name: `close-body-${index}`,
        x: filter.x + 24,
        y: 350,
        w: 272,
        h: 54,
        text: filter.body,
        size: 18,
        color: C.ink,
        bold: true,
      });
    });
    addRect(slide, {
      name: "close-flow",
      x: 72,
      y: 466,
      w: 890,
      h: 112,
      fill: C.navy,
      radius: "rounded-xl",
    });
    addText(slide, {
      name: "close-flow-text",
      x: 104,
      y: 494,
      w: 826,
      h: 48,
      text: "COPIA  →  MENSAJE  →  PRODUCTO",
      size: 31,
      color: C.white,
      bold: true,
      align: "center",
      valign: "middle",
      wrap: "none",
    });
    addText(slide, {
      name: "close-disclaimer",
      x: 72,
      y: 612,
      w: 860,
      h: 22,
      text:
        "Fuentes científicas: NHGRI/NIH · Material de preparación, no oficial de la UTA.",
      size: 13,
      color: C.muted,
      wrap: "none",
    });
    setNotes(slide, {
      purpose:
        "Cerrar con una rutina de decisión transferible a preguntas nuevas.",
      talk: [
        "Pide al estudiante explicar el flujo con sus propias palabras sin mirar las diapositivas anteriores.",
      ],
      sourcesUsed: [
        `Contexto de admisión UTA: ${sources.utaAdmission}`,
        `Dogma central: ${sources.centralDogma}`,
        `ADN: ${sources.dna}`,
        `Replicación: ${sources.replication}`,
        `Transcripción: ${sources.transcription}`,
        `Traducción: ${sources.translation}`,
        `Ilustración de referencia del dogma central: ${sources.centralDogmaImage}`,
      ],
    });
  }

  const inspect = await deck.inspect({
    kind: "slide,textbox,shape,image,notes",
    maxChars: 500000,
  });
  await fs.writeFile(`${FINAL_PPTX}.inspect.ndjson`, inspect.ndjson);

  for (const [index, slide] of deck.slides.items.entries()) {
    const png = await deck.export({ slide, format: "png", scale: 1 });
    const file = path.join(
      RENDER_DIR,
      `slide-${String(index + 1).padStart(2, "0")}.png`,
    );
    await fs.writeFile(file, new Uint8Array(await png.arrayBuffer()));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(
      path.join(
        RENDER_DIR,
        `slide-${String(index + 1).padStart(2, "0")}.layout.json`,
      ),
      await layout.text(),
    );
  }

  const montage = await deck.export({ format: "png", montage: true, scale: 1 });
  await fs.writeFile(MONTAGE, new Uint8Array(await montage.arrayBuffer()));

  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save(FINAL_PPTX);

  console.log(`slides=${deck.slides.items.length}`);
  console.log(`camera_safe=${JSON.stringify(CAMERA_SAFE)}`);
  console.log(`pptx=${FINAL_PPTX}`);
  console.log(`renders=${RENDER_DIR}`);
  console.log(`montage=${MONTAGE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
