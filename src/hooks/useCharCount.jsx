export function useCharCount(text) {
  return text.length;
}

export function CharCounter({ count, max }) {
  return (
    <p>
      {count <= max ? count : <span className="text-danger">{count}</span>} /
      {max}
    </p>
  );
}
