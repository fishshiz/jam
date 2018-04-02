var Tone = require("Tone");

function start() {
  var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
  const ranges = document.querySelectorAll(".player__slider");
  const detune = Array.from(ranges).filter(range => range.name === "detune");
  const volume = Array.from(ranges).filter(range => range.name === "volume");
  console.log(detune[0]);
  detune[0].addEventListener("change", function(e) {
    detuneChange(e.target.value, synth);
  });
  volume[0].addEventListener("change", function(e) {
    console.log(e.target.value);
    volumeChange(e.target.value, synth);
  });
  volume[0].addEventListener("mousemove", volumeChange(volume, synth));
  document.addEventListener("keydown", function(e) {
    let key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    if (!key) return;
    if (Array.from(key.classList).includes("active")) return;
    key.classList.add("active");
    keyDown(key, synth, e);
  });
  document.addEventListener("keyup", function(e) {
    let key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    if (!key) return;
    key.classList.remove("active");
    release(key, synth, e);
  });
}

function detuneChange(range, synth) {
  synth.set("detune", range);
}

function volumeChange(range, synth) {
  if(typeof range === 'object') {
    synth.set("volume", range[0].value);
  } else {
    synth.set("volume", range);
  }
}

function attack(synth, e) {
  synth.triggerAttack(e.target.textContent);
}

function keyDown(key, synth, e) {
  let note = key.innerHTML;
  synth.triggerAttack(note);
}

function release(key, synth, e) {
  let note = key.innerHTML;
  synth.triggerRelease(note);
}
document.addEventListener("DOMContentLoaded", function() {
  start();
});
