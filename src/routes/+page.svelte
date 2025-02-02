<script lang="ts">
  import type { Action } from "svelte/action";
  import { get_card_data } from "$lib/phrases";
  import Card from "$lib/Card.svelte";
  import { cancelJp, sayJP } from "$lib/tts";
  import { onMount } from "svelte";
  let card_data = $state(get_card_data(0, 40));
  let focus: { index: number; focused: boolean } = $state({
    index: 0,
    focused: true,
  });
  const handleFocus: Action<HTMLDivElement> = (node) => {
    $effect(() => {
      node
        .querySelector(`[data-index="${focus.index}"]`)
        ?.scrollIntoView({ behavior: "smooth", inline: "end" });
    });
  };
  onMount(() => {});
</script>

<div
  class="my_grid_stack grid h-screen w-screen flex-row overflow-auto lg:flex"
>
  <div class="relative size-full overflow-auto">
    {@render main()}
  </div>
  <div class="w-48 flex-col gap-1 border bg-gray-300 p-1 lg:flex">
    {@render menu()}
  </div>
</div>

{#snippet main()}
  <div class="pointer-events-none absolute z-50 size-full">
    <div
      class="mx-auto mt-2 flex size-[2em] items-center justify-center rounded bg-gray-300"
    >
      {focus.index}
    </div>
  </div>
  <div
    class="pointer-events-none absolute z-50 flex size-full flex-row items-center justify-between"
  >
    <button
      tabindex="-1"
      onclick={() => {
        if (focus.index > 0) {
          focus = { index: focus.index - 1, focused: false };
        }
      }}
      class="pointer-events-auto flex aspect-square h-[1em] w-auto items-center justify-center border text-3xl select-none hover:bg-gray-300"
    >
      &lt;
    </button>
    <button
      tabindex="-1"
      onclick={() => {
        if (focus.index < card_data.length) {
          focus = { index: focus.index + 1, focused: false };
        }
      }}
      class="pointer-events-auto flex aspect-square h-[1em] w-auto items-center justify-center border text-3xl select-none hover:bg-gray-300"
    >
      &gt;
    </button>
  </div>
  <div
    use:handleFocus
    onscrollend={(e) => {
      focus = {
        index: Math.floor(
          e.currentTarget.scrollLeft / e.currentTarget.clientWidth,
        ),
        focused: true,
      };
      if (focus.index == card_data.length - 1) {
        card_data = [...card_data, ...get_card_data(card_data.length, 10)];
      }
    }}
    class="absolute size-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden text-nowrap"
  >
    {#each card_data as card, index}
      <div
        class="inline-flex size-full snap-center items-center justify-center border-x"
        data-index={index}
        bind:focused={
          () => focus.index === index,
          (v) => {
            if (v === true && focus.index !== index) {
              focus = { index, focused: false };
            }
          }
        }
      >
        <Card
          {...card}
          speak={focus.index === index && focus.focused}
          onvalid={() => {
            if (focus.index < card_data.length) {
              focus = { index: focus.index + 1, focused: false };
            }
          }}
        />
      </div>
    {/each}
  </div>
{/snippet}
{#snippet menu()}
  <div class="flex flex-row gap-1">
    <div class="font-semibold">Page</div>
    <div class="flex-grow rounded border bg-gray-400/50 px-2">
      {focus.index}/{card_data.length}
    </div>
  </div>
  <div class=" overflow-auto">
    <div class="flex h-max w-full flex-col">
      {#each card_data as card, index}
        <button
          onclick={() => {
            if (focus.index !== index) {
              focus = { index, focused: false };
            }
          }}
          class={[
            "truncate overflow-hidden border-y p-1 text-start text-xs",
            focus.index == index ? "bg-gray-400" : "bg-gray-400/50",
          ]}>{card.question}&zwj;</button
        >
      {/each}
    </div>
  </div>
{/snippet}

<style>
  .my_grid_stack {
    grid-template-areas: A;
  }
  .my_grid_stack > * {
    grid-area: A;
  }
</style>
