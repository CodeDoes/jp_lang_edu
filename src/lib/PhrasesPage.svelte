<script lang="ts">
  import MultiChoiceSrsCard from "./srs_cards/MultiChoiceSrsCard.svelte"
  import phrases_json from "./phrases.json"
  import { untrack } from "svelte"
  const phrases = $state(Object.values(phrases_json.phrases))
  let {
    cards,
    active_index = $bindable(null),
  }: {
    cards: {
      question: string
      options: string[]
      answer_index: number
      selected_index: number | null
    }[]
    active_index: number | null
  } = $props()
</script>

<div class="page">
  <div class="card-selection">
    {#each cards as card, i}
      <div class="card-container" class:active={i == 0}>
        <button
          type="button"
          onclick={() => {
            if (active_index != null) {
              return
            }
            // active_index = i
          }}
          class="overlay"
        ></button>
        <div class="relay" class:active={i == 0}>
          <button type="button" class="overlay"></button>
          <MultiChoiceSrsCard
            {...cards[i]}
            bind:selected_index={cards[i].selected_index}
          />
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .page {
    /* position: relative; */
    font-family: monospace;
  }
  .card-selection * {
    border: unset;
    background-color: unset;
  }
  .card-selection {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    gap: 1ex;
  }
  .main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;

    background-color: rgba(0, 0, 0, 0.5);
  }
  .page .card {
    pointer-events: none;
    aspect-ratio: 15 / 25;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.5) 0.5ex 0.5ex 1ex;
    transition: all 0.2s;
    border-radius: 10px;
  }
  .main .card-container {
    z-index: 2;
  }
  .main .card {
    /* background-color: white; */
    box-shadow: rgba(255, 255, 255, 1) 0 0 8ex;
    border: thin solid black;
  }
  .card-selection .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.2em;
    width: 6em;
    background-color: white;

    transform: translateY(0px);
    position: relative;
  }
  .card-container {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 0.2em inset;
  }
  .card-container:not(.active) {
    position: relative;
    display: grid;
    grid-template-areas: A;
  }
  .card-container > .overlay {
    grid-area: A;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .card-container > .relay {
    grid-area: A;
    position: relative;
    min-height: min-content;
    min-width: min-content;
    left: 0;
    top: 0;
    height: 100%;
    /* background-color: green; */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 1s ease-in-out;
  }
  .card-container > .relay.active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
  }
  .card-container:hover .card {
    transform: translateY(-20px) translateX(5px) rotateZ(2deg);
  }
  .page .card .number {
    font-size: 2em;
    height: 2.5em;
    background-color: rgb(82, 82, 82);
    color: rgb(212, 212, 212);
    border-radius: 99em;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page .card.facedown {
    background-color: grey;
  }
</style>
