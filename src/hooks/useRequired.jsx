import { useState } from "react";

export function useRequired(text, label) {
  const [error, setError] = useState("");
  const validate = () => {
    if (!text) {
      setError(`${label}は必須入力です。`);
      return false;
    }
    setError("");
    return true;
  };
  return { error, validate };
}
