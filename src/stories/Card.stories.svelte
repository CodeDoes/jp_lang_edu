<script module>
  import "../app.css";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent, waitFor, within } from "@storybook/test";
  import Card from "$lib/Card.svelte";
  import { fn } from "@storybook/test";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "card/Card",
    tags: ["autodocs"],
    component: Card,
    parameters: {},
  });
</script>

{#snippet card_snippet()}
  <Card></Card>
{/snippet}
<Story name="default" />

<Story
  name="selected"
  args={{ selection_state: "active", floating: true }}
/>
