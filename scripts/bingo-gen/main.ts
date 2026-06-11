import { createCanvas } from "canvas";
import { loadImage } from "canvas";
import cliProgress from "cli-progress";
import _ from "underscore";
import { mkdir } from "node:fs/promises";
import { Database } from "bun:sqlite";

const db = new Database("../../bingo.sqlite");
const bg = await loadImage("./bg-hexa.png");

const ranges = [
  _.range(1, 16),
  _.range(16, 31),
  _.range(31, 46),
  _.range(46, 61),
  _.range(61, 76),
];
const amt = 300;

const progress = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic,
);
progress.start(amt, 0);

for (let i = 0; i < amt; i++) {
  const canvas = createCanvas(bg.width, bg.height);
  const ctx = canvas.getContext("2d");
  const grid: number[][] = [[], [], [], [], []];

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.font = "60pt 'Comic Sans MS'";
  ctx.textAlign = "center";
  ctx.fillStyle = "#efefef";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 6;

  for (const x of _.range(5)) {
    const r = _.shuffle(ranges[x]);

    for (const y of _.range(5)) {
      if (x == 2 && y == 2) {
          grid[x].push(0);
          continue;
      }
      grid[x].push(r[y]);

      ctx.strokeText(r[y], 130 + x * 127, 355 + y * 127);
      ctx.fillText(r[y], 130 + x * 127, 355 + y * 127);
    }
  }

  ctx.font = "15pt 'Arial'";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";

  const cardId = i.toString().padStart(3, "0");
  ctx.fillText("#" + cardId, 600, 980);
  ctx.fillText(`Rodada ${(i % 3) + 1}`, 190, 980);

  await mkdir("out", { recursive: true });
  const buffer = canvas.toBuffer("image/png");
  Bun.write(`./out/cartela${cardId}.png`, buffer);

  // Save to db
  db.query("INSERT INTO cards202606 (id, grid) VALUES ($id, $grid) ON CONFLICT(id) DO UPDATE SET grid = excluded.grid").run({
    $id: cardId,
    $grid: JSON.stringify(grid)
  });

  progress.update(i + 1);
}

progress.stop();
