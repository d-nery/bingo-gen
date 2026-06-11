<script lang="ts">
  let {
    number,
    isAnimating = false,
    onclick,
    disabled,
  } = $props<{ number: number | null; isAnimating?: boolean; onclick?: () => void; disabled?: boolean }>();

  const letter = $derived(number !== null && number >= 1 && number <= 75 ? "BINGO"[Math.floor((number - 1) / 15)] : "");
</script>

<div class="ball-container">
  {#if isAnimating}
    <button class="ball shaking" disabled>
      <span class="question">?</span>
    </button>
  {:else if number !== null}
    <button class="ball animate-pop" {onclick} {disabled}>
      <span class="letter">{letter}</span>
      <span class="number">{number}</span>
    </button>
  {:else}
    <button class="empty-ball" {onclick} {disabled}>
      <span>START</span>
    </button>
  {/if}
</div>

<style>
  .ball-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
  }
  .ball {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: var(--orange);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 8px solid var(--bg-color);
    box-shadow:
      0 0 0 8px var(--text-color),
      0 20px 40px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition:
      transform 0.1s,
      box-shadow 0.1s;
    padding: 0;
    outline: none;
  }
  .ball:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow:
      0 0 0 8px var(--blue),
      0 25px 50px rgba(0, 0, 0, 0.6);
  }
  .ball:active:not(:disabled) {
    transform: scale(0.95);
  }
  .empty-ball {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: transparent;
    border: 8px dashed rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0;
    outline: none;
  }
  .empty-ball:hover:not(:disabled) {
    border-color: white;
    color: white;
    transform: scale(1.05);
  }
  .letter {
    position: absolute;
    top: 40px;
    font-size: 2.2rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 1px;
    line-height: 1;
  }
  .number {
    font-size: 10rem;
    font-weight: 900;
    color: white;
    line-height: 1;
  }
  .question {
    font-size: 12rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    line-height: 1;
  }

  @keyframes shake {
    0%,
    100% {
      transform: rotate(0deg) scale(1.1);
    }
    25% {
      transform: rotate(15deg) scale(1.15);
    }
    50% {
      transform: rotate(0deg) scale(1.1);
    }
    75% {
      transform: rotate(-15deg) scale(1.15);
    }
  }
  .shaking {
    animation: shake 0.4s ease-in-out infinite;
    background: var(--purple);
    box-shadow:
      0 0 40px var(--purple),
      0 0 0 8px var(--text-color);
    cursor: not-allowed;
  }
</style>
