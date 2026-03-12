import { useState } from "react";
import { useCharCount } from "./hooks/useCharCount";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCFPForm } from "./hooks/useCFPForm";
import { useRequired } from "./hooks/useRequired";

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

  const [cfps, setCFPs] = useState([]);
  const titleCount = useCharCount(title);
  const abstractCount = useCharCount(abstract);
  const firstNameRequired = useRequired(firstName, "姓");
  const lastNameRequired = useRequired(lastName, "名");
  const titleRequired = useRequired(title, "タイトル");
  const abstractRequired = useRequired(abstract, "セッション説明");

  const addCFP = () => {
    const valid =
      firstNameRequired.validate() &
      lastNameRequired.validate() &
      titleRequired.validate() &
      abstractRequired.validate();

    if (!valid) return;

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
              id="name-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="姓を入力"
              className="name-input form-control"
            />
            {firstNameRequired.error && (
              <p className="text-danger">{firstNameRequired.error}</p>
            )}
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
            {lastNameRequired.error && (
              <p className="text-danger">{lastNameRequired.error}</p>
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
          <p className="text-danger">{titleRequired.error}</p>
        )}
        {titleCount <= 100 ? (
          <p>{titleCount}文字あります。</p>
        ) : (
          <p>
            {titleCount}文字あります。
            <span className="text-danger">
              文字数オーバーです。100文字以内にしてください。
            </span>
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
          <p className="text-danger">{abstractRequired.error}</p>
        )}
        {abstractCount <= 500 ? (
          <p>{abstractCount}文字あります。</p>
        ) : (
          <p>
            {abstractCount}文字あります。
            <span className="text-danger">
              文字数オーバーです。500文字以内にしてください。
            </span>
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
