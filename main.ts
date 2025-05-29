import { createCanvas } from "canvas";
import { loadImage } from "canvas";
import cliProgress from "cli-progress";
import _ from "underscore";
import { mkdir } from "node:fs/promises";

const bg = await loadImage("./bg-jun.png");

const words = [
  "Acordeão",
  "Alavantu",
  "Amendoim",
  "Anarriê",
  "Argola",
  "Arraiá",
  "Arroz_Doce",
  "Baião",
  "Balancê",
  "Balão",
  "Bandeirinha",
  "Barraca",
  "Bingo",
  "Bolo de_Fubá",
  "Bolo de_Milho",
  "Bota",
  "Brincadeiras",
  "Cadeia",
  "Caipira",
  "Canjica",
  "Casório",
  "Causos",
  "Chapéu",
  "Cocada",
  "Cumpadi",
  "Curau",
  "Dança",
  "Doce",
  "Espantalho",
  "Espiga",
  "Fé",
  "Festança",
  "Fogueira",
  "Folclore",
  "Forró",
  "Fubá",
  "Junho",
  "Junina",
  "Maçã do_Amor",
  "Maria_Mole",
  "Milho",
  "Noivos",
  "Olha a_Chuva",
  "Olha a_Cobra",
  "Paçoca",
  "Padre",
  "Palha ",
  "Pamonha",
  "Pau de_Sebo",
  "Pé de_Moleque",
  "Pescaria",
  "Pipoca",
  "Prenda",
  "Quadrilha",
  "Quentão",
  "Quermesse",
  "Remendo",
  "Reza",
  "Rifa",
  "Roça",
  "Saci",
  "Sanfona",
  "Santo",
  "São_João",
  "São_Pedro",
  "Sertanejo",
  "Sorteio",
  "Santo_Antônio",
  "Tradição",
  "Trança",
  "Triângulo",
  "Vinho_Quente",
  "Violão",
  "Xadrez",
  "Zabumba",
];

const ranges = [
  _.range(1, 16),
  _.range(16, 31),
  _.range(31, 46),
  _.range(46, 61),
  _.range(61, 76),
];
const amt = 5;

const progress = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic
);
progress.start(amt, 0);

for (let i = 0; i < amt; i++) {
  const canvas = createCanvas(bg.width, bg.height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.font = "18pt 'Arial'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#efefef";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 6;
  ctx.miterLimit = 2;

  for (const x of _.range(5)) {
    const r = _.shuffle(ranges[x]);

    for (const y of _.range(5)) {
      if (x == 2 && y == 2) continue;

      // ctx.strokeText(words[r[y]], 130 + x * 127, 335 + y * 127);
      drawMultilineText(ctx, words[r[y] - 1], {
        rect: { x: 130 + x * 127, y: 288 + y * 127, width: 30, height: 30 },
        font: "Arial",
        // verbose: true,
        lineHeight: 1.4,
        minFontSize: 20,
        maxFontSize: 80,
        stroke: true,
      });
      drawMultilineText(ctx, words[r[y] - 1], {
        rect: { x: 130 + x * 127, y: 288 + y * 127, width: 30, height: 30 },
        font: "Arial",
        // verbose: true,
        lineHeight: 1.4,
        minFontSize: 20,
        maxFontSize: 80,
      });
      // ctx.fillText(words[r[y]], 130 + x * 127, 335 + y * 127);
    }
  }

  ctx.font = "15pt 'Arial'";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.fillText("#" + i.toString().padStart(3, "0"), 680, 980);
  ctx.fillText(`Rodada ${(i % 3) + 1}`, 105, 980);

  await mkdir("out", { recursive: true });
  const buffer = canvas.toBuffer("image/png");
  Bun.write(`./out/cartela${i.toString().padStart(3, "0")}.png`, buffer);
  progress.update(i + 1);
}

progress.stop();

function drawMultilineText(ctx, text, opts) {
  // Default options
  if (!opts) opts = {};
  if (!opts.font) opts.font = "sans-serif";
  if (typeof opts.stroke == "undefined") opts.stroke = false;
  if (typeof opts.verbose == "undefined") opts.verbose = false;
  if (!opts.rect)
    opts.rect = {
      x: 0,
      y: 0,
      width: ctx.canvas.width,
      height: ctx.canvas.height,
    };
  if (!opts.lineHeight) opts.lineHeight = 1.1;
  if (!opts.minFontSize) opts.minFontSize = 30;
  if (!opts.maxFontSize) opts.maxFontSize = 100;
  // Default log function is console.log - Note: if verbose il false, nothing will be logged anyway
  if (!opts.logFunction)
    opts.logFunction = function (message) {
      console.log(message);
    };

  const words = text?.split("_") ?? [];
  if (opts.verbose)
    opts.logFunction("Text contains " + words.length + " words");
  let lines: any[] = [];
  let y; //New Line

  // Finds max font size  which can be used to print whole text in opts.rec
  for (
    var fontSize = opts.minFontSize;
    fontSize <= opts.maxFontSize;
    fontSize++
  ) {
    // Line height
    let lineHeight = fontSize * opts.lineHeight;

    // Set font for testing with measureText()
    ctx.font = " " + fontSize + "px " + opts.font;

    // Start
    let x = opts.rect.x;
    y = lineHeight; //modified line
    lines = [];
    let line = "";

    // Cycles on words
    for (let word of words) {
      // Add next word to line
      let linePlus = line + word + " ";
      // If added word exceeds rect width...
      if (ctx.measureText(linePlus).width > opts.rect.width) {
        // ..."prints" (save) the line without last word
        lines.push({ text: line, x: x, y: y });
        // New line with ctx last word
        line = word + " ";
        y += lineHeight;
      } else {
        // ...continues appending words
        line = linePlus;
      }
    }

    // "Print" (save) last line
    lines.push({ text: line, x: x, y: y });

    // If bottom of rect is reached then breaks "fontSize" cycle
    if (y > opts.rect.height) break;
  }

  if (opts.verbose) opts.logFunction("Font used: " + ctx.font);
  const offset = opts.rect.y + (opts.rect.height - y) / 2; //New line, calculates offset
  // Fill or stroke
  for (let line of lines)
    if (opts.stroke)
      ctx.strokeText(line.text.trim(), line.x, line.y + offset); //modified line
    else ctx.fillText(line.text.trim(), line.x, line.y + offset); //modified line

  // Returns font size
  return fontSize;
}
