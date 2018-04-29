import React from "react";
import Tone from "tone";

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    let player = new Tone.Player(
      "../../audio/metronome/woodblock.wav"
    ).toMaster();
    this.state = {
      player: player,
      paused: true,
      bpm: 60
    };
    Tone.Transport.bpm.value = 60;

    //start the Transport for the events to start
    // Tone.Transport.start();

    this.togglePlay = this.togglePlay.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.submitBPM = this.submitBPM.bind(this);
    this.updateField = this.updateField.bind(this);
  }
  togglePlay() {
    if (this.state.paused) {
      this.state.paused = false;
      let that = this;
      Tone.Transport.scheduleRepeat(function(time) {
          that.start(time);
        }, "4n");
        Tone.Transport.start();
      } else {
      this.state.paused = true;
              Tone.Transport.stop();

      this.stop();
    }
  }

  componentDidMount() {}

  updateField(e) {
    this.setState({ bpm: e.target.value });
  }

  start() {
    this.state.player.start();
  }

  stop() {
    this.state.player.stop();
  }

  submitBPM() {
    let bpm = this.state.bpm;
    Tone.Transport.bpm.value = bpm;
    console.log(this.state.bpm);
  }

  render() {
    return (
      <div className="timeline__container">
        <button onClick={this.togglePlay}>Play</button>
        <form>
          <input
            id="bpm"
            type="number"
            value={this.state.bpm}
            onChange={this.updateField}
          />
          <button type="button" onClick={this.submitBPM}>
            Enter BPM
          </button>
        </form>
        <div className="timeline" />
      </div>
    );
  }
}
