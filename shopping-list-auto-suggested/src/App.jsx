import { useEffect, useState } from "react";
import "./App.css";

// ADD DEBOUNCING IN THIS APP:-

// 👉 What is Debouncing?
// Debouncing is a technique in programming that helps improve the performance of web applications by controlling the frequency at which time-consuming tasks are triggered. If a task is triggered too often—like when a user types quickly or rapidly clicks a button—it can lead to performance issues. Debouncing provides a solution by limiting how frequently a function can be executed.

// 👉 Here's a step-by-step approach using setTimeout and clearTimeout to debounce the input field:

// 1. Add a debounceTimeout state to track the timer for debounce.
// 2. In the onChange handler for the input field, clear any existing timer.
// 3. Set a new timer with setTimeout, which will trigger the fetchFood function after the specified delay (e.g., 500ms) if no new keypress happens.

function App() {
  const [food, setFood] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null); // track the timer for debounce.

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFood(value);

    // CLEAR PREVIOUS DEBOUNCE TIMER IF ANY:-
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // SET A NEW DEBOUNCE TIMER
    const newTimeout = setTimeout(() => {
      if (value && value.length >= 2) {
        fetchFood(value);
      }
    }, 500);

    // UPDATE THE DEBOUNCETIMEOUT STATE
    setDebounceTimeout(newTimeout);
  };

  // HANDLE FETCH FOOD LIST
  const fetchFood = async (food) => {
    const url = `https://api.frontendeval.com/fake/food/${food}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setShoppingList(data);
    } catch (error) {
      console.log("Failed to fetch shopping list");
    }
  };

  // HANDLE BUCKET LIST
  const handleShoppingList = (e) => {
    let shoppingItemIdx = e.target.getAttribute("data-id");

    if (shoppingItemIdx) {
      const obj = {
        id: Date.now(),
        item: shoppingList[shoppingItemIdx],
        isChecked: false,
      };
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
    }
    setFood("");
  };

  // HANDLE CHECKED ITEM
  const handleCheckedItem = (id) => {
    const copyBucketList = [...bucketList];

    const updatedBucketList = copyBucketList.map((item) => {
      if (item.id === id) {
        item.isChecked = !item.isChecked;
      }

      return item;
    });

    setBucketList(updatedBucketList);
  };

  // HANDLE DELETE ITEM
  const handleDeleteItem = (id) => {
    const copyBucketList = [...bucketList];

    const newList = copyBucketList.filter((item) => item.id !== id);
    setBucketList(newList);
  };

  // HANDLE ACTIONS
  const handleActions = (e) => {
    const actionId = e.target.getAttribute("data-id");
    const [type, id] = actionId.split(":");

    if (type === "update") {
      handleCheckedItem(Number(id));
    } else if (type === "delete") {
      handleDeleteItem(Number(id));
    }
  };

  return (
    <div className="App">
      <h1>My shopping list</h1>
      {/* INPUT CONTAINER */}
      <div className="input_container">
        <input type="text" value={food} onChange={handleInputChange} />
      </div>
      {/* AUTO SUGGESTION CONTAINER */}
      {/* Using "Event Delegation:- By adding a single event listener to a parent element rather than to individual child elements. This approach is efficient, especially when dealing with dynamically generated lists, as it reduces the number of event listeners in the DOM and can improve performance." */}
      {food && food.length >= 2 && (
        <div className="suggestion_list">
          {shoppingList.map((item, i) => (
            <div
              data-id={i}
              key={i}
              onClick={handleShoppingList}
              className="list_item"
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* BUCKET LIST CONTAINER */}
      <div className="bucket" onClick={handleActions}>
        {bucketList &&
          bucketList.length > 0 &&
          bucketList.map((item) => (
            <div className="bucket_item" key={item.id}>
              {/* CHECKET BUTTON */}
              <button
                data-id={`update:${item.id}`}
                // onClick={() => handleCheckedItem(item.id)}
                className="checked_btn"
              >
                ✓
              </button>
              <div className={item.isChecked ? "strik" : ""}>{item.item}</div>
              <button
                data-id={`delete:${item.id}`}
                // onClick={() => handleDeleteItem(item.id)}
                className="close_btn"
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
