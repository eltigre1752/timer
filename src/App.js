import "./App.scss";
import React from "react";
import accurateInterval from "./accurateInterval";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import TimerLengthControl from "./TimerLengthControl";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerType: "session",
      timerState: "stopped",
      timer: 1500,
      intervalID: "",
      alarmColor: { color: "yellowGreen" },
    };

    this.reset = this.reset.bind(this);
    this.clockpify = this.clockpify.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.lengthControl = this.lengthControl.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
  }

  setBreakLength(e) {
    this.lengthControl(
      "breakLength",
      e.currentTarget.value,
      this.state.breakLength,
      "session"
    );
  }

  setSessionLength(e) {
    this.lengthControl(
      "sessionLength",
      e.currentTarget.value,
      this.state.sessionLength,
      "break"
    );
  }

  lengthControl(stateToChange, sign, currentLength, timerType) {
    if (this.state.timerState === "running") {
      return;
    }
    if (this.state.timerType === timerType) {
      if (sign === "-" && currentLength !== 1) {
        this.setState({
          [stateToChange]: currentLength - 1,
        });
      } else if ((sign = "+" && currentLength !== 30)) {
        this.setState({
          [stateToChange]: currentLength + 1,
        });
      }
    } else if (sign === "-" && currentLength !== 1) {
      this.setState({
        [stateToChange]: currentLength - 1,
        timer: currentLength * 60 - 60,
      });
    } else if ((sign = "+" && currentLength !== 30)) {
      this.setState({
        [stateToChange]: currentLength + 1,
        timer: currentLength * 60 + 60,
      });
    }
  }

  timerControl() {
    if (this.state.timerState === "stopped") {
      this.beginCountDown();
      this.setState({ timerState: "running" });
    } else {
      this.setState({ timerState: "stopped" });
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
    }
  }

  beginCountDown() {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000),
    });
  }

  decrementTimer() {
    this.setState({
      timer: this.state.timer - 1,
    });
  }

  phaseControl() {
    let timer = this.state.timer;
    this.warning(timer);
    this.buzzer(timer);
    if (timer < 0) {
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
      if (this.state.timerType === "session") {
        this.beginCountDown();
        this.switchTimer(this.state.breakLength * 60, "break");
      } else {
        this.beginCountDown();
        this.switchTimer(this.state.sessionLength * 60, "session");
      }
    }
  }

  warning(_timer) {
    if (_timer < 61) {
      this.setState({ alarmColor: { color: "#a50d0d" } });
    } else {
      this.setState({ alarmColor: { color: "yellowGreen" } });
    }
  }

  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }

  switchTimer(num, str) {
    this.setState({
      timer: num,
      timerType: str,
      alarmColor: { color: "yellowGreen" },
    });
  }

  clockpify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerType: "session",
      timerState: "stopped",
      timer: 1500,
      intervalID: "",
      alarmColor: { color: "yellowGreen" },
    });
    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  render() {
    return (
      <main>
        <div className="title">HONG VAN's Clock !!!</div>
        <TimerLengthControl
          length={this.state.sessionLength}
          title="Session Length"
          onClick={this.setSessionLength}
        />

        <TimerLengthControl
          length={this.state.breakLength}
          title="Break Length"
          onClick={this.setBreakLength}
        />

        <div className="timer" style={this.state.alarmColor}>
          <div className="timer-wraper">
            <div id="timer-label">{this.state.timerType}</div>
            <div id="time-left">{this.clockpify()}</div>
          </div>
        </div>

        <div className="timer-control">
          <button onClick={this.timerControl}>
            <FontAwesomeIcon className="icon" icon={faPlay} />
            <FontAwesomeIcon className="icon" icon={faStop} />
          </button>
          <button onClick={this.reset}>
            <FontAwesomeIcon className="icon" icon={faSyncAlt} />
          </button>
        </div>

        <audio
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </main>
    );
  }
}

export default App;
