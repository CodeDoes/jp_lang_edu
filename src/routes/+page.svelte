<script lang="ts">
  import type { Action } from "svelte/action";
  import { get_card_data } from "$lib/phrases";
  import Card from "$lib/Card.svelte";
  import { cancelJp, sayJP } from "$lib/tts";
  const card_data = get_card_data(10);
  let focus_index: number = $state(0);
  let scrolling = $state(false);
  const handleVisible: Action<HTMLDivElement> = (node) => {};
  const handleFocus: Action<HTMLDivElement> = (node) => {
    $effect(() => {
      node
        .querySelector(`[data-index="${focus_index}"]`)
        ?.scrollIntoView({ behavior: "smooth", inline: "end" });
    });
  };
  $effect(() => {
    if (scrolling===false) {
      sayJP(card_data[focus_index].question);
    }
  });
  $effect(()=>{
    if(scrolling===true){
      cancelJp()
    }
  })
</script>

<div class="flex h-screen w-screen flex-row overflow-auto">
  <div class="relative size-full overflow-auto">
    <div class="pointer-events-none absolute z-50 size-full">
      <div
        class="mx-auto mt-2 flex size-[2em] items-center justify-center rounded bg-gray-300"
      >
        {focus_index} {scrolling}
      </div>
    </div>
    <div
      class="pointer-events-none absolute z-50 flex size-full flex-row items-center justify-between"
    >
      <button
        tabindex="-1"
        onclick={() => {
          if (focus_index > 0) {
            scrolling = true;
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
            scrolling = true;
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
        scrolling = false;
      }}
      class="absolute size-full snap-x snap-mandatory overflow-auto text-nowrap"
    >
      {#each card_data as card, i}
        <div
          class="inline-flex size-full snap-center items-center justify-center border-x align-middle"
          onfocusin={(e) => {
            console.log("scroll to", i);
            focus_index = i;
            e.currentTarget.scrollIntoView({ behavior: "smooth" });
          }}
          data-index={i}
          bind:focused={
            () => focus_index === i,
            (v) => {
              if (v === true) {
                scrolling = true;
                focus_index = i;
              }
            }
          }
        >
          <Card {...card} />
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
    {#each card_data as card, i}
      <button
        onclick={() => {
          scrolling=true
          focus_index = i;
        }}
        class="overflow-hidden rounded border bg-gray-400/50 p-1 text-start text-xs text-nowrap text-ellipsis"
        >{card.question}&zwj;</button
      >
    {/each}
  </div>
</div>
