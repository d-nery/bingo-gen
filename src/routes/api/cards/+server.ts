import { json } from "@sveltejs/kit";
import { generateCard, saveCard, getCard } from "$lib/server/bingo";

export async function GET({ url }) {
  const id = url.searchParams.get("id");
  if (!id) return json({ error: "Missing id" }, { status: 400 });
  const card = getCard(id.toUpperCase());
  if (!card) return json({ error: "Card not found" }, { status: 404 });
  return json({ id: id.toUpperCase(), grid: card });
}

export async function POST({ request }) {
  const { count = 1 } = await request.json().catch(() => ({ count: 1 }));
  const cards = [];
  for (let i = 0; i < count; i++) {
    const id = crypto.randomUUID().split("-")[0].toUpperCase();
    const grid = generateCard();
    saveCard(id, grid);
    cards.push({ id, grid });
  }
  return json({ cards });
}
