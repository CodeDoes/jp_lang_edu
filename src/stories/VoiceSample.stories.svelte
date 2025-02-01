<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import VoiceSample from '$lib/VoiceSample.svelte';
  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/VoiceSample',
    
    component: VoiceSample,
    tags: ['autodocs'],

    parameters: {
    },
  });
</script>


<Story name="Default" />
