import { useState } from "react";
import { useCharCount, CharCounter } from "./hooks/useCharCount";
import { useCFPForm } from "./hooks/useCFPForm";
import { useRequired } from "./hooks/useRequired";
import { TextAreaField } from "./components/TextAreaField";
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

  const [cfps, setCFPs] = useState([]);
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

    if (titleCount > 100 || abstractCount > 500) {
      return;
    }

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
            <TextAreaField
              label="姓"
              id="first-name-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="姓を入力"
              error={firstNameRequired.error}
              rows={1}
            ></TextAreaField>
          </div>

          <div className="col">
            <TextAreaField
              label="名"
              id="last-name-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="名を入力"
              error={lastNameRequired.error}
              rows={1}
            ></TextAreaField>
          </div>
        </div>

        <TextAreaField
          label="タイトル"
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力"
          error={titleRequired.error}
          rows={2}
        ></TextAreaField>

        <CharCounter count={titleCount} max={100}></CharCounter>

        <TextAreaField
          label="セッション説明"
          id="abstract-input"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="セッション説明を入力"
          className="form-control"
          error={abstractRequired.error}
          rows={5}
        ></TextAreaField>

        <CharCounter count={abstractCount} max={500}></CharCounter>

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
