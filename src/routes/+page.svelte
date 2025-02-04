<script lang="ts">
  import type { Action } from "svelte/action";
  import { get_card_data } from "$lib/phrases";
  import Card from "$lib/Card.svelte";
  import { cancelJp, sayJP } from "$lib/tts";
  import { onMount } from "svelte";
  import CardMenu from "$lib/CardMenu.svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  let card_data = $state(get_card_data(0, 40));

  let focus_index = $derived(
    parseInt(/#card-(\d+)/.exec(page?.url.hash || "#card-0")?.at(1) || "0"),
  );
  let focus_focused = $state(false);

  const handleFocus: Action<HTMLDivElement> = (node) => {
    $effect(() => {
      if (!focus_focused) {
        gotoCard(`#card-${focus_index}`);
      }
    });
  };
  function gotoCard(selector: string) {
    focus_focused = false;
    goto(selector, { replaceState: true, noScroll: true });
    // document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<div class="stack h-screen w-screen overflow-hidden">
  {@render main()}
  <CardMenu {card_data} {focus_index} />
</div>

{#snippet main()}
  <div
    class={["flex size-full snap-x snap-mandatory flex-col overflow-x-scroll z-40"]}
    onscrollend={(e) => {
      focus_focused = true;
      goto(
        `#card-${Math.floor(
          e.currentTarget.scrollLeft / e.currentTarget.clientWidth,
        )}`,
      );
      if (focus_index == card_data.length - 1) {
        card_data = [...card_data, ...get_card_data(card_data.length, 10)];
      }
    }}
  >
    <div
      class="sticky top-0 right-0 left-0 z-50 flex w-screen flex-row justify-center rounded border bg-gray-200 p-1"
    >
      <div
        class="min-size-[2em] sticky top-2 mx-auto flex w-max items-center justify-center self-center rounded border border-gray-400 bg-gray-300 px-2"
      >
        {focus_index}/{card_data.length} ({focus_focused})
      </div>
    </div>
    <div
      class="fixed top-0 right-0 bottom-0 left-0 z-30 mx-auto h-full w-1 bg-black pointer-events-none"
    ></div>
    <div
      use:handleFocus
      class="z-40 min-h-screen w-max bg-green-400/20 text-nowrap"
    >
      {#each card_data as card, index}
        <div
          class="mx-auto inline-flex min-h-screen w-screen snap-center items-center justify-center rounded-xl border border-x overflow-y-scroll"
          data-index={index}
          bind:focused={
            () => focus_index === index,
            (v) => {
              if (v === true && focus_index !== index) {
                gotoCard(`#card-${index}`);
              }
            }
          }
        >
          <Card
            {...card}
            speak={focus_index === index && focus_focused}
            onvalid={() => {
              if (focus_index < card_data.length) {
                gotoCard(`#card-${focus_index + 1}`);
              }
            }}
          />
        </div>
      {/each}
    </div>
  </div>
{/snippet}

<style>
  .stack {
    display: grid;
    grid-template-areas: "A";
  }
  .stack > * {
    grid-area: "A";
  }
</style>
