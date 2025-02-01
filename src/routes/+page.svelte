<script lang="ts">
  import Card from "$lib/Card.svelte";
  import { phrases } from "$lib/phrases.json";
  import { Chance } from "chance";
  const chance = new Chance(5124312);
  const card_data = Object.values(phrases)
    .slice(0, 3)
    .map((data, index) => {
      const options = [
        data.english,
        ...chance
          .pickset(
            Object.values(phrases)
              .toSpliced(index, 1)
              .toSorted(
                (a, b) => -Math.abs(a.english.length - b.english.length),
              )
              .slice(0, 4),
            3,
          )
          .map((c) => c.english),
      ];
      return {
        title: "Select Correct English",
        question: data.japanese,
        options: options,
        answer_index: 0,
      };
    });
</script>

<div class=" relative">
  <div class="absolute top-0 left-0 -z-10 flex size-full flex-col lg:flex-row items-center">
    <div class="h-full w-1 bg-black lg:h-1 lg:w-full"></div>
  </div>
  <div
    class=" z-10 flex size-full h-max min-h-screen flex-col items-center gap-5 lg:flex-row lg:justify-center"
  >
    {#each card_data as cd}
      <Card {...cd}></Card>
    {/each}
  </div>
</div>

<style>
</style>
