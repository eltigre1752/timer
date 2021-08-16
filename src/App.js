import "./styles/App.scss";
import React from "react";
import accurateInterval from "./functions/accurateInterval";
import TimerLengthControl from "./TimerLengthControl";
import Timer from "./Timer";
import TimerControls from "./TimerControls";
import Clock from "./Clock";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 20,
      timerType: "Session",
      timerState: "stopped",
      timer: 1200,
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

  setBreakLength({ currentTarget }) {
    this.lengthControl(
      "breakLength",
      currentTarget.value,
      this.state.breakLength,
      "Session"
    );
  }

  setSessionLength({ currentTarget }) {
    this.lengthControl(
      "sessionLength",
      currentTarget.value,
      this.state.sessionLength,
      "Break"
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
      if (this.state.timerType === "Session") {
        this.beginCountDown();
        this.switchTimer(this.state.breakLength * 60, "Break");
      } else {
        this.beginCountDown();
        this.switchTimer(this.state.sessionLength * 60, "Session");
      }
    }
  }

  switchTimer(num, str) {
    this.setState({
      timer: num,
      timerType: str,
      alarmColor: { color: "yellowGreen" },
    });
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
      sessionLength: 20,
      timerType: "Session",
      timerState: "stopped",
      timer: 1200,
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
        <Clock />
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
        <Timer
          alarmColor={this.state.alarmColor}
          timerType={this.state.timerType}
          clockpify={this.clockpify}
        />
        <TimerControls
          handlePlay={this.timerControl}
          handleReset={this.reset}
        />
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
