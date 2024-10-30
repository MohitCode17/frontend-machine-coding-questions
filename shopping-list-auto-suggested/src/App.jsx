import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [food, setFood] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);

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

  useEffect(() => {
    if (food && food.length >= 2) {
      fetchFood(food);
    }
  }, [food]);

  return (
    <div className="App">
      <h1>My shopping list</h1>
      {/* INPUT CONTAINER */}
      <div className="input_container">
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
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
