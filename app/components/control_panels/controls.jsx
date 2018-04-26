import React from "react";
import PolySynthControls from "./poly_controls";
import AMSynthControls from "./am_controls";

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewable: false
    };

    this.toggleControls = this.toggleControls.bind(this);
  }

  toggleControls() {
    let div = document.getElementById("control__wrapper");
    if (div.classList.contains("hidden")) div.classList.remove("hidden");
    if (this.state.viewable === false) {
      div.classList.remove("slideOutUp");
      div.classList.add("slideInDown");
      this.setState({ viewable: true });
    } else {
      div.classList.remove("slideInDown");
      div.classList.add("slideOutUp");
      this.setState({ viewable: false });
    }
  }

  render() {
    let panel;
    if (this.props.synth === "PolySynth") {
      panel = (
        <PolySynthControls synth={this.props.synth} rel={this.props.rel} />
      );
    } else if (this.props.synth === "AMSynth") {
      panel = <AMSynthControls synth={this.props.synth} rel={this.props.rel} />;
    }
    return (
      <div id="control__wrapper" className="hidden animated">
        {panel}
      </div>
    );
  }
}
