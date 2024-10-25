import { useState } from "react";
import { accordionData } from "./data";
import "./App.css";

function App() {
  // State to handle single selection (stores the id of the currently selected accordion item)
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  // State to handle multi-selection (stores an array of selected accordion item ids)
  const [selectMulti, setSelectMulti] = useState([]);

  // HANDLE SINGLE SELECTION
  const handleSingleSelection = (currentId) => {
    setSelected(currentId === selected ? null : currentId); // If already selected, deselect it, otherwise select the new one.
  };

  // HANDLE MULTI SELECTION
  const handleMultiSelection = (currentId) => {
    const copyMulti = [...selectMulti]; // Create a copy of the current selected items array.

    // Check if the current id is already in the array (meaning it is selected).
    const findIndexOfCurrentId = copyMulti.indexOf(currentId);

    // If not found, add the current id to the array. If found, remove it (toggle).
    if (findIndexOfCurrentId === -1) copyMulti.push(currentId);
    else copyMulti.splice(findIndexOfCurrentId, 1);

    setSelectMulti(copyMulti);
  };

  return (
    <div className="App">
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        className="multi_btn"
      >
        Enable Multi Selection
      </button>

      {/* Accordion container */}
      <div className="accordion_container">
        {accordionData && accordionData.length > 0 ? (
          accordionData.map((item) => (
            <div
              key={item.id}
              onClick={
                enableMultiSelection
                  ? () => handleMultiSelection(item.id)
                  : () => handleSingleSelection(item.id)
              }
              className="item_container"
            >
              {/* Accordion item header */}
              <div className="item_top">
                <h3 className="item_qus">{item.question}</h3>
                <span
                  className={`action_btn ${
                    selected === item.id ? "rotate" : ""
                  }`}
                >
                  +
                </span>
              </div>

              {/* Accordion content */}
              {enableMultiSelection
                ? selectMulti.indexOf(item.id) !== -1 && (
                    <div className="item_ans">{item.answer}</div>
                  )
                : selected === item.id && (
                    <div className="item_ans">{item.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
}

export default App;
