import React, { useState, useEffect } from "react";
import Count from "./Components/Count";
import "./App.css";


function App() {

  let [count, setCount] = useState(0)
  let [inputValue, setInputValue] = useState();
  let [startCount, setStartCount] = useState(false);
  let [formValue, setFormValue] = useState();
  let [startDisable, setStartDisabled] = useState(false);
  let [time, setTime] = useState("seconds");
  let [status, setStatus] = useState("Start");

  let [sm, setSM] = useState("");

  let userInput = (e) => {
    if (e.target.value >= 0) {
      setFormValue();
      setInputValue(e.target.value);
    } else {
      alert("Please insert a postive number");
      setFormValue("");
    }
  }

  let t = new Date();


  // Grab user input as they type and store into state
  let startTimer = () => {

    if (count > 0) {
      setCount(count);
      setStartCount(true);
      setStartDisabled(true)
    }

    if (inputValue > 0) {
      setStartCount(true);
      //disable start button
      setStartDisabled(true)
      setCount(inputValue);
      setFormValue("");
    }
  }

  // Subtract 1 from count
  let countDown = () => {
    setCount(count - 1);
  }

  let stopCount = () => {
    setStartCount(false);
    setStartDisabled(false);
    setInputValue(0);
  }

  let timeChange = (e) => {
    setTime(e.target.value)
  }


  useEffect(() => {
    document.title = `Timer: ${count}`;

    if (time === "seconds") {

      if (startCount === true && count > 0) {
        setTimeout(countDown, 1000);
        setSM("s");
      }

      if (count === 0) {
        setStartDisabled(false);
        setStatus("Start");
        setCount("Beep");
        setSM("");
      }

    } else if (time === "minutes") {
      setTimeout(countDown, 60000);
      setSM("m");

      if (count === 0 || isNaN(count)) {
        setStartDisabled(false);
        setStatus("Start");
        setCount("Beep");
        setSM("");
      }
    }


  }, [count, startCount])


  return (
    <div className="App">
      <input className="userInput" type="" onChange={userInput} placeholder="Time" value={formValue}></input>

      <label for="options" className="optionLabel">Time</label>

      <select name="time" className="options" value={time} onChange={timeChange}>
        <option value="seconds">Seconds</option>
        <option value="minutes">Minutes</option>
      </select>

      <button className="clickBTN" disabled={startDisable} onClick={startTimer}>{status}</button>

      <button className="clickBTN" onClick={stopCount} type="button">Stop</button>

      <Count value={`${count}${sm}`} />

      {t.getSeconds()}
      {/* {time}<br></br>
      {count} */}

    </div>
  );
}

export default App;
