<script lang="ts">
  import "../app.css";
  import { Chance } from "chance";
  import { tick } from "svelte";
  import VolumeIcon from "virtual:icons/mdi/volume-source";
  import type { Action } from "svelte/action";
  const chance = Chance(4512);
  const shine_anim_cls = "animate-shine";
  import { sayJP } from "$lib/tts";
  let {
    title = "",
    question = "",
    options = ["", "", "", ""],
    answer_index = 0,
    selected_indices = $bindable([]),
    variant = "default",
    onvalid,
    oninvalid,
    // floating = false,
    // selected = false,
    // is_active = false,
  }: {
    title?: string;
    question?: string;
    options?: string[];
    answer_index?: number;
    selected_indices?: number[];
    variant?: "default";
    onvalid?: () => void;
    oninvalid?: () => void;
    // floating?: boolean;
    // selected?: boolean;
    // is_active?: boolean;
  } = $props();
</script>

<div
  class="animate-float flex h-max w-64 flex-col gap-1 rounded-lg border bg-gray-300 p-2 shadow-2xl"
>
  <button
    onclick={() => {
      sayJP(question);
    }}
    type="button"
    class="group relative flex min-h-32 flex-col rounded border bg-gray-400"
  >
    <div class="absolute top-0 left-0 size-full group-hover:bg-white/20"></div>
    <div class="size-full p-1">
      <div
        class="flex flex-row items-center gap-1 rounded border p-1 text-start text-xl font-semibold"
      >
        <div class="flex-grow text-xs">{title}</div>
      </div>
      <VolumeIcon class="absolute top-0 right-0 size-8 text-red-400" />
    </div>
    <div
      class="group relative flex size-full cursor-pointer items-center justify-center px-1 text-start text-2xl"
    >
      <div class="relative rounded bg-white/10 font-serif text-wrap">
        {question}
      </div>
    </div>
  </button>
  <div class=" flex flex-grow flex-col">
    <div class=" bg-gray-400/50 px-1 text-xs font-semibold">Options</div>
    <div class="grid size-full auto-rows-fr gap-1 font-serif">
      {#each options as opt, index}
        <button
          type="button"
          onclick={() => {
            selected_indices.push(index);
            console.log(
              "select:",
              index,
              selected_indices,
              selected_indices.includes(index),
            );
            if (index == answer_index) {
              onvalid?.();
            } else {
              oninvalid?.();
            }
          }}
          class={[
            selected_indices.includes(index)
              ? index === answer_index
                ? "bg-green-400"
                : "bg-red-400"
              : "bg-gray-400",
            "group relative  flex min-h-18 cursor-pointer rounded border text-wrap",
          ]}
        >
          <div class="absolute size-full group-hover:bg-white/20"></div>
          <div class="px-1 text-start align-top">{opt}&zwj;</div>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  @reference "tailwindcss/theme";

  :global(html) {
    background-color: theme(--color-gray-100);
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
</style>
