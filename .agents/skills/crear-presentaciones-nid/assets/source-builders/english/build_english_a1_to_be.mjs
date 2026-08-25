import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const ROOT =
  "/Users/afnaranjo/.codex/visualizations/2026/07/30/019fb321-1c1a-7602-b685-17e74fdfa316";
const BUILD_DIR = path.join(ROOT, "tmp/english-a1-to-be");
const ASSETS = path.join(BUILD_DIR, "assets");
const OUTPUT_DIR = path.join(ROOT, "output");
const FINAL_PPTX = path.join(
  OUTPUT_DIR,
  "Clase_Ingles_A1_Verbo_To_Be_NID_V1_PROFESIONAL.pptx",
);
const RENDER_DIR = path.join(
  OUTPUT_DIR,
  "Clase_Ingles_A1_Verbo_To_Be_NID_V1",
);
const MONTAGE = path.join(
  OUTPUT_DIR,
  "Clase_Ingles_A1_Verbo_To_Be_NID_V1_MONTAGE.png",
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
};

const sources = {
  britishCouncil:
    "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple-be",
  cambridge:
    "https://dictionary.cambridge.org/grammar/british-grammar/be-",
  userBrand:
    "/Users/afnaranjo/Downloads/741258318_1693788871945555_5418664141547494390_n.jpeg",
  cover:
    "Imagen generada con IA para uso educativo: clase inicial de inglés con estudiantes latinoamericanos.",
  meaning:
    "Imagen generada con IA para uso educativo: estudiantes en una clase de idiomas.",
  dialogue:
    "Imagen generada con IA para uso educativo: dos estudiantes conversando.",
  emma:
    "Imagen generada con IA para uso educativo: estudiante universitaria ficticia.",
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
    w: 720,
    h: 20,
    text: `ENGLISH A1   ·   VERB TO BE   ·   ${phase.toUpperCase()}`,
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

function setNotes(
  slide,
  { purpose, talk = [], sourceLines = [], teacherKey = [] },
) {
  const lines = [
    `Propósito docente: ${purpose}`,
    ...talk,
    ...teacherKey,
    "[Sources]",
    `- Identidad visual y logotipo: ${sources.userBrand}`,
    ...sourceLines.map((line) => `- ${line}`),
    "- Ejemplos, secuencia y ejercicios: elaboración didáctica propia.",
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
    h: 56,
    text: question,
    size: 19,
    color: C.navy,
    bold: true,
  });
  addText(slide, {
    name: `q${idx}-options`,
    x: x + 62,
    y: y + 78,
    w: w - 82,
    h: h - 92,
    text: options,
    size: 16,
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
    meaningBlob,
    dialogueBlob,
    emmaBlob,
  ] = await Promise.all([
    loadBytes(BACKGROUND),
    loadBytes(LOGO_DARK),
    loadBytes(LOGO_WHITE),
    loadBytes(path.join(ASSETS, "cover-classroom.png")),
    loadBytes(path.join(ASSETS, "meaning-classroom.png")),
    loadBytes(path.join(ASSETS, "dialogue.png")),
    loadBytes(path.join(ASSETS, "emma-profile.png")),
  ]);

  const deck = Presentation.create({ slideSize: { width: W, height: H } });

  // 01 — Portada
  {
    const slide = deck.slides.add();
    addImage(slide, {
      name: "cover-photo",
      blob: coverBlob,
      x: 0,
      y: 0,
      w: W,
      h: H,
      alt:
        "Estudiantes latinoamericanos se presentan en una clase inicial de inglés",
    });
    addRect(slide, {
      name: "cover-dark-field",
      x: 0,
      y: 0,
      w: 618,
      h: H,
      fill: "#091127DE",
      radius: null,
    });
    addImage(slide, {
      name: "garment-logo-cover",
      blob: logoWhiteBlob,
      x: 804,
      y: 402,
      w: 34,
      h: 15,
      alt: "Logotipo NID aplicado de forma sutil sobre la prenda",
      fit: "contain",
    });
    addLogo(slide, logoWhiteBlob, {
      name: "logo-1",
      x: 78,
      y: 56,
      w: 82,
      h: 36,
    });
    addText(slide, {
      name: "cover-eyebrow",
      x: 78,
      y: 126,
      w: 410,
      h: 24,
      text: "ENGLISH A1 · FIRST CONNECTION",
      size: 14,
      color: "#B8C4D9",
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "cover-title",
      x: 76,
      y: 180,
      w: 470,
      h: 170,
      text: "The verb\nto be",
      size: 64,
      color: C.white,
      bold: true,
    });
    addText(slide, {
      name: "cover-subtitle",
      x: 78,
      y: 398,
      w: 450,
      h: 72,
      text: "I am · You are · She is\nHabla de ti desde la primera clase.",
      size: 23,
      color: "#C7D2E5",
    });
    addPill(slide, {
      name: "cover-tag",
      x: 78,
      y: 530,
      w: 170,
      text: "BEGINNER · A1",
      fill: C.blue,
      color: C.white,
      size: 13,
    });
    addPage(slide, 1, { color: C.white, x: 78 });
    setNotes(slide, {
      purpose:
        "Presentar el verbo to be como la herramienta básica para hablar de identidad, edad, estado y ubicación.",
      talk: [
        "Pregunta inicial: ¿qué tres frases simples usarías para presentarte en inglés?",
      ],
      sourceLines: [
        `Gramática A1: ${sources.britishCouncil}`,
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
      name: "hook-label",
      x: 78,
      y: 72,
      w: 390,
      h: 24,
      text: "YOUR FIRST THREE SENTENCES",
      size: 14,
      color: C.cyan,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "hook-title",
      x: 76,
      y: 148,
      w: 940,
      h: 220,
      text: "I am Alex.\nYou are ready.\nWe are in class.",
      size: 58,
      color: C.white,
      bold: true,
    });
    addText(slide, {
      name: "hook-question",
      x: 78,
      y: 470,
      w: 780,
      h: 62,
      text: "What changes: the subject or the form of to be?",
      size: 26,
      color: "#BAC7DD",
      bold: true,
    });
    addText(slide, {
      name: "hook-spanish",
      x: 78,
      y: 548,
      w: 760,
      h: 34,
      text: "Observa primero. La regla aparecerá en la siguiente diapositiva.",
      size: 17,
      color: "#8190AA",
    });
    addPage(slide, 2, { color: C.white, x: 78 });
    setNotes(slide, {
      purpose:
        "Activar la observación de las formas am, are y are antes de presentar la regla.",
      talk: [
        "Lee las tres frases en voz alta y pide al grupo identificar la palabra que cambia.",
      ],
      sourceLines: [`Gramática A1: ${sources.britishCouncil}`],
    });
  }

  // 03 — Significado
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 3, "Meaning", logoDarkBlob);
    addText(slide, {
      name: "meaning-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 64,
      text: "To be conecta una persona con información.",
      size: 43,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addRect(slide, {
      name: "meaning-image-frame",
      x: 72,
      y: 180,
      w: 648,
      h: 386,
      fill: C.white,
      radius: "rounded-xl",
      line: C.line,
    });
    addImage(slide, {
      name: "meaning-classroom-photo",
      blob: meaningBlob,
      x: 88,
      y: 196,
      w: 616,
      h: 354,
      alt:
        "Cuatro estudiantes en una clase, útiles para practicar identidad, estado y ubicación",
    });
    addImage(slide, {
      name: "garment-logo-meaning",
      blob: logoDarkBlob,
      x: 202,
      y: 326,
      w: 26,
      h: 12,
      alt: "Logotipo NID aplicado de forma sutil sobre la camiseta",
      fit: "contain",
    });
    addText(slide, {
      name: "meaning-lead",
      x: 760,
      y: 188,
      w: 410,
      h: 52,
      text: "Úsalo para decir…",
      size: 27,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    const uses = [
      ["01", "Identidad", "I am a student.", C.blue],
      ["02", "Edad", "She is 18 years old.", C.lavender],
      ["03", "Estado", "He is happy.", C.cyan],
      ["04", "Ubicación", "We are in class.", C.coral],
    ];
    uses.forEach(([n, label, example, color], index) => {
      const y = 258 + index * 72;
      addText(slide, {
        name: `meaning-number-${index}`,
        x: 760,
        y,
        w: 42,
        h: 24,
        text: n,
        size: 15,
        color,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `meaning-label-${index}`,
        x: 812,
        y,
        w: 128,
        h: 24,
        text: label.toUpperCase(),
        size: 13,
        color,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `meaning-example-${index}`,
        x: 936,
        y: y - 2,
        w: 224,
        h: 30,
        text: example,
        size: 18,
        color: C.ink,
        bold: true,
      });
      if (index < uses.length - 1) {
        addRule(slide, {
          name: `meaning-rule-${index}`,
          x: 760,
          y: y + 42,
          w: 400,
        });
      }
    });
    setNotes(slide, {
      purpose:
        "Dar significado funcional al verbo antes de memorizar sus formas.",
      talk: [
        "Haz que los estudiantes relacionen cada ejemplo con una persona visible en la fotografía.",
      ],
      sourceLines: [
        `Usos del verbo be: ${sources.cambridge}`,
        sources.meaning,
      ],
    });
  }

  // 04 — Formas
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 4, "The rule", logoDarkBlob);
    addText(slide, {
      name: "forms-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 64,
      text: "El sujeto decide entre am, is y are.",
      size: 44,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    const groups = [
      {
        x: 72,
        color: C.blue,
        pale: C.paleBlue,
        subject: "I",
        form: "am",
        example: "I am ready.",
      },
      {
        x: 456,
        color: C.lavender,
        pale: C.paleLavender,
        subject: "he · she · it",
        form: "is",
        example: "She is happy.",
      },
      {
        x: 840,
        color: C.cyan,
        pale: C.paleCyan,
        subject: "you · we · they",
        form: "are",
        example: "They are friends.",
      },
    ];
    groups.forEach((group, index) => {
      addText(slide, {
        name: `form-subject-${index}`,
        x: group.x,
        y: 206,
        w: 336,
        h: 46,
        text: group.subject.toUpperCase(),
        size: 20,
        color: group.color,
        bold: true,
        align: "center",
        wrap: "none",
      });
      addRect(slide, {
        name: `form-field-${index}`,
        x: group.x,
        y: 274,
        w: 336,
        h: 164,
        fill: group.pale,
        radius: "rounded-2xl",
      });
      addText(slide, {
        name: `form-word-${index}`,
        x: group.x + 18,
        y: 304,
        w: 300,
        h: 102,
        text: group.form,
        size: 72,
        color: group.color,
        bold: true,
        align: "center",
        valign: "middle",
        wrap: "none",
      });
      addText(slide, {
        name: `form-example-${index}`,
        x: group.x,
        y: 478,
        w: 336,
        h: 42,
        text: group.example,
        size: 22,
        color: C.navy,
        bold: true,
        align: "center",
        wrap: "none",
      });
    });
    addText(slide, {
      name: "forms-memory",
      x: 72,
      y: 574,
      w: 820,
      h: 42,
      text: "Memory trick: I am · one person is · you and groups are.",
      size: 21,
      color: C.navy,
      bold: true,
    });
    setNotes(slide, {
      purpose:
        "Organizar las formas del presente de be por grupo de pronombres.",
      talk: [
        "Recita las tres asociaciones y pide respuesta coral: I—am; he/she/it—is; you/we/they—are.",
      ],
      sourceLines: [`Tabla de formas: ${sources.britishCouncil}`],
    });
  }

  // 05 — Afirmativo
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 5, "Affirmative", logoDarkBlob);
    addText(slide, {
      name: "affirmative-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 64,
      text: "La oración afirmativa mantiene un orden fijo.",
      size: 43,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "affirmative-formula",
      x: 72,
      y: 196,
      w: 920,
      h: 68,
      text: "SUBJECT   +   AM / IS / ARE   +   INFORMATION",
      size: 28,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    const examples = [
      {
        y: 304,
        number: 1,
        color: C.blue,
        subject: "I",
        form: "am",
        complement: "a student.",
        clue: "IDENTITY",
      },
      {
        y: 394,
        number: 2,
        color: C.lavender,
        subject: "She",
        form: "is",
        complement: "from Ecuador.",
        clue: "ORIGIN",
      },
      {
        y: 484,
        number: 3,
        color: C.cyan,
        subject: "They",
        form: "are",
        complement: "at home.",
        clue: "LOCATION",
      },
    ];
    examples.forEach((example) => {
      addNumber(slide, example.number, 72, example.y, example.color);
      addText(slide, {
        name: `affirm-subject-${example.number}`,
        x: 146,
        y: example.y,
        w: 120,
        h: 42,
        text: example.subject,
        size: 27,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `affirm-form-${example.number}`,
        x: 282,
        y: example.y,
        w: 110,
        h: 42,
        text: example.form,
        size: 27,
        color: example.color,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `affirm-complement-${example.number}`,
        x: 408,
        y: example.y,
        w: 420,
        h: 42,
        text: example.complement,
        size: 27,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `affirm-clue-${example.number}`,
        x: 856,
        y: example.y + 5,
        w: 200,
        h: 26,
        text: example.clue,
        size: 13,
        color: example.color,
        bold: true,
        wrap: "none",
      });
      addRule(slide, {
        name: `affirm-rule-${example.number}`,
        x: 146,
        y: example.y + 54,
        w: 850,
      });
    });
    setNotes(slide, {
      purpose:
        "Modelar la estructura afirmativa con color funcional y tres usos frecuentes.",
      talk: [
        "Señala que una profesión singular necesita artículo: I am a student.",
      ],
      sourceLines: [
        `Afirmativas y usos: ${sources.britishCouncil}`,
        `Profesiones y origen con be: ${sources.cambridge}`,
      ],
    });
  }

  // 06 — Contracciones
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 6, "Contractions", logoDarkBlob);
    addText(slide, {
      name: "contractions-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 64,
      text: "Al hablar, las formas se vuelven más cortas.",
      size: 43,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "contractions-lead",
      x: 72,
      y: 178,
      w: 760,
      h: 42,
      text: "El apóstrofo reemplaza letras; el significado no cambia.",
      size: 23,
      color: C.muted,
    });
    const left = [
      ["I am", "I'm", C.blue],
      ["You are", "You're", C.lavender],
      ["He is", "He's", C.cyan],
      ["She is", "She's", C.coral],
    ];
    const right = [
      ["It is", "It's", C.blue],
      ["We are", "We're", C.lavender],
      ["They are", "They're", C.cyan],
    ];
    const addPair = (pair, x, y, index) => {
      const [full, short, color] = pair;
      addText(slide, {
        name: `contract-full-${x}-${index}`,
        x,
        y,
        w: 190,
        h: 42,
        text: full,
        size: 24,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `contract-arrow-${x}-${index}`,
        x: x + 196,
        y: y + 2,
        w: 54,
        h: 36,
        text: "→",
        size: 25,
        color: C.muted,
        bold: true,
        align: "center",
        wrap: "none",
      });
      addText(slide, {
        name: `contract-short-${x}-${index}`,
        x: x + 266,
        y,
        w: 190,
        h: 42,
        text: short,
        size: 25,
        color,
        bold: true,
        wrap: "none",
      });
      addRule(slide, {
        name: `contract-rule-${x}-${index}`,
        x,
        y: y + 48,
        w: 456,
      });
    };
    left.forEach((pair, index) => addPair(pair, 72, 258 + index * 70, index));
    right.forEach((pair, index) => addPair(pair, 654, 258 + index * 70, index));
    addText(slide, {
      name: "contractions-example",
      x: 654,
      y: 474,
      w: 458,
      h: 76,
      text: "I am a student.\nI'm a student.",
      size: 25,
      color: C.navy,
      bold: true,
    });
    addText(slide, {
      name: "contractions-note",
      x: 654,
      y: 584,
      w: 300,
      h: 22,
      text: "MORE NATURAL IN SPEAKING",
      size: 13,
      color: C.blue,
      bold: true,
      wrap: "none",
    });
    setNotes(slide, {
      purpose:
        "Introducir las contracciones más comunes para comprensión y producción oral.",
      talk: [
        "Lee cada par de forma lenta y después natural; el estudiante repite la forma corta.",
      ],
      sourceLines: [`Contracciones: ${sources.britishCouncil}`],
    });
  }

  // 07 — Negativo
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 7, "Negative", logoDarkBlob);
    addText(slide, {
      name: "negative-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 64,
      text: "Para negar, coloca not después de to be.",
      size: 43,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "negative-formula",
      x: 72,
      y: 184,
      w: 860,
      h: 52,
      text: "SUBJECT   +   AM / IS / ARE   +   NOT   +   INFORMATION",
      size: 26,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    const negatives = [
      {
        y: 286,
        color: C.blue,
        full: "I am not tired.",
        short: "I'm not tired.",
      },
      {
        y: 382,
        color: C.lavender,
        full: "She is not at home.",
        short: "She isn't at home. / She's not at home.",
      },
      {
        y: 478,
        color: C.cyan,
        full: "They are not late.",
        short: "They aren't late. / They're not late.",
      },
    ];
    negatives.forEach((item, index) => {
      addNumber(slide, index + 1, 72, item.y, item.color);
      addText(slide, {
        name: `negative-full-${index}`,
        x: 144,
        y: item.y,
        w: 380,
        h: 36,
        text: item.full,
        size: 24,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `negative-short-${index}`,
        x: 548,
        y: item.y,
        w: 590,
        h: 38,
        text: item.short,
        size: 22,
        color: item.color,
        bold: true,
      });
      addRule(slide, {
        name: `negative-rule-${index}`,
        x: 144,
        y: item.y + 54,
        w: 904,
      });
    });
    addPill(slide, {
      name: "negative-wrong",
      x: 72,
      y: 586,
      w: 210,
      h: 32,
      text: "✕  I amn't",
      fill: C.paleCoral,
      color: C.coral,
      size: 15,
    });
    addText(slide, {
      name: "negative-correct",
      x: 304,
      y: 590,
      w: 380,
      h: 24,
      text: "Use: I'm not.",
      size: 17,
      color: C.green,
      bold: true,
      wrap: "none",
    });
    setNotes(slide, {
      purpose:
        "Formar negativas completas y contraídas sin producir la forma incorrecta amn't.",
      talk: [
        "Contrasta explícitamente I'm not con isn't y aren't.",
      ],
      sourceLines: [`Negativas y contracciones: ${sources.britishCouncil}`],
    });
  }

  // 08 — Preguntas y respuestas cortas
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 8, "Questions", logoDarkBlob);
    addText(slide, {
      name: "questions-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 64,
      text: "Para preguntar, mueve to be al inicio.",
      size: 44,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addRect(slide, {
      name: "dialogue-frame",
      x: 72,
      y: 180,
      w: 1108,
      h: 362,
      fill: C.white,
      radius: "rounded-xl",
      line: C.line,
    });
    addImage(slide, {
      name: "dialogue-photo",
      blob: dialogueBlob,
      x: 88,
      y: 196,
      w: 1076,
      h: 330,
      alt: "Dos estudiantes conversan en un campus",
    });
    addImage(slide, {
      name: "garment-logo-dialogue",
      blob: logoDarkBlob,
      x: 300,
      y: 389,
      w: 28,
      h: 13,
      alt: "Logotipo NID aplicado de forma sutil sobre el suéter",
      fit: "contain",
    });
    addRect(slide, {
      name: "dialogue-question-bubble",
      x: 756,
      y: 218,
      w: 356,
      h: 84,
      fill: C.navy,
      radius: "rounded-2xl",
    });
    addText(slide, {
      name: "dialogue-question",
      x: 780,
      y: 242,
      w: 308,
      h: 42,
      text: "Are you a student?",
      size: 25,
      color: C.white,
      bold: true,
      align: "center",
      valign: "middle",
      wrap: "none",
    });
    addRect(slide, {
      name: "dialogue-answer-bubble",
      x: 812,
      y: 326,
      w: 300,
      h: 72,
      fill: C.paleBlue,
      radius: "rounded-2xl",
    });
    addText(slide, {
      name: "dialogue-answer",
      x: 832,
      y: 346,
      w: 260,
      h: 34,
      text: "Yes, I am.",
      size: 24,
      color: C.blue,
      bold: true,
      align: "center",
      valign: "middle",
      wrap: "none",
    });
    addText(slide, {
      name: "questions-structure",
      x: 72,
      y: 578,
      w: 750,
      h: 34,
      text: "AM / IS / ARE   +   SUBJECT   +   INFORMATION   ?",
      size: 21,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "questions-warning",
      x: 72,
      y: 618,
      w: 820,
      h: 24,
      text: "Short answer: Yes, I am.  —  No, I'm not.   Never: Yes, I'm.",
      size: 16,
      color: C.coral,
      bold: true,
      wrap: "none",
    });
    setNotes(slide, {
      purpose:
        "Modelar inversión en preguntas y respuestas cortas naturales.",
      talk: [
        "Convierte oralmente I am a student en Are you a student?",
        "Resalta que las respuestas afirmativas cortas no contraen el verbo.",
      ],
      sourceLines: [
        `Preguntas y respuestas cortas: ${sources.britishCouncil}`,
        sources.dialogue,
      ],
    });
  }

  // 09 — Caso resuelto
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 9, "Worked example", logoDarkBlob);
    addText(slide, {
      name: "emma-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 64,
      text: "Con cinco datos puedes construir una presentación completa.",
      size: 41,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "emma-label",
      x: 72,
      y: 178,
      w: 260,
      h: 24,
      text: "MEET EMMA · FICTIONAL PROFILE",
      size: 13,
      color: C.blue,
      bold: true,
      wrap: "none",
    });
    const profile = [
      ["Name", "Emma"],
      ["Age", "19"],
      ["Country", "Ecuador"],
      ["Role", "student"],
      ["Feeling", "happy"],
    ];
    profile.forEach(([label, value], index) => {
      const y = 224 + index * 50;
      addText(slide, {
        name: `emma-profile-label-${index}`,
        x: 72,
        y,
        w: 110,
        h: 26,
        text: label.toUpperCase(),
        size: 12,
        color: C.muted,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `emma-profile-value-${index}`,
        x: 188,
        y: y - 2,
        w: 170,
        h: 30,
        text: value,
        size: 19,
        color: index === 0 ? C.blue : C.ink,
        bold: true,
        wrap: "none",
      });
    });
    addRule(slide, { name: "emma-divider", x: 382, y: 208, w: 1, h: 310 });
    const sentences = [
      "She is Emma.",
      "She is 19 years old.",
      "She is Ecuadorian.",
      "She is a student.",
      "She is happy.",
    ];
    sentences.forEach((sentence, index) => {
      addNumber(slide, index + 1, 418, 222 + index * 58, index === 0 ? C.blue : C.muted);
      addText(slide, {
        name: `emma-sentence-${index}`,
        x: 480,
        y: 222 + index * 58,
        w: 280,
        h: 34,
        text: sentence,
        size: 21,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
    });
    addRect(slide, {
      name: "emma-question-field",
      x: 418,
      y: 526,
      w: 342,
      h: 92,
      fill: C.navy,
      radius: "rounded-xl",
    });
    addText(slide, {
      name: "emma-question",
      x: 438,
      y: 544,
      w: 302,
      h: 56,
      text: "Is she a student?\nYes, she is.",
      size: 20,
      color: C.white,
      bold: true,
      align: "center",
      valign: "middle",
    });
    addRect(slide, {
      name: "emma-image-frame",
      x: 800,
      y: 180,
      w: 380,
      h: 360,
      fill: C.white,
      radius: "rounded-xl",
      line: C.line,
    });
    addImage(slide, {
      name: "emma-photo",
      blob: emmaBlob,
      x: 816,
      y: 196,
      w: 348,
      h: 328,
      alt: "Retrato de Emma, estudiante ficticia para el ejercicio",
    });
    addImage(slide, {
      name: "garment-logo-emma",
      blob: logoDarkBlob,
      x: 1108,
      y: 389,
      w: 26,
      h: 12,
      alt: "Logotipo NID aplicado de forma sutil sobre la camisa",
      fit: "contain",
    });
    setNotes(slide, {
      purpose:
        "Integrar tercera persona, edad, nacionalidad, profesión, estado y pregunta corta.",
      talk: [
        "Pide convertir una de las oraciones en negativa y otra en pregunta.",
      ],
      sourceLines: [
        `Usos del verbo be: ${sources.cambridge}`,
        sources.emma,
      ],
    });
  }

  // 10 — Disruptiva
  {
    const slide = deck.slides.add();
    slide.background.fill = C.navy;
    addLogo(slide, logoWhiteBlob, { name: "logo-10" });
    addText(slide, {
      name: "age-label",
      x: 80,
      y: 78,
      w: 300,
      h: 24,
      text: "COMMON SPANISH-SPEAKER ERROR",
      size: 14,
      color: C.cyan,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "age-wrong",
      x: 80,
      y: 170,
      w: 800,
      h: 74,
      text: "✕  I have 18 years.",
      size: 48,
      color: "#8190AA",
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "age-correct",
      x: 78,
      y: 286,
      w: 980,
      h: 88,
      text: "✓  I am 18 years old.",
      size: 58,
      color: C.white,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "age-rule",
      x: 80,
      y: 438,
      w: 780,
      h: 52,
      text: "In English, age uses the verb to be.",
      size: 29,
      color: C.cyan,
      bold: true,
      wrap: "none",
    });
    addText(slide, {
      name: "age-prompt",
      x: 80,
      y: 548,
      w: 780,
      h: 36,
      text: "Say it now: I am ___ years old.",
      size: 23,
      color: "#BAC7DD",
      bold: true,
      wrap: "none",
    });
    addPage(slide, 10, { color: C.white, x: 80 });
    setNotes(slide, {
      purpose:
        "Corregir una interferencia frecuente del español y convertirla en una frase personal.",
      talk: [
        "Haz que cada estudiante diga su edad usando I am.",
      ],
      sourceLines: [`Uso de be para la edad: ${sources.cambridge}`],
    });
  }

  // 11 — Práctica guiada
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 11, "Guided practice", logoDarkBlob);
    addText(slide, {
      name: "guided-title",
      x: 72,
      y: 92,
      w: 1000,
      h: 58,
      text: "Completa primero; después comprueba la respuesta.",
      size: 40,
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
      question: "I ___ a student.",
      options: "A  am       B  is\nC  are      D  be",
      answer: "A",
      accent: C.blue,
    });
    addQuestionCard(slide, {
      idx: 2,
      x: 640,
      y: 176,
      w: 544,
      h: 190,
      question: "She ___ from Ecuador.",
      options: "A  am       B  is\nC  are      D  be",
      answer: "B",
      accent: C.lavender,
    });
    addQuestionCard(slide, {
      idx: 3,
      x: 72,
      y: 390,
      w: 544,
      h: 206,
      question: "They ___ tired.",
      options: "A  am       B  is\nC  are      D  be",
      answer: "C",
      accent: C.cyan,
    });
    addQuestionCard(slide, {
      idx: 4,
      x: 640,
      y: 390,
      w: 544,
      h: 166,
      question: "___ you ready?",
      options: "A  Am       B  Is\nC  Are      D  Be",
      answer: "C",
      accent: C.coral,
    });
    setNotes(slide, {
      purpose:
        "Comprobar la asociación pronombre-forma y la inversión en una pregunta.",
      talk: [
        "Pide justificar cada respuesta nombrando el sujeto.",
      ],
      teacherKey: ["Clave docente: 1-A; 2-B; 3-C; 4-C."],
      sourceLines: [`Formas del presente: ${sources.britishCouncil}`],
    });
  }

  // 12 — Práctica autónoma
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 12, "Independent practice", logoDarkBlob);
    addText(slide, {
      name: "independent-title",
      x: 72,
      y: 92,
      w: 1000,
      h: 58,
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
      question: "He ___ my friend.",
      options: "A  am       B  is\nC  are      D  be",
      accent: C.blue,
    });
    addQuestionCard(slide, {
      idx: 2,
      x: 640,
      y: 174,
      w: 544,
      h: 194,
      question: "We ___ not late.",
      options: "A  am       B  is\nC  are      D  be",
      accent: C.lavender,
    });
    addQuestionCard(slide, {
      idx: 3,
      x: 72,
      y: 394,
      w: 544,
      h: 198,
      question: "___ she 20 years old?",
      options: "A  Am       B  Is\nC  Are      D  Be",
      accent: C.cyan,
    });
    addQuestionCard(slide, {
      idx: 4,
      x: 640,
      y: 394,
      w: 544,
      h: 156,
      question: "Which sentence is correct?",
      options:
        "A  I have 18 years.     B  I am 18 years old.\nC  I is 18.              D  I are 18.",
      accent: C.coral,
    });
    setNotes(slide, {
      purpose:
        "Aplicar afirmativo, negativo, pregunta y uso correcto de la edad sin apoyo visual.",
      talk: [
        "Da cuatro minutos y revisa las razones, no solo las letras.",
      ],
      teacherKey: [
        "Clave docente: 1-B; 2-C; 3-B; 4-B.",
      ],
      sourceLines: [
        `Gramática A1: ${sources.britishCouncil}`,
        `Edad con be: ${sources.cambridge}`,
      ],
    });
  }

  // 13 — Cierre
  {
    const slide = deck.slides.add();
    addBase(slide, backgroundBlob);
    addHeader(slide, 13, "Speak now", logoDarkBlob);
    addText(slide, {
      name: "close-title",
      x: 72,
      y: 92,
      w: 1050,
      h: 64,
      text: "Elige el sujeto, elige la forma y termina la idea.",
      size: 42,
      color: C.navy,
      bold: true,
      wrap: "none",
    });
    const steps = [
      {
        x: 72,
        n: "01",
        color: C.blue,
        title: "Subject",
        body: "I · he · she · it\nyou · we · they",
      },
      {
        x: 414,
        n: "02",
        color: C.lavender,
        title: "To be",
        body: "am · is · are",
      },
      {
        x: 756,
        n: "03",
        color: C.cyan,
        title: "Information",
        body: "name · age · state\norigin · location",
      },
    ];
    steps.forEach((step, index) => {
      addText(slide, {
        name: `close-number-${index}`,
        x: step.x,
        y: 208,
        w: 60,
        h: 34,
        text: step.n,
        size: 23,
        color: step.color,
        bold: true,
        wrap: "none",
      });
      addText(slide, {
        name: `close-step-title-${index}`,
        x: step.x,
        y: 264,
        w: 292,
        h: 38,
        text: step.title,
        size: 28,
        color: C.navy,
        bold: true,
        wrap: "none",
      });
      addRule(slide, {
        name: `close-rule-${index}`,
        x: step.x,
        y: 320,
        w: 292,
        h: 3,
        fill: step.color,
      });
      addText(slide, {
        name: `close-body-${index}`,
        x: step.x,
        y: 346,
        w: 292,
        h: 76,
        text: step.body,
        size: 20,
        color: C.ink,
        bold: true,
      });
    });
    addRect(slide, {
      name: "close-speaking-field",
      x: 72,
      y: 474,
      w: 890,
      h: 112,
      fill: C.navy,
      radius: "rounded-xl",
    });
    addText(slide, {
      name: "close-speaking",
      x: 102,
      y: 496,
      w: 830,
      h: 68,
      text: "I'm __________.   I'm from __________.\nI'm __________ years old.",
      size: 24,
      color: C.white,
      bold: true,
      align: "center",
      valign: "middle",
    });
    addText(slide, {
      name: "close-footer",
      x: 72,
      y: 616,
      w: 830,
      h: 24,
      text: "Your turn: say the three sentences without reading.",
      size: 17,
      color: C.muted,
      bold: true,
      wrap: "none",
    });
    setNotes(slide, {
      purpose:
        "Cerrar con una rutina de producción oral personal y recuperable.",
      talk: [
        "Cada estudiante completa y dice las tres frases. Si hay tiempo, un compañero pregunta: Are you a student?",
      ],
      sourceLines: [`Gramática A1: ${sources.britishCouncil}`],
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
