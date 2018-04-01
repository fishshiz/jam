var Tone = require("Tone");

function start() {
  var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
  document.addEventListener("keydown", function(e) {
    let key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    if (!key) return;
    key.classList.add("active");
    keyDown(key, synth, e);
  });
  document.addEventListener("keyup", function(e) {
    let key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    if (!key) return;
    key.classList.remove("active");
    release(key, synth, e);
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
