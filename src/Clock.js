import "./styles/App.scss";
import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  startInterval() {
    this.intervalID = setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return <div className="clock">{this.state.date.toLocaleTimeString()}</div>;
  }
}

export default Clock;
