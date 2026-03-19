import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { useCFPForm } from "./hooks/useCFPForm";

import { TextAreaField } from "./components/TextAreaField";
import { InputField } from "./components/InputField";

import "./App.css";

const TITLE_MAX_CHARS = 100;
const ABSTRACT_MAX_CHARS = 500;

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
    errors,
    validate,
    reset,
  } = useCFPForm();

  const [cfps, setCfps] = useState([]);

  const titleCount = title.length;
  const abstractCount = abstract.length;

  const handleAddCfp = () => {
    if (!validate()) return;

    if (titleCount > TITLE_MAX_CHARS || abstractCount > ABSTRACT_MAX_CHARS) {
      return;
    }

    setCfps([
      ...cfps,
      {
        id: Date.now(),
        firstName,
        lastName,
        title,
        abstract,
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
              error={errors.firstName}
            />
          </div>

          <div className="col">
            <InputField
              label="名"
              id="last-name-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="名を入力"
              error={errors.lastName}
            />
          </div>
        </div>

        <TextAreaField
          label="タイトル"
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力"
          error={errors.title}
          rows={2}
          count={titleCount}
          max={TITLE_MAX_CHARS}
        />

        <TextAreaField
          label="概要"
          id="abstract-input"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="概要を入力"
          error={errors.abstract}
          rows={5}
          count={abstractCount}
          max={ABSTRACT_MAX_CHARS}
        />

        <button
          type="button"
          className="add-button btn btn-primary"
          onClick={handleAddCfp}
        >
          登録
        </button>
      </div>

      <hr className="border border-3" />

      {cfps.length === 0 ? (
        <p>登録はありません。</p>
      ) : (
        <>
          <h2>登録された演題</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>発表者</th>
                <th>タイトル</th>
                <th>概要</th>
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
