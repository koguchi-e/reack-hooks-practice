import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [input, setInput] = useState("");

  return (
    <>
      <div>
        <h1 className="display-1">Call For Proposals</h1>
        <div className="input-form mb-3">
          <label htmlFor="name-input" className="form-label">
            名前：
          </label>
          <input
            id="name-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="名前を入力"
            className="name-input form-control"
          />
          <button type="submit" className="add-button btn btn-primary">
            登録
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
