import { CharCounter } from "./CharCounter";

export function TextAreaField({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  rows,
  count,
  max,
}) {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="form-control"
      ></textarea>
      <CharCounter count={count} max={max}></CharCounter>
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}
