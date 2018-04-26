import React from "react";
export default class PolySynthControls extends React.Component {
  constructor(props) {
    super(props);

    this.detuneChange = this.detuneChange.bind(this);
    this.volumeChange = this.volumeChange.bind(this);
    this.voiceChange = this.voiceChange.bind(this);
  }

  detuneChange(e) {
    this.props.rel.set("detune", e.target.value);
  }

  volumeChange(e) {
    this.props.rel.set("volume", e.target.value);
  }

  voiceChange(e) {
    console.log(this.props.rel.voices[0]);
    let arr = [];
    for (let i = 0; i < e.target.value; i++) {
      arr.push(this.props.rel.voices[0]);
    }
    console.log(arr.length);
    // arr.fill(this.props.rel.voices[0]);
    this.props.rel.voices = arr;
  }

  render() {
    return (
      <div>
        <label>.detune</label>
        <input
          className="player__slider"
          name="detune"
          type="range"
          min="-1500"
          max="1500"
          step="1"
          onChange={this.detuneChange}
          onMouseMove={this.detuneChange}
        />
        <label>.volume</label>
        <input
          className="player__slider"
          name="volume"
          type="range"
          min="-12"
          max="12"
          step="1"
          onChange={this.volumeChange}
          onMouseMove={this.volumeChange}
        />
        <label>.voices</label>
        <input
          className="player__slider"
          name="voices"
          type="range"
          min="0"
          max="12"
          step="1"
          onChange={this.voiceChange}
          onMouseMove={this.voiceChange}
        />
        
      </div>
    );
  }
}
