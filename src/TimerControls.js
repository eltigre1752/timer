import "./styles/App.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

function TimerControls(props) {
  return (
    <div className="timer-controls">
      <button onClick={props.handlePlay}>
        <FontAwesomeIcon className="icon playBtn" icon={faPlay} />
        <FontAwesomeIcon className="icon playBtn" icon={faStop} />
      </button>
      <button onClick={props.handleReset}>
        <FontAwesomeIcon className="icon resetBtn" icon={faSyncAlt} />
      </button>
    </div>
  );
}

export default TimerControls;
