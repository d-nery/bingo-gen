<script lang="ts">
  const patterns = [
    {
      name: "Gols",
      grid: [
        [false, true, true, true, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, true, true, true, false],
      ],
    },
    {
      name: "Meio de Campo",
      grid: [
        [false, false, false, false, false],
        [false, true, true, true, false],
        [false, true, true, true, false],
        [false, true, true, true, false],
        [false, false, false, false, false],
      ],
    },
    {
      name: "Cartela Cheia",
      grid: [
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
      ],
    },
  ];

  let currentIndex = $state(0);

  function next() {
    currentIndex = (currentIndex + 1) % patterns.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + patterns.length) % patterns.length;
  }
</script>

<div class="pattern-tip">
  <div class="header">
    <button class="arrow" onclick={prev}>&lt;</button>
    <span class="title">{patterns[currentIndex].name}</span>
    <button class="arrow" onclick={next}>&gt;</button>
  </div>
  <div class="mini-grid">
    {#each patterns[currentIndex].grid as row}
      {#each row as active}
        <div class="mini-cell" class:active></div>
      {/each}
    {/each}
  </div>
</div>

<style>
  .pattern-tip {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(30, 41, 59, 0.95);
    border: 4px solid var(--purple);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    z-index: 10;
    width: 220px;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
    justify-content: space-between;
  }
  .arrow {
    background: transparent;
    border: none;
    color: var(--text-color);
    font-size: 1.5rem;
    font-weight: 900;
    cursor: pointer;
    padding: 0 5px;
    transition:
      color 0.2s,
      transform 0.1s;
  }
  .arrow:hover {
    color: var(--orange);
    transform: scale(1.2);
  }
  .title {
    font-weight: 900;
    color: var(--blue);
    font-size: 1.1rem;
    text-align: center;
    text-transform: uppercase;
    flex-grow: 1;
    line-height: 1.2;
  }
  .mini-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
    background: var(--bg-color);
    padding: 6px;
    border-radius: 8px;
  }
  .mini-cell {
    width: 28px;
    height: 28px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    transition: background 0.3s;
  }
  .mini-cell.active {
    background: var(--green);
    box-shadow: 0 0 5px var(--green);
  }
</style>
