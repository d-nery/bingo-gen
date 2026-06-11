<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<div class="bg-decoration"></div>

<div class="bunting bunting-left">
  <img src="/bunting.png" alt="Bunting" />
</div>

<div class="bunting bunting-right">
  <img src="/bunting.png" alt="Bunting" />
</div>

<div class="decorations-bottom-left">
  <img src="/bonfire.png" class="bonfire-img" alt="Bonfire" />
  <img src="/hat.png" class="hat-img" alt="Straw Hat" />
</div>

<div class="app-container">
  {@render children()}
</div>

<style>
  .app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .bunting {
    position: fixed;
    top: 0;
    width: 420px;
    height: auto;
    pointer-events: none; /* Click-through so user can still click buttons underneath */
    z-index: 100; /* Float on top of headers */
    transition: width 0.3s ease;
  }

  .bunting img {
    width: 100%;
    height: auto;
    display: block;
  }

  .bunting-left {
    left: -40px;
    top: -30px;
    transform: rotate(-12deg);
  }

  .bunting-right {
    right: -40px;
    top: -30px;
    transform: scaleX(-1) rotate(-12deg);
  }

  .decorations-bottom-left {
    position: fixed;
    bottom: 70px;
    left: 90px;
    width: 340px;
    height: 220px;
    pointer-events: none; /* Click-through */
    z-index: 100;
  }

  .bonfire-img {
    position: absolute;
    bottom: -15px;
    left: 140px;
    width: 170px;
    height: auto;
    animation: fire-pulse 4s ease-in-out infinite alternate;
  }

  .hat-img {
    position: absolute;
    bottom: -25px;
    left: 0;
    width: 145px;
    height: auto;
    transform: rotate(-15deg);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.45));
  }

  .bg-decoration {
    position: fixed;
    bottom: -80px;
    right: -80px;
    width: 650px;
    height: 650px;
    background-image: url("/futzbra.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom right;
    opacity: 1; /* Fully visible, no transparency */
    pointer-events: none; /* Click-through so it doesn't block interactions */
    z-index: -1; /* Render behind all page content */
    transition:
      opacity 0.3s ease,
      width 0.3s ease,
      height 0.3s ease;
  }

  @keyframes fire-pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.04) rotate(2deg);
    }
  }

  @media (max-width: 768px) {
    .bunting {
      width: 190px; /* Scales down elegantly on mobile */
    }

    .bunting-left {
      left: -20px;
      top: -15px;
    }

    .bunting-right {
      right: -20px;
      top: -15px;
    }

    .decorations-bottom-left {
      width: 200px;
      height: 100px;
      bottom: 30px;
      left: 20px;
    }

    .bonfire-img {
      width: 90px;
      left: 90px;
      bottom: -8px;
    }

    .hat-img {
      width: 80px;
      left: 0;
      bottom: -15px;
    }

    .bg-decoration {
      width: 320px;
      height: 320px;
      bottom: -40px;
      right: -40px;
    }
  }
</style>
