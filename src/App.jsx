import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { useCFPForm } from "./hooks/useCFPForm";
import { useCharCount } from "./hooks/useCharCount";
import { useValidation } from "./hooks/useValidation";

import { TextAreaField } from "./components/TextAreaField";
import { InputField } from "./components/InputField";

import "./App.css";

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

  const [cfps, setCfps] = useState([]);
  const titleCount = useCharCount(title);
  const abstractCount = useCharCount(abstract);
  const firstNameValidation = useValidation(firstName, "姓");
  const lastNameValidation = useValidation(lastName, "名");
  const titleValidation = useValidation(title, "タイトル");
  const abstractValidation = useValidation(abstract, "概要");

  const handleAddCfp = () => {
    const results = [
      firstNameValidation.validate(),
      lastNameValidation.validate(),
      titleValidation.validate(),
      abstractValidation.validate(),
    ];

    const valid = results.every(Boolean);

    if (!valid) return;

    if (titleCount > 100 || abstractCount > 500) {
      return;
    }

    setCfps([
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
        <h1 className="display-1">演題登録</h1>
        <div className="row">
          <div className="col">
            <InputField
              label="姓"
              id="first-name-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="姓を入力"
              error={firstNameValidation.error}
            />
          </div>

          <div className="col">
            <InputField
              label="名"
              id="last-name-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="名を入力"
              error={lastNameValidation.error}
            />
          </div>
        </div>

        <TextAreaField
          label="タイトル"
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力"
          error={titleValidation.error}
          rows={2}
          count={titleCount}
          max={100}
        ></TextAreaField>

        <TextAreaField
          label="概要"
          id="abstract-input"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="概要を入力"
          className="form-control"
          error={abstractValidation.error}
          rows={5}
          count={abstractCount}
          max={500}
        ></TextAreaField>
        <button
          type="submit"
          className="add-button btn btn-primary"
          onClick={handleAddCfp}
        >
          登録
        </button>
      </div>

      <hr className="border border-3"></hr>

      {cfps.length === 0 ? (
        <p>登録はありません。</p>
      ) : (
        <>
          <h2>登録された演題</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">発表者</th>
                <th scope="col">タイトル</th>
                <th scope="col">概要</th>
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
