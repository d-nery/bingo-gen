import { json } from "@sveltejs/kit";
import { getGameState, drawNumber, resetGame } from "$lib/server/bingo";

export async function GET() {
  return json({ called: getGameState() });
}

export async function POST({ request }) {
  const data = await request.json();
  if (data.action === "draw") {
    const num = drawNumber();
    return json({ num, called: getGameState() });
  } else if (data.action === "reset") {
    resetGame();
    return json({ called: [] });
  }
  return json({ error: "Invalid action" }, { status: 400 });
}
