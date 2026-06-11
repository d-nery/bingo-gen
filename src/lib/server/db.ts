import { Database } from "bun:sqlite";

// Create or open the SQLite database file locally
export const db = new Database("bingo.sqlite", { create: true });

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS cards202606 (
    id TEXT PRIMARY KEY,
    grid TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS game_state (
    id INTEGER PRIMARY KEY,
    called_numbers TEXT NOT NULL
  );
`);

// Ensure game_state has an initial row
const row = db.query("SELECT id FROM game_state WHERE id = 1").get();
if (!row) {
  db.query("INSERT INTO game_state (id, called_numbers) VALUES (1, '[]')").run();
}
