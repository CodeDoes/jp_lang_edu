<script module lang="ts">
  import PhrasesPage from "$lib/PhrasesPage.svelte"
  import { defineMeta } from "@storybook/addon-svelte-csf"
  import phrases_json from "$lib/phrases.json"
  import Chance from "chance"
  const chance = new Chance(4)
  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/PhrasesPage",

    component: PhrasesPage,
    tags: ["autodocs"],

    parameters: {},
  })
  const phrases: {
    english: string
    japanese: string
    slug?: string
    romaji?: string
    notes?: string
    sets: string[]
  }[] = Object.values(phrases_json.phrases)
</script>

<Story
  name="Default"
  args={{
    cards: phrases.slice(0, 10).map((phrase, index) => {
      const indices = chance.shuffle([
        ...chance.shuffle([...phrases.keys()].toSpliced(index, 1)).slice(0,3),
        index,
      ])
      return {
        question: phrase.japanese,
        options: indices.map((i) => phrases[i].english),
        answer_index: indices.indexOf(index),
        selected_index: null,
      }
    }),
  }}
/>
