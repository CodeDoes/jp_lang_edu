export function sayJP(text: string) {
  const synth = window.speechSynthesis;
  cancelJp();
  const utter = new SpeechSynthesisUtterance();
  utter.voice = synth.getVoices().find((v) => v.lang == "ja-JP")!;
  utter.text = text;
  utter.lang = "ja-JP";
  utter.pitch = 1;
  utter.volume = 3;
  utter.rate = 1;
  synth.speak(utter);
  console.log("say:", text,synth);
  return utter
}
export function cancelJp() {
  const synth = window.speechSynthesis;
  if (synth.speaking) {
    synth.cancel();
  }
}
