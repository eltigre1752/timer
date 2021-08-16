import "./styles/App.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";

function TimerLengthControl(props) {
  return (
    <div className="length-control">
      <div>{props.title}</div>

      <button value="+" className="btn-level" onClick={props.onClick}>
        <FontAwesomeIcon className="icon lengthBtn" icon={faAngleDoubleUp} />
      </button>

      <div className="btn-level">{props.length}</div>

      <button
        value="-"
        className="btn-level"
        onClick={props.onClick}
        disabled={props.length === 1}
      >
        <FontAwesomeIcon className="icon lengthBtn2" icon={faAngleDoubleDown} />
      </button>
    </div>
  );
}

export default TimerLengthControl;
