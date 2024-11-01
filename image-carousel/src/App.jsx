import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // HANDLE FETCH IMAGES
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://www.reddit.com/r/aww/top/.json?t=all");
      const { data } = await res.json();
      setLoading(false);
      const result = data?.children;
      let listOfImages = result
        .filter((item) => item.data.url_overridden_by_dest.includes(".jpg"))
        .map((item) => item.data.url_overridden_by_dest);

      setImages(listOfImages);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // HANDLE ACTION (LEFT OR RIGHT)
  const handleActions = (direction) => {
    const lastIndex = images.length - 1;

    // HANDLE LEFT CLICK
    if (direction === "left") {
      // IF USER AT 0'TH INDEX AND CLICK TO LEFT BUTTON, IMAGE SHOULD BE RENDER LAST ONE.
      if (index === 0) {
        setIndex(lastIndex);
      } else {
        setIndex((idx) => idx - 1);
      }
    } else if (direction === "right") {
      // IF USER ON LAST IMAGE, AND CLICK TO RIGHT BUTTON, SHOULD BE BACK ON 0'TH INDEX
      if (lastIndex === index) {
        setIndex(0);
      } else {
        setIndex((idx) => idx + 1);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="App">
          <div className="container">
            <button onClick={() => handleActions("left")}>{"<"}</button>
            <img src={images[index]} alt="not-found" />
            <button onClick={() => handleActions("right")}>{">"}</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
