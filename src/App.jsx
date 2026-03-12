import { useState } from "react";
import { useCharCount } from "./hooks/useCharCount";
import { useCFPForm } from "./hooks/useCFPForm";
import { useRequired } from "./hooks/useRequired";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    title,
    setTitle,
    abstract,
    setAbstract,
    reset,
  } = useCFPForm();

  const [prev, setCFPs] = useState([]);
  const titleCount = useCharCount(title);
  const abstractCount = useCharCount(abstract);
  const firstNameRequired = useRequired(firstName, "姓");
  const lastNameRequired = useRequired(lastName, "名");
  const titleRequired = useRequired(title, "タイトル");
  const abstractRequired = useRequired(abstract, "セッション説明");

  const addCFP = () => {
    const results = [
      firstNameRequired.validate(),
      lastNameRequired.validate(),
      titleRequired.validate(),
      abstractRequired.validate(),
    ];

    const valid = results.every(Boolean);

    if (!valid) return;

    setCFPs([
      ...prev,
      {
        id: Date.now(),
        firstName: firstName,
        lastName: lastName,
        title: title,
        abstract: abstract,
      },
    ]);
    reset();
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
              id="firs-name-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="姓を入力"
              className="name-input form-control"
            />
            {firstNameRequired.error && (
              <p className="text-danger h6">{firstNameRequired.error}</p>
            )}
          </div>

          <div className="col">
            <label htmlFor="name-input" className="form-label">
              名：
            </label>
            <input
              id="last-name-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="名を入力"
              className="name-input form-control"
            />
            {lastNameRequired.error && (
              <p className="text-danger h6">{lastNameRequired.error}</p>
            )}
          </div>
        </div>

        <label htmlFor="title-input" className="form-label">
          タイトル：
        </label>
        <textarea
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力"
          className="form-control"
          rows="3"
        ></textarea>
        {titleRequired.error && (
          <p className="text-danger h6">{titleRequired.error}</p>
        )}
        {titleCount <= 100 ? (
          <p>{titleCount} / 100</p>
        ) : (
          <p>
            <span className="text-danger">{titleCount}</span> / 100
          </p>
        )}

        <label htmlFor="abstract-input" className="form-label">
          セッション説明：
        </label>
        <textarea
          id="abstract-input"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="セッション説明を入力"
          className="form-control"
          rows="5"
        ></textarea>
        {abstractRequired.error && (
          <p className="text-danger h6">{abstractRequired.error}</p>
        )}
        {abstractCount <= 500 ? (
          <p>{abstractCount} / 500</p>
        ) : (
          <p>
            <span className="text-danger h6">{abstractCount}</span> / 500
          </p>
        )}

        <button
          type="submit"
          className="add-button btn btn-primary"
          onClick={addCFP}
        >
          登録
        </button>
      </div>

      <hr className="border border-3"></hr>

      {prev.length === 0 ? (
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
              {prev.map((cfp) => (
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
