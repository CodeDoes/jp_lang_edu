<script lang="ts">
  import Card from "$lib/Card.svelte";
  import { get_card_data } from "$lib/phrases";
  const card_data = get_card_data();
</script>

<div class=" relative">
  <div
    class="absolute top-0 left-0 -z-10 flex size-full flex-col items-center lg:flex-row"
  >
    <div class="h-full w-1 bg-black lg:h-1 lg:w-full"></div>
  </div>
  <div class="">
    <div
      class="z-10 flex size-max h-max min-h-screen snap-x snap-mandatory flex-row items-center justify-between overflow-auto"
    >
      {#each card_data as cd}
        <div class="flex w-screen snap-center justify-center">
          <Card {...cd}></Card>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
</style>
