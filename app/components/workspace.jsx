import React from "react";
import Timeline from "./timeline";
import InstrumentPanel from "./instrument_panel";

export default class Workspace extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Timeline />
        <InstrumentPanel />
      </div>
    );
  }
}
