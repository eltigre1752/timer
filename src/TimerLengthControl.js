import "./App.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

class TimerLengthControl extends React.Component {
  render() {
    return (
      <div className="length-control">
        <div>{this.props.title}</div>

        <button value="-" className="btn-level" onClick={this.props.onClick}>
          <FontAwesomeIcon className="icon" icon={faArrowDown} />
        </button>

        <div className="btn-level">{this.props.length}</div>

        <button value="+" className="btn-level" onClick={this.props.onClick}>
          <FontAwesomeIcon className="icon" icon={faArrowUp} />
        </button>
      </div>
    );
  }
}

export default TimerLengthControl;
