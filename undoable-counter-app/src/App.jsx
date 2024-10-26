import { useState } from "react";
import "./App.css";
const leftBtns = ["-100", "-10", "-1"];
const rightBtns = ["+1", "+10", "+100"];

// Question:- https://frontendeval.com/questions/undoable-counter

function App() {
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);

  // HANDLE UNDO ACTION
  const handleUndo = () => {
    if (history.length === 0) return;
    // STACK DATA STRUCTURE
    let copyHistory = [...history];
    let lastAction = copyHistory.pop(); // Get the last action from history

    setResult(lastAction.prevResult); // Restore the result to the previous state
    setHistory(copyHistory); // Update history without the last action
    setRedoList([lastAction, ...redoList]); // Add the undone action to the redo list
  };

  // HANDLE REDO ACTION
  const handleRedo = () => {
    if (redoList.length === 0) return;

    const copyRedoList = [...redoList];
    const redoAction = copyRedoList.shift(); // Take the first action from redoList

    setResult(redoAction.currentResult); // Restore the result to the redone state

    setHistory([...history, redoAction]); // Add redone action back to history
    setRedoList(copyRedoList); // Update redoList without the redone action
  };

  // HANDLE MAIN HISTORY
  const handleMainHistory = (key, prevResult, currentResult) => {
    // CREATE AN OBJECT
    const actionEntry = {
      action: key,
      prevResult,
      currentResult,
    };

    setHistory([...history, actionEntry]);
    setRedoList([]); // Clear redoList when new action is taken
  };

  // HANDLE USER INPUT
  const handleUserInput = (key) => {
    const value = parseInt(key);
    const newResult = result + value;

    // HANDLE HISTORY TAKES THREE VALUES:- KEY, PREV RESULT & NEW RESULT
    handleMainHistory(key, result, newResult);
    setResult(newResult);
  };

  return (
    <div className="App">
      <h1 className="title">Undoable Counter</h1>
      <div className="counter_container">
        <div className="action_btn">
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleRedo}>Redo</button>
        </div>
        <div className="user_action">
          {/* LEFT NEGATIVE BUTTONS */}
          {leftBtns.map((btn, i) => (
            <button onClick={() => handleUserInput(btn)} key={i}>
              {btn}
            </button>
          ))}
          {/* RESULT */}
          <div className="result">{result}</div>
          {/* RIGHT POSITIVE BUTTONS */}
          {rightBtns.map((btn, i) => (
            <button onClick={() => handleUserInput(btn)} key={i}>
              {btn}
            </button>
          ))}
        </div>

        {/* HISTORY CONTAINER */}
        <div className="history_container">
          <h3>History</h3>
          {history.map((item, i) => (
            <div className="row" key={i}>
              <div className="left">{item.action}</div>
              <div className="right">
                {`[${item.prevResult} => ${item.currentResult}]`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
