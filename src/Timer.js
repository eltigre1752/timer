import "./styles/App.scss";
import React from "react";

function Timer(props) {
  return (
    <div className="timer" style={props.alarmColor}>
      <div className="timer-wraper">
        <div id="timer-label">{props.timerType}</div>
        <div id="time-left">{props.clockpify()}</div>
      </div>
    </div>
  );
}

export default Timer;
