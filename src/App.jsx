import { useState } from "react";
import { useCharCount } from "./hooks/useCharCount";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [cfps, setCFPs] = useState([]);
  const count = useCharCount(abstract);

  const addCFP = () => {
    setCFPs([
      ...cfps,
      {
        id: Date.now(),
        firstName: firstName,
        lastName: lastName,
        title: title,
        abstract: abstract,
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

      <hr className="border border-3"></hr>

      {cfps.length === 0 ? (
        <p>登録はありません。</p>
      ) : (
        <>
          <h2>登録されたCFP</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">名前</th>
                <th scope="col">タイトル</th>
                <th scope="col">セッション説明</th>
              </tr>
            </thead>
            <tbody>
              {cfps.map((cfp) => (
                <tr key={cfp.id}>
                  <td>
                    {cfp.firstName} {cfp.lastName}
                  </td>
                  <td>{cfp.title}</td>
                  <td>{cfp.abstract}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default App;
