import { db } from "./db";

export function getGameState(): number[] {
  const row = db.query("SELECT called_numbers FROM game_state WHERE id = 1").get() as any;
  return JSON.parse(row.called_numbers);
}

export function drawNumber(): number | null {
  const called = getGameState();
  if (called.length >= 75) return null;

  const available = new Set(Array.from({ length: 75 }, (_, i) => i + 1)).difference(new Set(called));

  const pool = Array.from(available);
  const num = pool[Math.floor(Math.random() * pool.length)];

  called.push(num);
  db.query("UPDATE game_state SET called_numbers = $called WHERE id = 1").run({ $called: JSON.stringify(called) });
  return num;
}

export function resetGame() {
  db.query("UPDATE game_state SET called_numbers = '[]' WHERE id = 1").run();
}

export function generateCard(): number[][] {
  const getCol = (min: number, max: number, isN = false) => {
    const nums = new Set<number>();
    while (nums.size < 5) nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
    const arr = Array.from(nums);
    if (isN) arr[2] = 0; // 0 represents the free space
    return arr;
  };

  const b = getCol(1, 15);
  const i = getCol(16, 30);
  const n = getCol(31, 45, true);
  const g = getCol(46, 60);
  const o = getCol(61, 75);

  // Return as an array of columns [b, i, n, g, o]
  return [b, i, n, g, o];
}

export function saveCard(id: string, grid: number[][]) {
  db.query("INSERT INTO cards202606 (id, grid) VALUES ($id, $grid)").run({ $id: id, $grid: JSON.stringify(grid) });
}

export function getCard(id: string): number[][] | null {
  const row = db.query("SELECT grid FROM cards202606 WHERE id = $id").get({ $id: id }) as any;
  if (!row) return null;
  return JSON.parse(row.grid);
}
