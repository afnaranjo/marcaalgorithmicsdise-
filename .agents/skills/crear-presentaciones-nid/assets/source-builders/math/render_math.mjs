import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mathjax } from "./formula_runtime/node_modules/mathjax-full/js/mathjax.js";
import { TeX } from "./formula_runtime/node_modules/mathjax-full/js/input/tex.js";
import { SVG } from "./formula_runtime/node_modules/mathjax-full/js/output/svg.js";
import { liteAdaptor } from "./formula_runtime/node_modules/mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "./formula_runtime/node_modules/mathjax-full/js/handlers/html.js";
import { AllPackages } from "./formula_runtime/node_modules/mathjax-full/js/input/tex/AllPackages.js";
import { FORMULA_CATALOG } from "./formula-catalog.mjs";

const OUT = path.resolve("assets/formulas");
const execFileAsync = promisify(execFile);
const ACCENTS = ["#377FD8", "#7E70C9"];

await fs.mkdir(OUT, { recursive: true });

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const tex = new TeX({ packages: AllPackages });
const svgOutput = new SVG({ fontCache: "none" });
const html = mathjax.document("", { InputJax: tex, OutputJax: svgOutput });

const formulas = FORMULA_CATALOG.flatMap((entry, index) => {
  const topic = String(index + 1).padStart(2, "0");
  return [
    {
      file: `t${topic}-method.svg`,
      tex: entry.method,
      color: ACCENTS[index % ACCENTS.length],
      resize: "1800x320",
    },
    {
      file: `t${topic}-answer.svg`,
      tex: entry.answer,
      color: "#FFFFFF",
      resize: "1500x280",
    },
  ];
});

for (const item of formulas) {
  const node = html.convert(item.tex, {
    display: true,
    em: 18,
    ex: 9,
    containerWidth: 1600,
  });
  const raw = adaptor.outerHTML(adaptor.firstChild(node));
  const match = raw.match(/<svg[\s\S]*<\/svg>/);
  if (!match) throw new Error(`No SVG output for ${item.file}`);
  const cleaned = match[0]
    .replaceAll("currentColor", item.color)
    .replace(/style="[^"]*"/g, "")
    .replace("<svg ", '<svg preserveAspectRatio="xMidYMid meet" ');
  const svgPath = path.join(OUT, item.file);
  const pngPath = svgPath.replace(/\.svg$/i, ".png");
  await fs.writeFile(svgPath, cleaned);
  await execFileAsync("magick", [
    "-background", "none",
    "-density", "300",
    svgPath,
    "-resize", item.resize,
    pngPath,
  ]);
}

console.log(`Rendered ${formulas.length} LaTeX formulas to ${OUT}`);
