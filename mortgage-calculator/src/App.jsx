import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState({
    principal: 0,
    interest: 0,
    years: 0,
  });

  const [emi, setEmi] = useState(0);

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value) || 0;

    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const handleCalculateEmi = () => {
    if (input.principal <= 0 || input.interest <= 0 || input.years <= 0) {
      setEmi(0);
      return;
    }

    const principal = input.principal;
    const annualInterestRate = input.interest;
    const years = input.years;

    // Convert annual interest rate to monthly
    const monthlyInterestRate = annualInterestRate / 100 / 12;

    // Calculate Total Number of Payments
    const numberOfPayments = years * 12;

    // Here, we check if the monthly interest rate is 0. This scenario can occur if the annual interest rate is 0%, meaning no interest is charged on the loan.
    if (monthlyInterestRate === 0) {
      const amount = principal / numberOfPayments;
      setEmi(amount);
      return;
    }

    // Calculate EMI using the formula:- EMI= P.r.(1+r)^n / (1+r)^n - 1

    const calcPow = Math.pow(1 + monthlyInterestRate, numberOfPayments); // This calculate - (1+r)^n part.
    const emi = Math.floor(
      (principal * monthlyInterestRate * calcPow) / (calcPow - 1)
    );

    setEmi(emi);
  };

  useEffect(() => {
    handleCalculateEmi();
  }, [input.principal, input.interest, input.years]);

  return (
    <div className="App">
      <div className="container">
        <div className="input_wrapper">
          <p>Principal Loan Amount</p>
          <input
            type="number"
            id="principal"
            placeholder="e.g. 1000000"
            onChange={handleInputChange}
          />
        </div>
        <div className="input_wrapper">
          <p>Rate of Interest (p.a)</p>
          <input
            type="number"
            id="interest"
            placeholder="e.g. 7.8"
            onChange={handleInputChange}
          />
        </div>
        <div className="input_wrapper">
          <p>Loan Tenure (Years)</p>
          <input
            type="number"
            id="years"
            placeholder="e.g. 15"
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleCalculateEmi}>Calculate</button>
      </div>
      <div className="output">
        <p>Your monthly mortgage payment will be Rs. {emi}</p>
      </div>
    </div>
  );
}

export default App;
