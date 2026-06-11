<script lang="ts">
  import { onMount } from "svelte";
  import Ball from "$lib/components/Ball.svelte";
  import MasterBoard from "$lib/components/MasterBoard.svelte";
  import Verifier from "$lib/components/Verifier.svelte";
  import PatternTip from "$lib/components/PatternTip.svelte";
  import { audio } from "$lib/audio";

  let calledNumbers = $state<number[]>([]);
  let currentNumber = $state<number | null>(null);
  let loading = $state(false);
  let isAnimating = $state(false);

  async function loadState() {
    const res = await fetch("/api/game");
    if (res.ok) {
      const data = await res.json();
      calledNumbers = data.called;
      currentNumber = data.called.length > 0 ? data.called[data.called.length - 1] : null;
    }
  }

  async function drawNumber() {
    if (loading || isAnimating || calledNumbers.length >= 75) return;
    loading = true;
    isAnimating = true;

    // Start the rolling sound
    audio.playRoll();

    const res = await fetch("/api/game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "draw" }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.num !== null) {
        currentNumber = data.num;
        // Wait for the ball animation to finish before updating the board
        setTimeout(() => {
          calledNumbers = data.called;
          isAnimating = false;
          audio.playPop(); // Play pop sound when revealed
        }, 2000);
      } else {
        isAnimating = false;
      }
    } else {
      isAnimating = false;
    }
    loading = false;
  }

  async function resetGame() {
    if (!confirm("Reset the game?")) return;
    loading = true;
    const res = await fetch("/api/game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reset" }),
    });
    if (res.ok) {
      calledNumbers = [];
      currentNumber = null;
    }
    loading = false;
  }

  onMount(() => {
    loadState();
  });
</script>

<PatternTip />

<div class="top-bar">
  <div class="logo">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none">
      <path d="M12.8068 4.07816L0 23.1056H4.9005L20.5457 0.00312209H2.50119V4.07816H12.8068Z" fill="#C4F553" />
      <path d="M24.1293 0L8.48409 23.1025L26.5285 23.1027H26.5286V19.0278H16.2229L29.0302 0L24.1293 0Z" fill="#C4F553" />
    </svg>
  </div>
  <div class="right-actions">
    <Verifier called={calledNumbers} />
    <button class="button reset-btn" onclick={resetGame} disabled={loading || isAnimating}> RESET </button>
  </div>
</div>

<div class="dashboard">
  <div class="ball-section">
    <Ball
      number={currentNumber}
      {isAnimating}
      onclick={drawNumber}
      disabled={loading || isAnimating || calledNumbers.length >= 75}
    />
    <div class="stats">
      {calledNumbers.length} / 75
    </div>
  </div>

  <div class="board-section">
    <MasterBoard called={calledNumbers} />
  </div>
</div>

<style>
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .logo {
    display: flex;
    align-items: center;
  }
  .right-actions {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  .reset-btn {
    background: transparent;
    border: 3px solid var(--text-color);
    padding: 8px 16px;
  }
  .reset-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  .reset-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: calc(100vh - 120px);
    justify-content: center;
  }
  .ball-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  .stats {
    font-weight: 900;
    color: var(--green);
    font-size: 1.5rem;
  }
  .board-section {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
