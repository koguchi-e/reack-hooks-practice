import { useState } from "react";

export function useCFPForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");

  const reset = () => {
    setFirstName("");
    setLastName("");
    setTitle("");
    setAbstract("");
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
    reset,
  };
}
