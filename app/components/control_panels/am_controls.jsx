import React from "react";
export default class AMSynthControls extends React.Component {
  constructor(props) {
    super(props);

    this.harmonicityChange = this.harmonicityChange.bind(this);
    this.detuneChange = this.detuneChange.bind(this);
    this.volumeChange = this.volumeChange.bind(this);
  }

  harmonicityChange(e) {
    this.props.rel.harmonicity.value = e.target.value;
  }

  detuneChange(e) {
    this.props.rel.set("detune", e.target.value);
  }

  volumeChange(e) {
    this.props.rel.set("volume", e.target.value);
  }

  render() {
    return (
      <div>
        <label>.harmonicity</label>
        <input
          className="player__slider"
          name="harmonicity"
          type="range"
          min="0"
          max="8"
          step="0.1"
          onChange={this.harmonicityChange}
          onMouseMove={this.harmonicityChange}
        />
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
      </div>
    );
  }
}
