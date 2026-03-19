import { useState } from "react";

export function useCFPForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");

  const [errors, setErrors] = useState({});

  const fields = [
    { key: "firstName", label: "姓", value: firstName },
    { key: "lastName", label: "名", value: lastName },
    { key: "title", label: "タイトル", value: title },
    { key: "abstract", label: "概要", value: abstract },
  ];

  const validate = () => {
    const newErrors = {};

    fields.forEach((field) => {
      if (!field.value) {
        newErrors[field.key] = `${field.label}は必須入力です。`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setFirstName("");
    setLastName("");
    setTitle("");
    setAbstract("");
    setErrors({});
  };

  return {
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
  };
}
