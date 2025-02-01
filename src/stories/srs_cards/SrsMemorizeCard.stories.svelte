<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf"
  import SrsMemorizeCard from "$lib/srs_cards/SrsMemorizeCard.svelte"
  import phrases_json from "$lib/phrases.json"
  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/SrsMemorizeCard",

    component: SrsMemorizeCard,
    tags: ["autodocs"],

    parameters: {},
  })
  const phrases = Object.values(phrases_json.phrases)
</script>

<Story
  name="Default"
  args={{ question: phrases[0].japanese, answer: phrases[0].english }}
/>
