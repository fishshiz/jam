import React from "react";

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.detuneChange = this.detuneChange.bind(this);
    this.volumeChange = this.volumeChange.bind(this);
  }

  handleChange(e) {
    e.target.name === "detune"
      ? this.detuneChange(e.target.value)
      : this.volumeChange(e.target.value);
  }

  detuneChange(value) {
    this.props.synth.set("detune", value);
  }

  volumeChange(value) {
    this.props.synth.set("volume", value);
  }

  render() {
    return (
      <div className="controls">
        <label>.detune</label>
        <input
          className="player__slider"
          name="detune"
          type="range"
          min="-1500"
          max="1500"
          step="1"
          onChange={this.handleChange}
          onMouseMove={this.handleChange}
        />
        <label>.volume</label>
        <input
          className="player__slider"
          name="volume"
          type="range"
          min="-12"
          max="12"
          step="1"
          onChange={this.handleChange}
          onMouseMove={this.handleChange}
        />
      </div>
    );
  }
}
