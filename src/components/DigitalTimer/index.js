import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    initializedTime: 25,
    minutes: 25,
    seconds: 0,
    isTimerOn: false,
  }

  startTimer = () => {
    this.timerId = setInterval(this.tick, 1000)
    this.setState(prevState => ({
      isTimerOn: !prevState.isTimerOn,
    }))
  }

  stopTimer = () => {
    clearInterval(this.timerId)
    this.setState(prevState => ({
      isTimerOn: !prevState.isTimerOn,
    }))
  }

  resetClock = () => {
    this.setState(prevState => ({
      minutes: prevState.initializedTime,
      seconds: 0,
      isTimerOn: false,
    }))
    clearInterval(this.timerId)
  }

  increaseTimeLimit = () => {
    const {isTimerOn} = this.state
    if (isTimerOn === false) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        initializedTime: prevState.minutes + 1,
      }))
    }
  }

  decreaseTimeLimit = () => {
    const {isTimerOn} = this.state
    if (isTimerOn === false) {
      this.setState(prevState => ({
        minutes:
          prevState.minutes > 1 ? prevState.minutes - 1 : prevState.minutes,
        initializedTime:
          prevState.minutes > 1 ? prevState.minutes - 1 : prevState.minutes,
      }))
    }
  }

  tick = () => {
    const {minutes, seconds} = this.state

    if (seconds <= 0) {
      this.setState(prevState => ({
        seconds: 59,
        minutes: prevState.minutes - 1,
      }))
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }

    if (minutes === 0 && seconds === 0) {
      this.setState(prevState => ({
        minutes: prevState.initializedTime,
        seconds: 0,
        isTimerOn: !prevState.isTimerOn,
      }))
      clearInterval(this.timerId)
    }
  }

  render() {
    const {seconds, minutes, isTimerOn} = this.state
    console.log(minutes, seconds)

    const controlImg = isTimerOn
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const timerImgAlt = isTimerOn ? 'pause icon' : 'play icon'
    const timerStopAndStart = isTimerOn ? this.stopTimer : this.startTimer
    const timerStatus = isTimerOn ? 'Pause' : 'Start'

    return (
      <div className="digital-timer-bg-container">
        <h1>Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="time-container">
            <div className="timer-section">
              <h1 className="timer">
                {minutes >= 0 && minutes < 10 ? `0${minutes}` : minutes}:
                {seconds >= 0 && seconds < 10 ? `0${seconds}` : seconds}
              </h1>
              <p className="timer-status">{isTimerOn ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="digital-timer-controls">
            <div className="controls-section">
              <div className="control-container">
                <img src={controlImg} alt={timerImgAlt} className="cntrl-img" />
                <button
                  type="button"
                  className="cntrl-name"
                  onClick={timerStopAndStart}
                >
                  {timerStatus}
                </button>
              </div>
              <div className="control-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="cntrl-img"
                />
                <button
                  className="cntrl-name"
                  type="button"
                  onClick={this.resetClock}
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="set-timer-limit-heading">Set Timer Limit</p>
            <div className="timer-limit-controls">
              <button
                type="button"
                onClick={this.decreaseTimeLimit}
                className="limit-control"
              >
                -
              </button>
              <p className="timer-limit">25</p>
              <button
                type="button"
                onClick={this.increaseTimeLimit}
                className="limit-control"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
