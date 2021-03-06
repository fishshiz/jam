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
      bpm: 60,
      recording: false
    };

    Tone.Transport.bpm.value = 60;
    // Tone.Transport.loop = true;
    Tone.Transport.loopEnd = "4m";
    let that = this;
    Tone.Transport.scheduleRepeat(function(time) {
      that.start(time);
      that.loop();
    }, "4n");

    //start the Transport for the events to start
    // Tone.Transport.start();

    this.togglePlay = this.togglePlay.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.submitBPM = this.submitBPM.bind(this);
    this.updateField = this.updateField.bind(this);
    this.loop = this.loop.bind(this);
    this.toggleRecord = this.toggleRecord.bind(this);
  }
  togglePlay() {
    if (this.state.paused) {
      this.setState({ paused: false });

      Tone.Transport.start();
    } else {
      this.setState({ paused: true });
      Tone.Transport.stop();

      this.stop();
    }
  }

  toggleRecord() {
    if (this.state.recording) {
      this.setState({ recording: false });
      document.querySelector(".record_btn").classList.remove("listening");
    } else {
      this.setState({ recording: true });
      document.querySelector(".record_btn").classList.add("listening");
      if(this.state.paused) {
        this.togglePlay();
      }
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

  loop() {
    let progress =
      (Tone.Transport.seconds % Tone.Transport.loopEnd) /
      Tone.Transport.loopEnd;
    progress = progress - Math.floor(progress);
    if (progress > 1) {
      document.getElementById("bar").setAttribute("style", "left: 0");
    } else {
      let num = (progress * 100).toFixed(2);
      document.getElementById("bar").setAttribute("style", `left: ${num}%`);
    }
  }

  submitBPM() {
    let bpm = this.state.bpm;
    Tone.Transport.bpm.value = bpm;
  }

  render() {
    let icon = this.state.paused ? (
      <i className="fas fa-play" />
    ) : (
      <i className="fas fa-pause" />
    );
    return (
      <div className="timeline__container">
        <button onClick={this.togglePlay}>{icon}</button>
        <button className="record_btn" onClick={this.toggleRecord}>
          <i className="fas fa-circle" />
        </button>
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

        <div className="timeline">
          <div id="bar"> </div>
        </div>
      </div>
    );
  }
}
