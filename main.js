import { createCanvas, registerFont } from "canvas";
import { loadImage } from "canvas";
import fs from "fs";
import _ from "underscore";

const bg = await loadImage("./bg.png");

const ranges = [_.range(1, 19), _.range(19, 37), _.range(37, 55), _.range(55, 73), _.range(73, 91)];
const amt = 300;

for (let i = 0; i < amt; i++) {
  const canvas = createCanvas(bg.width, bg.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.font = "60pt 'Comic Sans MS'";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ff8080";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 6;

  for (const x of _.range(5)) {
    const r = _.shuffle(ranges[x]);

    for (const y of _.range(5)) {
      if (x == 2 && y == 2) continue;

      ctx.strokeText(r[y], 135 + x * 129.5, 278 + y * 129.5);
      ctx.fillText(r[y], 135 + x * 129.5, 278 + y * 129.5);
    }
  }

  ctx.font = "15pt 'Arial'";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.fillText("#" + i.toString().padStart(3, "0"), 734, 1156);

  fs.mkdirSync("out", { recursive: true });
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`./out/cartela${i.toString().padStart(3, "0")}.png`, buffer);
}
