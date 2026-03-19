export function InputField({ label, id, value, onChange, placeholder, error }) {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control"
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}
