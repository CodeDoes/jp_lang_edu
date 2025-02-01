<script lang="ts">
  import { browser } from "$app/environment"
  import { onMount } from "svelte"
  import type {
    HTMLButtonAttributes,
    HTMLSelectAttributes,
  } from "svelte/elements"

  let synth: SpeechSynthesis|null = $state(null)
  let voices: any[] = $state([])
  let selectedVoice: string = $state("")
  let utterance: SpeechSynthesisUtterance
  let text = $state("こんにちは")
  onMount(() => {
    if (!browser) {
      return
    }
    const _s = synth = window.speechSynthesis

    function populateVoiceList() {
      voices = _s.getVoices()
      // Find a Japanese voice if available, otherwise use the first voice.
      selectedVoice =
        (voices.find((voice) => voice.lang.startsWith("ja")) || voices[0]).name
    }

    populateVoiceList()
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList
    }
  })

  const speak: HTMLButtonAttributes["onclick"] = () => {
    const _s = synth!
    if (_s.speaking) {
      _s.cancel() // Stop current speech if any to avoid overlapping
    }
    if (text.trim() === "") return // Don't speak if the text is empty or just whitespace

    utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voices.find((v) => v.name == selectedVoice)
    utterance.lang = "ja-JP" // Explicitly set language to Japanese
    utterance.pitch = 1
    utterance.rate = 1

    utterance.onend = () => {
      // console.log('Speech finished.');
    }

    utterance.onerror = (event) => {
      console.error("Speech error:", event.error)
    }

    _s.speak(utterance)
    utterance = utterance
  }
  const handleVoiceChange: HTMLSelectAttributes["onchange"] = (event) => {
    selectedVoice = voices.find((voice) => voice.name === event.currentTarget.value)!.name
  }
</script>
<div class="container">
  <button type="button" onclick={speak}> Play Voice Sample </button>
  {selectedVoice}
  <select bind:value={selectedVoice} onchange={handleVoiceChange}>
    {#each voices as voice}
      <option value={voice.name}>{voice.name} ({voice.lang})</option>
    {/each}
  </select>
  <textarea bind:value={text} placeholder="Enter Japanese text here"></textarea>
</div>

<style >
  button {
    display: inline-block;
    border-radius: 2em;
    border: thin solid black;
    padding: 0.6em 2em;
    background-color: green;
    color: white;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
  }
  .container{
    display:flex;
    flex-direction: column;
    width: max-content;
  }
</style>
