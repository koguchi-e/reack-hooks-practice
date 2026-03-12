import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [cfps, setCFPs] = useState([]);

  const addCFP = () => {
    setCFPs([
      ...cfps,
      {
        id: Date.now(),
        firstName: firstName,
        lastName: lastName,
      },
    ]);
    setFirstName("");
    setLastName("");
    setTitle("");
    setAbstract("");
  };

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
        <label htmlFor="title-input" className="form-label">
          タイトル：
        </label>
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力"
          className="form-control"
        />
        <label htmlFor="abstract-input" className="form-label">
          セッション説明：
        </label>
        <textarea
          id="abstract-input"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="セッション説明を入力"
          className="form-control"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="add-button btn btn-primary"
          onClick={addCFP}
        >
          登録
        </button>
      </div>
      <div className="table-secondary">
        {cfps.map((cfp) => (
          <p key={cfp.id}>
            {cfp.firstName}
            {cfp.lastName}
            {cfp.title}
            {cfp.abstract}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
