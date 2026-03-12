import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <>
      <div className="input-form mb-3">
        <h1 className="display-1">Call For Proposals</h1>
        <div className="row">
          <div className="col">
            <label htmlFor="name-input" className="form-label">
              姓：
            </label>
            <input
              id="name-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="姓を入力"
              className="name-input form-control"
            />
          </div>
          <div className="col">
            <label htmlFor="name-input" className="form-label">
              名：
            </label>
            <input
              id="name-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="名を入力"
              className="name-input form-control"
            />
          </div>
        </div>
        <button type="submit" className="add-button btn btn-primary">
          登録
        </button>
      </div>
    </>
  );
}

export default App;
