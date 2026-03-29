 <script>
  import ArticleHeader from '$lib/components/ArticleHeader.svelte';

  let { data } = $props();
  let selected = $state(null);

  let headline = "NYC's Dirtiest Detectives";
  let byline = 'NYCity News Service';
  let pubDate = '2026-03-16';
</script>

<svelte:head>
  <title>{headline} | NYCity News Service</title>
</svelte:head>

<div class="container">
  <ArticleHeader
    {headline}
    {byline}
    {pubDate}
  />
</div>

<div class="wide-container">
  <div class="permits">
    {#each data.officers as detective (detective.shield_no)}
      <div class="card" onclick={() => (selected = detective)}>
        <h3>{detective.officer_first_name} {detective.officer_last_name}</h3>
        <p>has {detective.total_substantiated_complaints} substantiated complaints against them </p>
      </div>
    {/each}
  </div>
</div>

{#if selected}
  <div class="overlay" onclick={() => selected = null}>
    <div class="popup" onclick={(e) => e.stopPropagation()}>
      <button class="close-btn" onclick={() => selected = null}>&times;</button>
      <h2> There are {selected.total_complaints} complaints against this detective</h2>
      <p><strong>Race:</strong> {selected.officer_race}</p>
      <p><strong> Gender:</strong> {selected.officer_gender}</p>
      <p><strong>Shield Number:</strong> {selected.shield_no}</p>
      <p><strong>Last Reported Active:</strong> {selected.last_reported_active_date}</p>
    </div>
  </div>
{/if}

<style lang="scss">
  @use '$lib/styles' as *;

    .wide-container {
    max-width: 1300px;
    margin: var(--spacing-md) auto;
    padding: 0 var(--spacing-sm);
  }

  .permits {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-sm);
  }

  .card {
    padding: var(--spacing-sm);
    border: var(--border-width-thin) solid var(--color-border);
    cursor: pointer;

    &:hover {
      background-color: var(--color-light-gray);
    }
  }

    .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup {
    position: relative;
    background: white;
    padding: var(--spacing-lg);
    max-width: 500px;
    width: 90%;
  }

  .popup button {
    float: right;
    cursor: pointer;
  }

  .close-btn {
    position: absolute;
    top: var(--spacing-xs);
    right: var(--spacing-xs);
    background: none;
    border: none;
    font-size: var(--font-size-3xl);
    line-height: 1;
    color: var(--color-medium-gray);
    cursor: pointer;

    &:hover {
      color: var(--color-dark);
    }
  }
</style>