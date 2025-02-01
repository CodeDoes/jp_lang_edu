<script lang="ts">
  let {
    question = "",
    answer = "",
    show_answer = false,
    variant = "default",
  }: {
    question: string
    answer: string
    show_answer: boolean
    variant: "default" | "valid" | "invalid"
  } = $props()
</script>

<button
  type="button"
  class="card-container"
  onclick={() => {
    show_answer = !show_answer
  }}
>
  <div
    class={["card question", show_answer ? "back" : "front"]}
    data-variant={variant}
  >
    <div class="card-header">
      Question 
    </div>
    {#each question.split("\n") as line}
      <p>{line}</p>
    {/each}
  </div>
  <div
    class={["card answer", show_answer ? "front" : "back"]}
    data-variant={variant}
  >
    <div class="card-header">Answer</div>

    {#each answer.split("\n") as line}
      <p>{line}</p>
    {/each}
  </div>
</button>

<style>
  .card-container {
    background-color: unset;
    border: unset;
    padding: unset;
    display: grid;
    grid-area: A;
  }
  .card {
    grid-area: A;
    border: thin solid grey;
    border-radius: 6px;
    padding: 6px;
    transition: all 0.5s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.5) 0.5em 0.5em 1em;
  }
  .card.front {
    transform: rotateY(0deg);
    opacity: 100;
  }
  .card.back {
    transform: rotateY(180deg);
    opacity: 0;
  }
  .card-header {
    font-weight: 700;
  }
  .card.question > .card-header {
    text-align: start;
  }
  .card.answer > .card-header {
    text-align: end;
  }
  .card {
    background-color: hsl(0, 0%, 85%);
  }
  .card[data-variant="valid"] {
    background-color: hsl(120, 100%, 85%);
  }
  .card[data-variant="invalid"] {
    background-color: hsl(0, 100%, 85%);
  }
</style>
