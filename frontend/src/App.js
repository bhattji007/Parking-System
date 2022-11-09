import "./App.css";
import { useState } from "react";

function App() {
  const [plateNum, setPlate] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:5000/vehicle/in", {
        method: "POST",
        body: JSON.stringify({
          PlateNum: plateNum,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setPlate("");
        // setEmail("");
        // setMobileNumber("");
        setMessage("car entered successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={plateNum}
          placeholder="PlateNum"
          onChange={(e) => setPlate(e.target.value)}
        />
        {/* <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        {/* <input
          type="text"
          value={mobileNumber}
          placeholder="Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
        /> */}

        <button type="submit">Send</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

// JSX
export default App;