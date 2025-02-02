<script lang="ts">
  import type { Action } from "svelte/action";
  import { get_card_data } from "$lib/phrases";
  import Card from "$lib/Card.svelte";
  import { cancelJp, sayJP } from "$lib/tts";
  import { onMount } from "svelte";
  let card_data = $state(get_card_data(0, 40));
  let focus_index: number = $state(0);
  const handleFocus: Action<HTMLDivElement> = (node) => {
    $effect(() => {
      node
        .querySelector(`[data-index="${focus_index}"]`)
        ?.scrollIntoView({ behavior: "smooth", inline: "end" });
    });
  };
  onMount(() => {
    sayJP(card_data[focus_index].question);
  });
</script>

<div class="flex h-screen w-screen flex-row overflow-auto">
  <div class="relative size-full overflow-auto">
    <div class="pointer-events-none absolute z-50 size-full">
      <div
        class="mx-auto mt-2 flex size-[2em] items-center justify-center rounded bg-gray-300"
      >
        {focus_index}
      </div>
    </div>
    <div
      class="pointer-events-none absolute z-50 flex size-full flex-row items-center justify-between"
    >
      <button
        tabindex="-1"
        onclick={() => {
          if (focus_index > 0) {
            cancelJp();
            focus_index = focus_index - 1;
          }
        }}
        class="pointer-events-auto flex aspect-square h-[1em] w-auto items-center justify-center border text-3xl select-none hover:bg-gray-300"
      >
        &lt;
      </button>
      <button
        tabindex="-1"
        onclick={() => {
          if (focus_index < card_data.length) {
            cancelJp();
            focus_index = focus_index + 1;
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
        focus_index = Math.floor(
          e.currentTarget.scrollLeft / e.currentTarget.clientWidth,
        );
        if (focus_index == card_data.length - 1) {
          card_data = [...card_data, ...get_card_data(card_data.length, 10)];
        }
        sayJP(card_data[focus_index].question);
      }}
      class="absolute size-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden text-nowrap"
    >
      {#each card_data as card, i}
        <div
          class="inline-flex size-full snap-center items-center justify-center border-x"
          data-index={i}
          bind:focused={
            () => focus_index === i,
            (v) => {
              if (v === true) {
                cancelJp();
                focus_index = i;
              }
            }
          }
        >
          <Card
            {...card}
            onvalid={() => {
              if (focus_index < card_data.length) {
                focus_index += 1;
              }
            }}
          />
        </div>
      {/each}
    </div>
  </div>
  <div class="flex w-48 flex-col gap-1 border bg-gray-300 p-1">
    <div class="flex flex-row gap-1">
      <div class="font-semibold">Page</div>
      <div class="flex-grow rounded border bg-gray-400/50 px-2">
        {focus_index}/{card_data.length}
      </div>
    </div>
    <div class=" overflow-auto">
      <div class="flex h-max w-full flex-col ">
        {#each card_data as card, i}
          <button
            onclick={() => {
              cancelJp();
              focus_index = i;
            }}
            class={[
              "truncate overflow-hidden p-1 border-y text-start text-xs",
              focus_index == i ? "bg-gray-400" : "bg-gray-400/50",
            ]}>{card.question}&zwj;</button
          >
        {/each}
      </div>
    </div>
  </div>
</div>
