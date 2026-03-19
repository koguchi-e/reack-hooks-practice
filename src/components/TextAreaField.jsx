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
      <p>
        {count <= max ? count : <span className="text-danger">{count}</span>} /
        {max}
      </p>
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}
