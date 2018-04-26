import React from "react";
import Tone from "tone";
import Controls from "./control_panels/controls";

export default class Synth extends React.Component {
  constructor(props) {
    super(props);
    this.synth = new Tone.PolySynth().toMaster();
    this.transport = Tone.Transport;
    this.state = {
      synth: this.props.synth
    };
    this.keyDown = this.keyDown.bind(this);
    this.release = this.release.bind(this);
    this.triggerKeyDown = this.triggerKeyDown.bind(this);
    this.triggerRelease = this.triggerRelease.bind(this);
    this.toggleControls = this.toggleControls.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.synth !== nextProps.synth) {
      this.synth.dispose();
      this.setState({ synth: nextProps.synth });
      if (nextProps.synth === "PolySynth") {
        this.synth = new Tone.PolySynth().toMaster();
      } else if (nextProps.synth === "AMSynth") {
        this.synth = new Tone.AMSynth().toMaster();
      } else if (nextProps.synth === "DuoSynth") {
        this.synth = new Tone.DuoSynth().toMaster();
      } else if (nextProps.synth === "FMSynth") {
        this.synth = new Tone.FMSynth().toMaster();
      } else if (nextProps.synth === "MembraneSynth") {
        this.synth = new Tone.MembraneSynth().toMaster();
      } else if (nextProps.synth === "PluckSynth") {
        this.synth = new Tone.PluckSynth().toMaster();
      }
    }
  }

  triggerKeyDown(e) {
    let key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    if (!key) return;
    if (Array.from(key.classList).includes("active")) return;
    key.classList.add("active");
    this.keyDown(key);
  }
  triggerRelease(e) {
    let key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    if (!key) return;
    key.classList.remove("active");
    this.release(key);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.triggerKeyDown);
    document.addEventListener("keyup", this.triggerRelease);
  }

  keyDown(key) {
    let note = key.innerHTML;
    this.synth.triggerAttack(note);
  }

  release(key) {
    if (this.state.synth === "PolySynth") {
      let note = key.innerHTML;
      this.synth.triggerRelease(note);
    } else {
      this.synth.triggerRelease();
    }
  }

  toggleControls() {
    this.refs.controls.toggleControls();
  }

  render() {
    return (
      <div className="outerDiv">
        <ol className="synth">
          <li data-key="65" className="whole noselect">
            C3
          </li>
          <li data-key="87" className="half noselect cs">
            C#3
          </li>
          <li data-key="83" className="whole noselect">
            D3
          </li>
          <li data-key="69" className="half noselect ds">
            D#3
          </li>
          <li data-key="68" className="whole noselect">
            E3
          </li>
          <li data-key="70" className="whole noselect">
            F3
          </li>
          <li data-key="84" className="half noselect fs">
            F#3
          </li>
          <li data-key="71" className="whole noselect">
            G3
          </li>
          <li data-key="89" className="half noselect gs">
            G#3
          </li>
          <li data-key="72" className="whole noselect">
            A3
          </li>
          <li data-key="85" className="half noselect as">
            A#3
          </li>
          <li data-key="74" className="whole noselect">
            B3
          </li>
          <li data-key="75" className="whole noselect">
            C4
          </li>
          <li data-key="79" className="half noselect cstwo">
            C#4
          </li>
          <li data-key="76" className="whole noselect">
            D4
          </li>
          <li data-key="80" className="half noselect dstwo">
            D#4
          </li>
          <li data-key="186" className="whole noselect">
            E4
          </li>
          <li data-key="222" className="whole noselect">
            F4
          </li>
        </ol>
        <div className="button__container">
          <button className="toggle__controls" onClick={this.toggleControls}>
            Controls
          </button>
        </div>
        <Controls ref="controls" synth={this.props.synth} rel={this.synth} />
      </div>
    );
  }
}
