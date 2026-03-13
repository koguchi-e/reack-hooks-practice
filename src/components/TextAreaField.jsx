export function TextAreaField({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  rows,
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
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}
