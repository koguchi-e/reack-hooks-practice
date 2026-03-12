export function TextAreaField({ label, id, value, onChange, error,rows }) {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        className="form-control"
        rows={rows}
      ></textarea>
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}
