<script lang="ts">
  import { browser } from "$app/environment"
  import { onMount } from "svelte"
  let {
    show_question = true,
    question = "",
    options = $bindable([""]),
    valid_index = 0,
    selected_index = $bindable(null),
    show_answer = $bindable(false),
    // variant = $bindable("default"),
  }: {
    show_question?: boolean
    question: string
    options: string[]
    valid_index?: number
    selected_index?: number | null
    show_answer?: boolean
    // variant?: "default" | "valid" | "invalid"
  } = $props()
  function sayJP(text: string) {
    if (!browser) {
      return
    }
    const synth = window.speechSynthesis
    const utter = new SpeechSynthesisUtterance()
    utter.voice = synth.getVoices().find((v) => v.lang == "ja-JP")!
    utter.text = text
    utter.lang = "ja-JP"
    utter.pitch = 1
    utter.volume = 3
    utter.rate = 1
    synth.speak(utter)
    console.log(synth)
  }
  $effect(() => {
    if (show_question) {
      sayJP(question)
    }
  })
  let variant = $derived(
    selected_index == null
      ? "default"
      : selected_index == valid_index
        ? "valid"
        : "invalid"
  )
</script>

<div class="card-container">
  <div
    class={["card question", show_answer ? "back" : "front"]}
    data-variant={variant}
  >
    {#if selected_index != null}
      <button
        aria-label="toggle"
        class="toggle-overlay"
        onclick={() => {
          show_answer = !show_answer
        }}
      ></button>
    {/if}
    <button
      class="trigger-speech-button"
      type="button"
      onclick={() => {
        sayJP(question)
      }}
    >
      <div class="speech-button-icon">🔊</div>
      <div class="card-header">
        <div class="card-header-text">Question</div>
      </div>
      {#each question.split("\n") as line}
        <p>{line}</p>
      {/each}
    </button>
    <div class="card-header">Options</div>
    <div class="options">
      {#each options as opt, i}
        {@const selected = selected_index == i}
        {@const unselected = selected_index != null && !selected}
        {@const valid = selected_index != null && i == valid_index}
        {@const invalid = selected_index != null && !valid}
        <svelte:element
          this={selected_index == null ? "button" : "div"}
          class="option"
          class:selected
          class:unselected
          class:valid
          class:invalid
          {...selected_index == null
            ? {
                type: "button",
                onclick: () => {
                  show_answer = !show_answer
                  selected_index = i
                },
              }
            : {}}>{opt}</svelte:element
        >
      {/each}
    </div>
  </div>
  <div
    class={["card answer", show_answer ? "front" : "back"]}
    data-variant={variant}
  >
    {#if selected_index != null}
      <button
        aria-label="toggle"
        class="toggle-overlay"
        onclick={() => {
          show_answer = !show_answer
        }}
      ></button>
    {/if}
    <button
      class="trigger-speech-button"
      type="button"
      onclick={() => {
        sayJP(question)
      }}
    >
      <div class="speech-button-icon">🔊</div>
      <div class="card-header">Answer</div>

      {#each question.split("\n") as line}
        <p>{line}</p>
      {/each}
    </button>
    <div class="answer">
      {#each options[valid_index].split("\n") as line}
        <p>{line}</p>
      {/each}
    </div>
  </div>
</div>

<style>
  .card-container {
    width: max-content;
    background-color: unset;
    border: unset;
    padding: unset;
    display: grid;
    grid-area: A;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }
  .card-container * {
    font: inherit;
  }
  .card {
    aspect-ratio: 15 / 25;
    position: relative;
    grid-area: A;
    border: thin solid grey;
    border-radius: 6px;
    padding: 6px;
    width: 15em;
    max-height: 100%;
    transition: all 0.5s;
    backface-visibility: hidden;
    box-shadow: rgba(0, 0, 0, 0.5) 0.5em 0.5em 1em;
  }
  .card > .toggle-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    appearance: none;
    background-color: transparent;
    border: initial;
    z-index: 1;
  }
  .card.front {
    transform: rotateY(0deg);
    pointer-events: all;
    opacity: 100;
  }
  .card.back {
    transform: rotateY(180deg);
    pointer-events: none;
  }
  .card-header {
    font-weight: 700;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .card-header > .card-header-text {
    grow: 1;
  }
  .card.question .card-header {
    text-align: start;
  }
  .card > .trigger-speech-button {
    width: 100%;
    border: unset;
    border-radius: 4px;
    position: relative;
    z-index: 2;
    background-color: rgba(255, 255, 255, 20%);
  }
  .card > .trigger-speech-button:hover {
    background-color: rgba(255, 255, 255, 40%);
  }
  .trigger-speech-button > .speech-button-icon {
    position: absolute;
    top: 0;
    right: 0;
  }
  .card.answer .card-header {
    text-align: end;
  }
  .card.answer .answer {
    font-weight: 600;
  }
  .card {
    background-color: hsl(0, 0%, 85%);
    --default-option: hsl(0, 0%, 85%);
    --unselected-valid-option: hsl(120, 100%, 95%);
    --unselected-invalid-option: hsl(0, 100%, 95%);
    --valid-option: hsl(120, 100%, 75%);
    --invalid-option: hsl(0, 100%, 75%);
  }
  .card[data-variant="valid"] {
    background-color: hsl(120, 100%, 85%);
  }
  .card-container:has(.card[data-variant="invalid"]) {
    animation: shake 0.5s;
  }
  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(-5deg);
    }
    20% {
      transform: rotate(5deg);
    }
    30% {
      transform: rotate(-5deg);
    }
    40% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(-5deg);
    }
    60% {
      transform: rotate(5deg);
    }
    70% {
      transform: rotate(-5deg);
    }
    80% {
      transform: rotate(5deg);
    }
    90% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  .card[data-variant="invalid"] {
    background-color: hsl(0, 100%, 85%);
  }
  .card.question > .options {
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2px;
  }
  .option.selected.valid {
    background-color: var(--selected-valid-option);
  }
  .option.selected.invalid {
    opacity: 60%;

    border-color: hsl(0, 0%, 50%, 0%);
    background-color: var(--selected-invalid-option);
  }
  .option.unselected.valid {
    background-color: var(--unselected-valid-option);
  }
  .option.unselected.invalid {
    opacity: 20%;
    border-color: transparent;
    background-color: var(--unselected-invalid-option);
  }
  .option {
    appearance: initial;
    text-align: start;
    border-width: thin;
    border-style: solid;
    border-color: hsl(0, 0%, 50%);
    border-radius: 4px;
    font-size: 16px;
    padding: 2px;
    appearance: none;
    background-color: var(--default-option);
  }
</style>
