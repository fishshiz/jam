var Tone = require("Tone");
let play = false;

function start() {
  let transport = Tone.Transport;
  transport.loop = true;
  transport.loopStart = "0";
  transport.loopEnd = "4m";
  let btn = document.getElementsByClassName("play")[0];
  btn.addEventListener("click", () => {
    handleClick(transport);
  });
  var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
  const ranges = document.querySelectorAll(".player__slider");
  const detune = Array.from(ranges).filter(range => range.name === "detune");
  const volume = Array.from(ranges).filter(range => range.name === "volume");
  detune[0].addEventListener("change", function(e) {
    detuneChange(e.target.value, synth);
  });
  detune[0].addEventListener("mousemove", function(e) {
    detuneChange(e.target.value, synth);
  });
  volume[0].addEventListener("change", function(e) {
    volumeChange(e.target.value, synth);
  });
  volume[0].addEventListener("mousemove", function(e) {
    volumeChange(e.target.value, synth);
  });
  let beg = 0;
  document.addEventListener("keydown", function(e) {
    let key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    if (!key) return;
    if (Array.from(key.classList).includes("active")) return;
    key.classList.add("active");
    beg = transport.seconds;
    keyDown(key, synth, e);
  });
  document.addEventListener("keyup", function(e) {
    beg = transport.seconds - beg;
    let key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    if (!key) return;
    key.classList.remove("active");
    release(key, synth, e, transport, beg);
  });
}

function detuneChange(range, synth) {
  synth.set("detune", range);
}

function volumeChange(range, synth) {
  if (typeof range === "object") {
    synth.set("volume", range[0].value);
  } else {
    synth.set("volume", range);
  }
}

function keyDown(key, synth, e, transport) {
  let note = key.innerHTML;
  synth.triggerAttack(note);
}

function release(key, synth, e, transport, beg) {
  let note = key.innerHTML;
  
  if (play) {
    transport.schedule(() => {
      
      synth.triggerAttackRelease(note, beg);
    }, transport.seconds - beg);
  }
  synth.triggerRelease(note);
}

function handleClick(transport) {
  if (!play) {
    play = true;
    transport.start();
  } else {
    play = false;
    transport.pause();
  }
}
document.addEventListener("DOMContentLoaded", function() {
  start();
});
