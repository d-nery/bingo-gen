<script lang="ts">
  let { called } = $props<{ called: number[] }>();

  let cardId = $state("");
  let cardData = $state<number[][] | null>(null);
  let error = $state("");
  let loading = $state(false);
  let showModal = $state(false);

  async function verifyCard() {
    if (!cardId) return;
    loading = true;
    error = "";
    try {
      const res = await fetch(`/api/cards?id=${cardId}`);
      const data = await res.json();
      if (res.ok) {
        cardData = data.grid;
        showModal = true;
      } else {
        error = data.error || "Card not found";
        cardData = null;
      }
    } catch (e) {
      error = "Network error";
      cardData = null;
    }
    loading = false;
  }

  function close() {
    showModal = false;
    cardId = "";
    cardData = null;
  }
</script>

<div class="verifier-inline">
  <input type="text" class="input" bind:value={cardId} placeholder="#" />
  <button class="button button-alt" onclick={verifyCard} disabled={loading}>✔</button>
</div>

{#if error}
  <div class="error-toast">{error}</div>
{/if}

{#if showModal && cardData}
  <div class="modal-backdrop" onclick={close}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <div class="modal-titles">
          <h2>#{cardId.toUpperCase()}</h2>
          <h3 class="rodada">RODADA {(parseInt(cardId, 10) % 3) + 1}</h3>
        </div>
        <button class="close-btn" onclick={close}>&times;</button>
      </div>
      <div class="card">
        <div class="card-header">
          <span>B</span><span>I</span><span>N</span><span>G</span><span>O</span>
        </div>
        <div class="card-grid">
          {#each Array(5) as _, row}
            {#each cardData as col}
              {@const num = col[row]}
              <div class="card-cell {called.includes(num) || num === 0 ? 'marked' : ''}">
                {num === 0 ? "★" : num}
              </div>
            {/each}
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .verifier-inline {
    display: flex;
    gap: 8px;
  }
  .input {
    width: 120px;
    text-transform: uppercase;
    font-weight: bold;
  }
  .error-toast {
    position: absolute;
    top: 80px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 8px 16px;
    border-radius: var(--border-radius);
    font-weight: bold;
    z-index: 50;
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(49, 65, 95, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    border: 4px solid var(--purple);
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  .modal-titles {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .modal-header h2 {
    margin: 0;
    color: var(--blue);
    font-weight: 900;
    line-height: 1;
  }
  .rodada {
    margin: 0;
    color: var(--orange);
    font-size: 1.1rem;
    font-weight: 900;
    letter-spacing: 1px;
  }
  .close-btn {
    background: transparent;
    border: none;
    color: var(--text-color);
    background: var(--bg-color);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }
  .card {
    color: #111;
  }
  .card-header {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    text-align: center;
    font-weight: 900;
    font-size: 1.5rem;
    color: var(--blue);
    margin-bottom: 10px;
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
  }
  .card-cell {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid var(--bg-color);
    border-radius: 4px;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--bg-color);
  }
  .card-cell.marked {
    background: var(--green);
    border-color: var(--green);
    color: var(--bg-color);
  }
</style>
