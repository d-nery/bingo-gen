<script lang="ts">
  let { called } = $props<{ called: number[] }>();

  const rows = [
    { letter: "B", start: 1, end: 15 },
    { letter: "I", start: 16, end: 30 },
    { letter: "N", start: 31, end: 45 },
    { letter: "G", start: 46, end: 60 },
    { letter: "O", start: 61, end: 75 },
  ];
</script>

<div class="master-board">
  {#each rows as row}
    <div class="row">
      <div class="letter">{row.letter}</div>
      {#each Array.from({ length: 15 }, (_, i) => i + row.start) as num}
        <div class="number-cell {called.includes(num) ? 'called' : ''}">
          {num}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .master-board {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    align-items: center;
    background: #151d2a; /* Solid deep navy/slate to stand out perfectly */
    border: 2px solid #242f41; /* Elegant outline */
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Strong shadow to elevate above the field */
  }
  .row {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .letter {
    width: 40px;
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
    color: var(--purple);
  }
  .number-cell {
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: #242f41; /* Solid dark-blue instead of transparent white */
    color: rgba(255, 255, 255, 0.4);
    font-weight: bold;
    font-size: 1.2rem;
    transition: all 0.2s ease;
  }
  .number-cell.called {
    background: var(--green);
    color: #111;
    transform: scale(1.1);
  }
</style>
