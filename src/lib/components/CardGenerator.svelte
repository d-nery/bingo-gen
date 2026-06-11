<script lang="ts">
  let count = $state(1);
  let generatedCards = $state<{ id: string; grid: number[][] }[]>([]);
  let loading = $state(false);

  async function generate() {
    loading = true;
    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count }),
      });
      const data = await res.json();
      if (res.ok) {
        generatedCards = data.cards;
      }
    } catch (e) {
      console.error(e);
    }
    loading = false;
  }
</script>

<div class="generator">
  <h2>GENERATE CARDS</h2>
  <div class="controls">
    <input type="number" min="1" max="100" class="input" bind:value={count} />
    <button class="button" onclick={generate} disabled={loading}>
      {loading ? "GENERATING..." : "GENERATE"}
    </button>
  </div>

  {#if generatedCards.length > 0}
    <div class="results">
      <h3>SUCCESS: {generatedCards.length} CARDS GENERATED</h3>
      <div class="id-list">
        {#each generatedCards as card}
          <div class="card-id">{card.id}</div>
        {/each}
      </div>
      <p class="hint">Distribute these IDs to players so you can verify them later.</p>
    </div>
  {/if}
</div>

<style>
  .generator {
    padding: 40px;
    width: 100%;
    max-width: 600px;
    background: rgba(0, 0, 0, 0.1);
    border: 4px solid var(--blue);
    border-radius: 8px;
  }
  h2 {
    margin-top: 0;
    color: var(--blue);
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
    letter-spacing: -1px;
  }
  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    justify-content: center;
  }
  .input {
    width: 100px;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
  .button {
    font-size: 1.2rem;
    padding: 10px 20px;
  }
  .results {
    background: rgba(255, 255, 255, 0.05);
    padding: 20px;
    border-radius: 8px;
  }
  h3 {
    margin-top: 0;
    font-size: 1.2rem;
    color: var(--green);
    font-weight: 900;
  }
  .id-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .card-id {
    background: var(--purple);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .hint {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 15px;
    font-weight: bold;
  }
</style>
