import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const ROOT = "/Users/afnaranjo/.codex/visualizations/2026/07/30/019fb321-1c1a-7602-b685-17e74fdfa316";
const BUILD_DIR = path.join(ROOT, "tmp/multimateria-literatura");
const OUTPUT_DIR = path.join(ROOT, "output");
const FINAL_PPTX = path.join(
  OUTPUT_DIR,
  "Clase_Literatura_Tipos_de_Obras_Literarias_NID_V1_PROFESIONAL.pptx",
);
const RENDER_DIR = path.join(
  OUTPUT_DIR,
  "Clase_Literatura_Tipos_de_Obras_Literarias_V1",
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
const GENERATED = path.join(BUILD_DIR, "assets/generated");

const W = 1280;
const H = 720;
const TOTAL = 11;
const FONT = "Arial";
const CAMERA_SAFE = { x: 998, y: 556, w: 238, h: 134 };

const C = {
  navy: "#091127",
  navy2: "#17223B",
  ink: "#17223B",
  muted: "#66738B",
  blue: "#377FD8",
  lavender: "#7E70C9",
  paleBlue: "#E5EFFB",
  paleLavender: "#EEEAFB",
  ice: "#F7F9FD",
  white: "#FFFFFF",
  line: "#DCE4F1",
  warm: "#F2C07B",
};

const sources = {
  narrative: "https://dle.rae.es/narrativo",
  drama: "https://dle.rae.es/drama",
  lyric: "https://www.rae.es/dhle/l%C3%ADrico",
  userBrand:
    "/Users/afnaranjo/Downloads/741258318_1693788871945555_5418664141547494390_n.jpeg",
};

async function loadBytes(filePath) {
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
  italic = false,
  align = "left",
  valign = "top",
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

function addRule(slide, { name, x, y, w, fill = C.line, h = 1 }) {
  return addRect(slide, { name, x, y, w, h, fill, radius: null });
}

function addImage(slide, {
  name,
  blob,
  x,
  y,
  w,
  h,
  alt,
  fit = "cover",
}) {
  return slide.images.add({
    name,
    blob: new Uint8Array(blob),
    contentType: "image/png",
    alt,
    fit,
    position: { left: x, top: y, width: w, height: h },
  });
}

function addBase(slide, backgroundBlob, {
  canvas = true,
  canvasFill = C.ice,
} = {}) {
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
      fill: canvasFill,
      radius: "rounded-2xl",
    });
  }
}

function addLogo(slide, logoBlob, {
  name = "nid-logo",
  x = 1156,
  y = 44,
  w = 76,
  h = 34,
} = {}) {
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

function addPage(slide, page, {
  color = C.muted,
  x = 72,
} = {}) {
  addText(slide, {
    name: `page-${page}`,
    x,
    y: 662,
    w: 100,
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
    w: 600,
    h: 20,
    text: `LENGUA Y LITERATURA   ·   ${phase.toUpperCase()}`,
    size: 13,
    color: C.muted,
    bold: true,
    wrap: "none",
  });
  addLogo(slide, logoBlob, { name: `logo-${page}` });
  addPage(slide, page);
}

function setNotes(slide, {
  purpose,
  talk = [],
  sourceLines = [],
  teacherKey = [],
}) {
  const lines = [
    `Propósito docente: ${purpose}`,
    ...talk,
    ...teacherKey,
    "[Sources]",
    `- Identidad visual y logotipo: ${sources.userBrand}`,
    ...sourceLines,
    "- Ejemplos, fragmentos y síntesis: elaboración didáctica propia.",
    "[/Sources]",
  ];
  slide.speakerNotes.textFrame.setText(lines);
  slide.speakerNotes.setVisible(true);
}

function addEditorialNumber(slide, number, x, y, color) {
  addText(slide, {
    name: `editorial-number-${number}-${x}-${y}`,
    x,
    y,
    w: 62,
    h: 42,
    text: String(number).padStart(2, "0"),
    size: 25,
    color,
    bold: true,
    wrap: "none",
  });
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(RENDER_DIR, { recursive: true });

  const [
    backgroundBlob,
    logoDarkBlob,
    logoWhiteBlob,
    coverBlob,
    narrativeBlob,
    lyricBlob,
    dramaticBlob,
    stationBlob,
  ] = await Promise.all([
    loadBytes(BACKGROUND),
    loadBytes(LOGO_DARK),
    loadBytes(LOGO_WHITE),
    loadBytes(path.join(GENERATED, "cover-literary-worlds.png")),
    loadBytes(path.join(GENERATED, "narrative-path.png")),
    loadBytes(path.join(GENERATED, "lyric-voice.png")),
    loadBytes(path.join(GENERATED, "dramatic-stage.png")),
    loadBytes(path.join(GENERATED, "same-event-station.png")),
  ]);

  const deck = Presentation.create({
    slideSize: { width: W, height: H },
  });

  // 01 — Portada
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob, { canvas: false });
    addRect(slide, {
      name: "cover-dark-field",
      x: 48,
      y: 72,
      w: 500,
      h: 520,
      fill: C.navy,
      radius: "rounded-2xl",
    });
    addText(slide, {
      name: "cover-eyebrow",
      x: 82,
      y: 108,
      w: 390,
      h: 24,
      text: "LENGUA Y LITERATURA",
      size: 14,
      color: "#B8C4D9",
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "cover-title",
      x: 80,
      y: 154,
      w: 420,
      h: 250,
      text: "Tipos de\nobras\nliterarias",
      size: 56,
      color: C.white,
      bold: true,
    });
    addText(slide, {
      name: "cover-subtitle",
      x: 82,
      y: 438,
      w: 400,
      h: 78,
      text: "Tres formas de convertir una experiencia en literatura.",
      size: 24,
      color: "#B8C4D9",
    });
    addImage(slide, {
      name: "cover-literary-worlds",
      blob: coverBlob,
      x: 586,
      y: 92,
      w: 622,
      h: 414,
      alt:
        "Libro abierto del que emergen un mundo narrativo, una atmósfera lírica y un escenario teatral",
    });
    ["NARRATIVA", "LÍRICA", "DRAMÁTICA"].forEach((label, index) => {
      addText(slide, {
        name: `cover-genre-${index}`,
        x: 602 + index * 192,
        y: 524,
        w: 170,
        h: 24,
        text: label,
        size: 14,
        color: index === 1 ? C.lavender : C.navy,
        bold: true,
        align: "center",
        wrap: "none",
      });
    });
    addPage(slide, 1, { color: C.navy });
    setNotes(slide, {
      purpose:
        "Presentar la idea de que los géneros literarios cambian la forma de construir una experiencia.",
      talk: [
        "Pregunta inicial sugerida: ¿una misma historia puede convertirse en poema o en teatro?",
      ],
      sourceLines: [
        "- Imagen de portada: generada con IA para uso educativo; dirección de arte propia.",
        `- Referencia conceptual sobre narrativa: ${sources.narrative}`,
        `- Referencia conceptual sobre drama: ${sources.drama}`,
        `- Referencia histórica sobre lo lírico: ${sources.lyric}`,
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
      w: 460,
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
      y: 150,
      w: 900,
      h: 208,
      text: "Una misma experiencia puede\ncontarse, cantarse o representarse.",
      size: 58,
      color: C.white,
      bold: true,
    });
    addText(slide, {
      name: "hook-contar",
      x: 78,
      y: 422,
      w: 230,
      h: 42,
      text: "CONTAR",
      size: 27,
      color: C.blue,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "hook-cantar",
      x: 372,
      y: 422,
      w: 230,
      h: 42,
      text: "CANTAR",
      size: 27,
      color: C.lavender,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "hook-representar",
      x: 666,
      y: 422,
      w: 310,
      h: 42,
      text: "REPRESENTAR",
      size: 27,
      color: C.warm,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "hook-prompt",
      x: 78,
      y: 500,
      w: 790,
      h: 54,
      text: "¿Qué cambia: el tema o la manera de darle forma?",
      size: 23,
      color: "#B8C4D9",
    });
    addPage(slide, 2, { color: C.white, x: 78 });
    setNotes(slide, {
      purpose:
        "Activar el conocimiento previo y separar tema de forma literaria.",
      talk: [
        "Permite dos o tres respuestas espontáneas antes de mostrar la clasificación.",
        "Idea clave: un mismo acontecimiento admite varias formas literarias.",
      ],
      sourceLines: [],
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
      y: 94,
      w: 1010,
      h: 64,
      text: "Tres géneros cambian quién habla y cómo ocurre la acción.",
      size: 43,
      color: C.navy,
      bold: true,
      wrap: "none",
    });

    const items = [
      {
        n: 1,
        x: 72,
        color: C.blue,
        title: "Narrativa",
        role: "Un narrador organiza acontecimientos.",
        clue: "Relato",
      },
      {
        n: 2,
        x: 448,
        color: C.lavender,
        title: "Lírica",
        role: "Una voz poética expresa una vivencia.",
        clue: "Emoción",
      },
      {
        n: 3,
        x: 824,
        color: C.warm,
        title: "Dramática",
        role: "Los personajes actúan y dialogan.",
        clue: "Representación",
      },
    ];
    items.forEach((item) => {
      addEditorialNumber(slide, item.n, item.x, 220, item.color);
      addText(slide, {
        name: `map-title-${item.n}`,
        x: item.x,
        y: 282,
        w: 320,
        h: 50,
        text: item.title,
        size: 35,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
      addRule(slide, {
        name: `map-rule-${item.n}`,
        x: item.x,
        y: 348,
        w: 310,
        h: 3,
        fill: item.color,
      });
      addText(slide, {
        name: `map-role-${item.n}`,
        x: item.x,
        y: 378,
        w: 306,
        h: 76,
        text: item.role,
        size: 21,
        color: C.muted,
      });
      addText(slide, {
        name: `map-clue-${item.n}`,
        x: item.x,
        y: 486,
        w: 300,
        h: 30,
        text: item.clue.toUpperCase(),
        size: 14,
        color: item.color,
        bold: true,
        wrap: "none",
      });
    });
    setNotes(slide, {
      purpose:
        "Presentar una regla inicial de clasificación basada en quién construye el discurso.",
      talk: [
        "Aclara que las obras reales pueden mezclar rasgos; aquí se identifica la forma dominante.",
      ],
      sourceLines: [
        `- Narrativa: ${sources.narrative}`,
        `- Drama: ${sources.drama}`,
        `- Referencia histórica sobre lo lírico: ${sources.lyric}`,
      ],
    });
  }

  // 04 — Narrativa
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 4, "Narrativa", logoDarkBlob);
    addText(slide, {
      name: "narrative-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 62,
      text: "La narrativa convierte los hechos en una secuencia.",
      size: 44,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "narrative-definition",
      x: 72,
      y: 190,
      w: 446,
      h: 74,
      text:
        "Un narrador presenta personajes que actúan en un tiempo y un espacio.",
      size: 24,
      color: C.ink,
      bold: true,
    });
    const features = [
      ["01", "Narrador", "Organiza y cuenta los acontecimientos."],
      ["02", "Personajes", "Desean, deciden y enfrentan conflictos."],
      ["03", "Tiempo y espacio", "Ubican y ordenan la historia."],
    ];
    features.forEach(([number, title, body], index) => {
      const y = 304 + index * 74;
      addText(slide, {
        name: `narrative-number-${index}`,
        x: 72,
        y,
        w: 44,
        h: 28,
        text: number,
        size: 18,
        color: index === 0 ? C.blue : C.muted,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `narrative-feature-${index}`,
        x: 126,
        y,
        w: 170,
        h: 28,
        text: title,
        size: 20,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `narrative-body-${index}`,
        x: 312,
        y,
        w: 212,
        h: 50,
        text: body,
        size: 17,
        color: C.muted,
      });
    });
    addImage(slide, {
      name: "narrative-path-image",
      blob: narrativeBlob,
      x: 574,
      y: 174,
      w: 634,
      h: 338,
      alt:
        "Viajero avanza por un camino hacia una ciudad, metáfora de la secuencia narrativa",
    });
    addText(slide, {
      name: "narrative-forms",
      x: 72,
      y: 555,
      w: 840,
      h: 52,
      text: "FORMAS FRECUENTES   ·   cuento   ·   novela   ·   fábula   ·   leyenda",
      size: 20,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    setNotes(slide, {
      purpose:
        "Explicar que la narrativa se reconoce por la presencia de un narrador y una secuencia de acciones.",
      talk: [
        "Pide al grupo que identifique en la imagen personaje, espacio, tiempo posible y conflicto posible.",
      ],
      sourceLines: [
        `- Definición de narrativa y formas: ${sources.narrative}`,
        "- Imagen narrativa: generada con IA para uso educativo; dirección de arte propia.",
      ],
    });
  }

  // 05 — Lírica
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 5, "Lírica", logoDarkBlob);
    addText(slide, {
      name: "lyric-title",
      x: 72,
      y: 92,
      w: 1040,
      h: 62,
      text: "La lírica convierte una vivencia en voz e imagen.",
      size: 44,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addImage(slide, {
      name: "lyric-voice-image",
      blob: lyricBlob,
      x: 48,
      y: 174,
      w: 704,
      h: 342,
      alt:
        "Voz poética representada como una corriente de tinta, luz y pétalos",
    });
    addText(slide, {
      name: "lyric-definition",
      x: 794,
      y: 188,
      w: 404,
      h: 92,
      text:
        "Una voz poética expresa emociones, percepciones o ideas mediante ritmo e imágenes.",
      size: 24,
      color: C.ink,
      bold: true,
    });
    const lyricFeatures = [
      ["VOZ", "No equivale necesariamente al autor."],
      ["RITMO", "Organiza el sonido y la pausa."],
      ["IMAGEN", "Relaciona realidades para intensificar el sentido."],
    ];
    lyricFeatures.forEach(([label, body], index) => {
      const y = 322 + index * 66;
      addText(slide, {
        name: `lyric-label-${index}`,
        x: 794,
        y,
        w: 92,
        h: 24,
        text: label,
        size: 14,
        color: index === 0 ? C.lavender : C.muted,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `lyric-body-${index}`,
        x: 882,
        y,
        w: 314,
        h: 48,
        text: body,
        size: 17,
        color: C.muted,
      });
    });
    addText(slide, {
      name: "lyric-forms",
      x: 72,
      y: 555,
      w: 840,
      h: 52,
      text: "FORMAS FRECUENTES   ·   poema   ·   oda   ·   elegía   ·   canción",
      size: 20,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    setNotes(slide, {
      purpose:
        "Distinguir la voz poética del autor y reconocer el predominio expresivo de la lírica.",
      talk: [
        "Aclara que la lírica puede escribirse en verso o en prosa y que el rasgo decisivo es su construcción expresiva.",
      ],
      sourceLines: [
        `- Referencia histórica y semántica sobre lo lírico: ${sources.lyric}`,
        "- Imagen lírica: generada con IA para uso educativo; dirección de arte propia.",
      ],
    });
  }

  // 06 — Dramática
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 6, "Dramática", logoDarkBlob);
    addText(slide, {
      name: "dramatic-title",
      x: 72,
      y: 92,
      w: 1080,
      h: 62,
      text: "La obra dramática construye el conflicto en acción.",
      size: 44,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addImage(slide, {
      name: "dramatic-stage-image",
      blob: dramaticBlob,
      x: 48,
      y: 174,
      w: 1160,
      h: 344,
      alt:
        "Dos actores dialogan en tensión sobre un escenario teatral",
    });
    addRect(slide, {
      name: "dramatic-text-field",
      x: 72,
      y: 204,
      w: 446,
      h: 270,
      fill: C.navy,
      radius: "rounded-xl",
    });
    addText(slide, {
      name: "dramatic-definition",
      x: 104,
      y: 234,
      w: 382,
      h: 78,
      text:
        "Los personajes muestran el conflicto mediante diálogo, gesto y acción.",
      size: 24,
      color: C.white,
      bold: true,
    });
    const dramaticFeatures = [
      "Diálogo: hace avanzar la acción.",
      "Acotación: orienta la representación.",
      "Actos y escenas: organizan la obra.",
    ];
    dramaticFeatures.forEach((text, index) => {
      addText(slide, {
        name: `dramatic-feature-${index}`,
        x: 104,
        y: 342 + index * 38,
        w: 360,
        h: 30,
        text: `${String(index + 1).padStart(2, "0")}   ${text}`,
        size: 17,
        color: index === 0 ? C.warm : "#C8D1E2",
        bold: index === 0,
        wrap: "none",
      });
    });
    addText(slide, {
      name: "dramatic-forms",
      x: 72,
      y: 555,
      w: 840,
      h: 52,
      text: "FORMAS FRECUENTES   ·   tragedia   ·   comedia   ·   drama",
      size: 20,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    setNotes(slide, {
      purpose:
        "Reconocer que la obra dramática está escrita para ser representada y que el conflicto se construye en acción.",
      talk: [
        "Invita a leer una línea como narrador y después como personaje para notar la diferencia.",
      ],
      sourceLines: [
        `- Definición de drama como obra escrita para ser representada: ${sources.drama}`,
        "- Imagen dramática: generada con IA para uso educativo; dirección de arte propia.",
      ],
    });
  }

  // 07 — Formas dentro de cada género
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 7, "Clasificación", logoDarkBlob);
    addText(slide, {
      name: "forms-title",
      x: 72,
      y: 92,
      w: 1020,
      h: 62,
      text: "Cada género reúne formas distintas de obra.",
      size: 45,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    const columns = [
      {
        x: 72,
        color: C.blue,
        title: "Narrativa",
        lines: ["Cuento", "Novela", "Fábula", "Leyenda"],
      },
      {
        x: 440,
        color: C.lavender,
        title: "Lírica",
        lines: ["Poema", "Oda", "Elegía", "Canción"],
      },
      {
        x: 808,
        color: C.warm,
        title: "Dramática",
        lines: ["Tragedia", "Comedia", "Drama", "Pieza breve"],
      },
    ];
    columns.forEach((column, columnIndex) => {
      addText(slide, {
        name: `forms-number-${columnIndex}`,
        x: column.x,
        y: 204,
        w: 68,
        h: 52,
        text: String(columnIndex + 1).padStart(2, "0"),
        size: 36,
        color: column.color,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `forms-heading-${columnIndex}`,
        x: column.x,
        y: 272,
        w: 320,
        h: 46,
        text: column.title,
        size: 31,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
      addRule(slide, {
        name: `forms-rule-${columnIndex}`,
        x: column.x,
        y: 330,
        w: 304,
        h: 3,
        fill: column.color,
      });
      column.lines.forEach((line, index) => {
        addText(slide, {
          name: `forms-item-${columnIndex}-${index}`,
          x: column.x,
          y: 360 + index * 42,
          w: 300,
          h: 30,
          text: line,
          size: 21,
          color: index === 0 ? C.ink : C.muted,
          bold: index === 0,
          wrap: "none",
        });
      });
    });
    addText(slide, {
      name: "forms-caveat",
      x: 72,
      y: 552,
      w: 860,
      h: 56,
      text:
        "Las obras pueden mezclar rasgos: clasifica según la forma que domina.",
      size: 22,
      color: C.navy,
      bold: true,
    });
    setNotes(slide, {
      purpose:
        "Relacionar los tres géneros principales con formas frecuentes y evitar tratarlos como categorías absolutamente cerradas.",
      talk: [
        "No presentes la lista como exhaustiva; sirve como mapa inicial de reconocimiento.",
      ],
      sourceLines: [
        `- Formas narrativas mencionadas por la RAE: ${sources.narrative}`,
        `- Drama y género dramático: ${sources.drama}`,
        `- Tradición de formas líricas: ${sources.lyric}`,
      ],
    });
  }

  // 08 — Comparación aplicada
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 8, "Comparación aplicada", logoDarkBlob);
    addText(slide, {
      name: "comparison-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 62,
      text: "El acontecimiento es el mismo; la forma cambia.",
      size: 45,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addImage(slide, {
      name: "same-event-station-image",
      blob: stationBlob,
      x: 48,
      y: 174,
      w: 1160,
      h: 250,
      alt:
        "Dos personas se encuentran bajo la lluvia en una estación, escena común para tres tratamientos literarios",
    });
    const examples = [
      {
        x: 72,
        color: C.blue,
        label: "NARRATIVA",
        text:
          "Al llegar al andén, Elena vio una silueta bajo la lámpara y apretó la carta.",
      },
      {
        x: 456,
        color: C.lavender,
        label: "LÍRICA",
        text:
          "La lluvia escribía despedidas sobre el vidrio de la noche.",
      },
      {
        x: 840,
        color: C.warm,
        label: "DRAMÁTICA",
        text:
          "ELENA.— Llegaste.\nTOMÁS.— No sabía si debía hacerlo.",
      },
    ];
    examples.forEach((example, index) => {
      addText(slide, {
        name: `comparison-label-${index}`,
        x: example.x,
        y: 456,
        w: 320,
        h: 22,
        text: example.label,
        size: 13,
        color: example.color,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `comparison-example-${index}`,
        x: example.x,
        y: 484,
        w: 328,
        h: 66,
        text: example.text,
        size: 18,
        color: C.ink,
        italic: index === 1,
      });
    });
    setNotes(slide, {
      purpose:
        "Demostrar con un mismo acontecimiento cómo cambian la voz, la organización y el modo de presentar la acción.",
      talk: [
        "Pide al grupo que señale la evidencia concreta de cada clasificación.",
      ],
      sourceLines: [
        "- Imagen comparativa: generada con IA para uso educativo; dirección de arte propia.",
      ],
    });
  }

  // 09 — Ruptura editorial
  {
    const slide = deck.slides.add();
    slide.background.fill = C.lavender;
    addLogo(slide, logoWhiteBlob, { name: "logo-9" });
    addText(slide, {
      name: "break-eyebrow",
      x: 78,
      y: 74,
      w: 440,
      h: 24,
      text: "PAUSA LITERARIA",
      size: 14,
      color: C.white,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "break-title",
      x: 76,
      y: 164,
      w: 880,
      h: 210,
      text: "La literatura no cambia el mundo:\ncambia la forma de mirarlo.",
      size: 59,
      color: C.white,
      bold: true,
    });
    addText(slide, {
      name: "break-subtitle",
      x: 80,
      y: 428,
      w: 770,
      h: 66,
      text:
        "Una misma lluvia puede ser acción, emoción o conflicto.",
      size: 27,
      color: C.navy,
      bold: true,
    });
    addPage(slide, 9, { color: C.white, x: 80 });
    setNotes(slide, {
      purpose:
        "Romper el ritmo y fijar la idea de que el género transforma la mirada sobre un mismo tema.",
      talk: [
        "La frase es de elaboración didáctica propia; no presentarla como cita de autor.",
      ],
      sourceLines: [],
    });
  }

  // 10 — Práctica
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 10, "Práctica autónoma", logoDarkBlob);
    addText(slide, {
      name: "practice-title",
      x: 72,
      y: 92,
      w: 1080,
      h: 62,
      text: "Reconoce el género por una evidencia del texto.",
      size: 43,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "practice-instruction",
      x: 72,
      y: 158,
      w: 860,
      h: 34,
      text:
        "Clasifica cada fragmento y justifica tu respuesta con una característica.",
      size: 21,
      color: C.muted,
    });
    const prompts = [
      "El río desbordó el puente y el pueblo quedó aislado hasta el amanecer.",
      "Mi voz busca una casa en el eco de tu nombre.",
      "MARTA.— Cierra la puerta.   JULIÁN.— Primero dime la verdad.",
      "La tortuga prometió no volver a burlarse del colibrí.",
    ];
    prompts.forEach((text, index) => {
      const y = 224 + index * 82;
      const width = index === 3 ? 850 : 1120;
      addText(slide, {
        name: `practice-number-${index}`,
        x: 72,
        y,
        w: 54,
        h: 36,
        text: String(index + 1).padStart(2, "0"),
        size: 23,
        color:
          index === 0
            ? C.blue
            : index === 1
              ? C.lavender
              : index === 2
                ? C.warm
                : C.muted,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `practice-prompt-${index}`,
        x: 136,
        y,
        w: width - 64,
        h: 48,
        text,
        size: 21,
        color: C.ink,
        italic: index === 1,
      });
      addRule(slide, {
        name: `practice-rule-${index}`,
        x: 136,
        y: y + 52,
        w: width - 70,
        fill: C.line,
      });
    });
    setNotes(slide, {
      purpose:
        "Comprobar que el estudiante clasifica por evidencia textual y no solo por intuición.",
      talk: [
        "Solicita que cada respuesta incluya una prueba: narrador, voz poética o diálogo escénico.",
      ],
      teacherKey: [
        "Clave docente:",
        "1. Narrativa: un narrador presenta un acontecimiento y su consecuencia.",
        "2. Lírica: predomina una voz expresiva y una imagen metafórica.",
        "3. Dramática: intervienen personajes mediante diálogo directo.",
        "4. Narrativa: un narrador cuenta la acción de personajes; puede desarrollarse como fábula.",
      ],
      sourceLines: [],
    });
  }

  // 11 — Síntesis y cierre
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 11, "Síntesis", logoDarkBlob);
    addText(slide, {
      name: "synthesis-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 62,
      text: "Para clasificar, pregunta quién habla y cómo actúa.",
      size: 44,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    const questions = [
      {
        x: 72,
        n: "01",
        color: C.blue,
        question: "¿Un narrador organiza acontecimientos?",
        answer: "NARRATIVA",
      },
      {
        x: 448,
        n: "02",
        color: C.lavender,
        question: "¿Domina una voz poética y expresiva?",
        answer: "LÍRICA",
      },
      {
        x: 824,
        n: "03",
        color: C.warm,
        question: "¿Los personajes construyen la acción?",
        answer: "DRAMÁTICA",
      },
    ];
    questions.forEach((item, index) => {
      addText(slide, {
        name: `synthesis-number-${index}`,
        x: item.x,
        y: 224,
        w: 58,
        h: 44,
        text: item.n,
        size: 28,
        color: item.color,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `synthesis-question-${index}`,
        x: item.x,
        y: 294,
        w: 310,
        h: 94,
        text: item.question,
        size: 24,
        color: C.ink,
        bold: true,
      });
      addText(slide, {
        name: `synthesis-answer-${index}`,
        x: item.x,
        y: 430,
        w: 300,
        h: 34,
        text: item.answer,
        size: 17,
        color: item.color,
        bold: true,
        wrap: "none",
      });
    });
    addText(slide, {
      name: "synthesis-final",
      x: 72,
      y: 548,
      w: 850,
      h: 70,
      text:
        "No memorices solo el nombre: encuentra la evidencia que sostiene la clasificación.",
      size: 25,
      color: C.navy,
      bold: true,
    });
    setNotes(slide, {
      purpose:
        "Cerrar con una regla de decisión que el estudiante pueda aplicar en textos nuevos.",
      talk: [
        "Vuelve a la pregunta inicial: el tema puede mantenerse, pero cambia la forma de construirlo.",
      ],
      sourceLines: [
        `- Narrativa: ${sources.narrative}`,
        `- Drama: ${sources.drama}`,
        `- Referencia histórica sobre lo lírico: ${sources.lyric}`,
      ],
    });
  }

  const inspect = await deck.inspect({
    kind: "slide,textbox,shape,image,notes",
    maxChars: 300000,
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

  const montage = await deck.export({
    format: "png",
    montage: true,
    scale: 1,
  });
  await fs.writeFile(
    path.join(
      OUTPUT_DIR,
      "Clase_Literatura_Tipos_de_Obras_Literarias_V1_MONTAGE.png",
    ),
    new Uint8Array(await montage.arrayBuffer()),
  );

  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save(FINAL_PPTX);

  console.log(`slides=${deck.slides.items.length}`);
  console.log(`camera_safe=${JSON.stringify(CAMERA_SAFE)}`);
  console.log(`pptx=${FINAL_PPTX}`);
  console.log(`renders=${RENDER_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
