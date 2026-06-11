<script lang="ts">
  import CardGenerator from "$lib/components/CardGenerator.svelte";
</script>

<div class="top-bar">
  <a href="/" class="logo">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none">
      <path d="M12.8068 4.07816L0 23.1056H4.9005L20.5457 0.00312209H2.50119V4.07816H12.8068Z" fill="#C4F553" />
      <path d="M24.1293 0L8.48409 23.1025L26.5285 23.1027H26.5286V19.0278H16.2229L29.0302 0L24.1293 0Z" fill="#C4F553" />
    </svg>
  </a>
</div>

<div class="page-container">
  <CardGenerator />
</div>

<style>
  .top-bar {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }
  .logo {
    display: flex;
    align-items: center;
  }
  .page-container {
    display: flex;
    justify-content: center;
  }
</style>
