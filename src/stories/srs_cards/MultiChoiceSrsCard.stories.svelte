<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf"
  import MultiChoiceSrsCard from "$lib/srs_cards/MultiChoiceSrsCard.svelte"
  import phrases_json from "$lib/phrases.json"
  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/MultiChoiceSrsCard",

    component: MultiChoiceSrsCard,
    tags: ["autodocs"],

    parameters: {},
  })
  const phrases = $state(Object.values(phrases_json.phrases))
</script>

{#snippet c1front()}{/snippet}
<Story name="Default" args={{
  question: phrases[0].japanese,
  options: [
    phrases[1].english,
    phrases[0].english,
    phrases[2].english,
    phrases[3].english,
  ],
  valid_index: 1,
}} />
