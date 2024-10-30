import { useState } from "react";
import "./App.css";

// FORM DATA FOR MULTI-STEP FORM
const data = [
  {
    id: "name",
    label: "Name",
    placeholder: "Your name...",
    inputType: "text",
    buttonText: "Next",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Your email...",
    inputType: "email",
    buttonText: "Next",
  },
  {
    id: "dob",
    label: "DOB",
    placeholder: "",
    inputType: "date",
    buttonText: "Next",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "",
    inputType: "password",
    buttonText: "Submit",
  },
];

function App() {
  const [formData, setFormData] = useState(data);
  const [index, setIndex] = useState(0);
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
  });

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (index === formData.length - 1) {
      alert("Form Submitted.");
      alert(JSON.stringify(formInput));
      return;
    }
    setIndex((prevIndex) => prevIndex + 1);
  };

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setFormInput({ ...formInput, [id]: value });
  };

  // HANDLE BACK
  const handleBack = (e) => {
    e.preventDefault();
    setIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="App">
      <form className="container" onSubmit={handleSubmit}>
        {index > 0 && (
          <a href="/" onClick={handleBack}>
            &lt; Back
          </a>
        )}

        <label>{formData[index].label}</label>
        <input
          id={formData[index].id}
          type={formData[index].inputType}
          placeholder={formData[index].placeholder}
          onChange={handleInputChange}
          value={formInput[formData[index].id]}
        />
        <button>{formData[index].buttonText}</button>
      </form>
    </div>
  );
}

export default App;
