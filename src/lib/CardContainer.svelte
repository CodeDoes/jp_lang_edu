<script lang="ts">
  import "../app.css";
  import type { Snippet } from "svelte";

  let {
    children,
    variant = "default",
  }: { children: Snippet; variant: "default" | "selected" } = $props();
</script>

<div class="relative size-max " data-variant={variant}>
  {@render children()}
</div>
