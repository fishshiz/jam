var Tone = require("Tone");

function start() {
  var synth = new Tone.AMSynth().toMaster();
  document.addEventListener("keydown", function(e) {
    keyDown(synth, e);
  });
  document.addEventListener("keyup", function(e) {
    keyUp(synth, e);
  });
  


  //attach a listener to all of the buttons
  document.querySelectorAll("li").forEach(function(button) {
    button.addEventListener("mouseover", function(e) {
      //play the note on mouse down
      attack(synth, e);
    });
    button.addEventListener("mouseout", function(e) {
      release(synth);
    });
    button.addEventListener("mouseup", function(e) {
      //release on mouseup
      release(synth);
    });
  });
}
function attack(synth, e) {
  synth.triggerAttack(e.target.textContent);
}

const hash = { 65: "C3", 87: "C#3", 83: "D3", 69: "D#3", 68: "E3", 70: "F3", 84: "F#3", 71: "G3", 89: "G#3", 72: "A3", 85: "A#3", 74: "B3", 75: "C4", 79: "C#4", 76: "D4", 80: "D#4", 186: "E4", 222: "F4" };
function keyDown(synth, e) {
  if (Object.keys(hash).includes(e.keyCode.toString())) {
    synth.triggerAttack(hash[e.keyCode]);
  }
}

function keyUp(synth, e) {
  if (Object.keys(hash).includes(e.keyCode.toString())) {
    release(synth);
  }
}
function release (synth) {
synth.triggerRelease();
}
document.addEventListener("DOMContentLoaded", function() {
  start();
});
