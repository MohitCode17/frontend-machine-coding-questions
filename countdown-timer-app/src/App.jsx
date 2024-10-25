import { useEffect, useState } from "react";
import "./App.css";

// Question:- Countdown Timer
// Link:- https://frontendeval.com/questions/countdown-timer

function App() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timerId, setTimerId] = useState(null);

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value);

    setTime((prevTime) => {
      let newTime = { ...prevTime, [id]: value };

      // NORMALIZE SECONDS
      if (newTime.seconds >= 60) {
        newTime.minutes += Math.floor(newTime.seconds / 60);
        newTime.seconds = newTime.seconds % 60;
      }

      // NORMALIZE MINUTES
      if (newTime.minutes >= 60) {
        newTime.hours += Math.floor(newTime.minutes / 60);
        newTime.minutes = newTime.minutes % 60;
      }

      return newTime;
    });
  };

  // HANDLE TIMER START
  const handleStartTimer = () => {
    // VALIDATION
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      alert("Please provide valid countdown time.");
      return;
    }
    setIsTimerStart(true);
  };

  // HANDLE RESET TIMER
  const handleResetTimer = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    clearInterval(timerId);
    setIsTimerStart(false);
  };

  // HANDLE PAUSED TIMER
  const handlePausedTimer = () => {
    setIsTimerPaused(true);
    clearInterval(timerId);
  };

  // HANDLE RESUME TIMER
  const handleResumeTimer = () => {
    setIsTimerPaused(false);
    startCountDown();
  };

  // MAIN LOGIC START FROM HERE:- 👇
  const startCountDown = () => {
    const tid = setInterval(() => {
      setTime((prevTime) => {
        const { hours, minutes, seconds } = prevTime;

        // WHEN TIMER REACHES ZERO
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(tid);
          alert("Countdown is over.");
          setIsTimerStart(false);

          return prevTime;
        }

        let newHours = hours,
          newMinutes = minutes,
          newSeconds = seconds;

        if (newSeconds > 0) {
          newSeconds--;
        } else if (newMinutes > 0) {
          newMinutes--;
          newSeconds = 59;
        } else if (newHours > 0) {
          newHours--;
          newMinutes = 59;
          newSeconds = 59;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);
    setTimerId(tid);
  };

  // TRIGGERED WHEN ISTIMERSTART IS CHANGED:-
  useEffect(() => {
    if (isTimerStart && !isTimerPaused) {
      // FUNCTION TO START COUNT DOWN
      startCountDown();
    }

    return () => clearInterval(timerId);
  }, [isTimerStart]);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>

      {/* INPUT TIMER CONTAINER */}
      {!isTimerStart && (
        <div className="timer_container">
          <div className="input_container">
            <input
              type="number"
              id="hours"
              placeholder="HH"
              onChange={handleInputChange}
              min={0}
            />
            <span className="input_container_divider">:</span>
            <input
              type="number"
              id="minutes"
              placeholder="MM"
              onChange={handleInputChange}
              min={0}
            />
            <span className="input_container_divider">:</span>
            <input
              type="number"
              id="seconds"
              placeholder="SS"
              onChange={handleInputChange}
              min={0}
            />
          </div>
          <button onClick={handleStartTimer} className="timer_btn">
            Start
          </button>
        </div>
      )}

      {/* SHOW TIMER CONTAINER*/}
      {isTimerStart && (
        <div className="timer_container">
          <div className="input_container">
            <div className="time">
              {time.hours < 10 ? `0${time.hours}` : time.hours}
            </div>
            <span className="input_container_divider">:</span>
            <div className="time">
              {time.minutes < 10 ? `0${time.minutes}` : time.minutes}
            </div>
            <span className="input_container_divider">:</span>
            <div className="time">
              {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
            </div>
          </div>
          <div className="btn_wrapper">
            {!isTimerPaused && (
              <button onClick={handlePausedTimer} className="timer_btn">
                Pause
              </button>
            )}
            {isTimerPaused && (
              <button onClick={handleResumeTimer} className="timer_btn">
                Resume
              </button>
            )}
            <button onClick={handleResetTimer} className="timer_btn">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
