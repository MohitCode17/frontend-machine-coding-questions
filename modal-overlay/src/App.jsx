import { useState } from "react";
import "./App.css";

function App() {
  const [isShow, setIsShow] = useState(false);
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);

  const handleOpenModal = () => {
    setIsShow(true);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const handleOfferAccepted = () => {
    setIsOfferAccepted(true);
    setIsShow(false);
  };

  return (
    <div className="App">
      <div className="show_btn_container">
        {!isOfferAccepted && (
          <button onClick={handleOpenModal} className="show_btn">
            Show Offer
          </button>
        )}
        {isOfferAccepted && (
          <p style={{ fontSize: "24px", fontFamily: "cursive" }}>
            Offer Accepted Thanku !
          </p>
        )}
      </div>
      {isShow && (
        <div className="modal" onClick={handleClose}>
          <div className="modal_container" onClick={(e) => e.stopPropagation()}>
            <button className="close_btn" onClick={handleClose}>
              &times;
            </button>
            <div className="modal_content">
              Click the button below to accept our amazing offer!
            </div>
            <button onClick={handleOfferAccepted} className="accept_btn">
              Accept Offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
