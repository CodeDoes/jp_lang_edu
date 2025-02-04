<script lang="ts">
  import type { get_card_data } from "./phrases";
  import MenuIcon from "virtual:icons/mdi/menu";

  let {
    focus_index,
    card_data,
  }: {
    focus_index: number;
    card_data: ReturnType<typeof get_card_data>;
  } = $props();
</script>

<div
  class={[
    " pointer-events-none absolute right-0 z-50 flex size-full  flex-col overflow-hidden has-[#menu-open:not(:checked)]:overflow-y-scroll lg:w-64 ",
  ]}
>
  <input type="checkbox" name="" id="menu-open" class="peer hidden" />
  <label
    for="menu-open"
    class="pointer-events-auto sticky top-0 z-50 ms-auto h-12 rounded-full bg-red-400/30 transition-all peer-checked:w-max lg:w-60"
  >
    <div
      class="flex w-max items-center justify-center rounded-full bg-red-400 text-3xl"
    >
      <MenuIcon></MenuIcon>
    </div>
  </label>
  <div
    class="group pointer-events-auto sticky top-0 z-40 flex translate-0 flex-col border bg-gray-300 transition peer-checked:translate-x-full -mt-9"
  >
    <div class="size-14"></div>

    <div class="flex size-full flex-row gap-1 p-1">
      <div class="font-semibold">Page</div>
      <div class="flex-grow rounded border bg-gray-400/50 px-2">
        {focus_index}/{card_data.length}
      </div>
    </div>
  </div>
  <div
    class="pointer-events-auto flex h-max w-full translate-0 flex-col gap-0.5 bg-gray-300 p-1 px-1 transition peer-checked:translate-x-full"
  >
    {#each card_data as card, index}
      <a
        href={`#card-${index}`}
        class={[
          "truncate overflow-hidden rounded border p-1 text-start text-xs",
          focus_index == index ? "bg-gray-400" : "bg-gray-400/50",
        ]}>{card.question}&zwj;</a
      >
    {/each}
  </div>
</div>
