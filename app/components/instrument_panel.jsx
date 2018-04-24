import React from "react";
import Synth from "./synth";

export default class InstrumentPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      synth: "PolySynth"
    };
    this.change = this.change.bind(this);
  }

  change(e) {
    this.setState({
        synth: e.target.value
    });
  }

  render() {
    return (
        <div>
    <select name="synths" onChange={this.change} value={this.state.synth}>
        <option value="PolySynth">PolySynth</option>
        <option value="AMSynth">AMSynth</option>
        <option value="DuoSynth">DuoSynth</option>
        <option value="FMSynth">FMSynth</option>
        <option value="MembraneSynth">MembraneSynth</option>
        <option value="PluckSynth">PluckSynth</option>
    </select>
    <Synth synth={this.state.synth}/>
    </div>
    );
  }
}
