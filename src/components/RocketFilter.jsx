export default function RocketFilter({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Filter by name..."
      aria-label="Filter rockets"
      className="w-full rounded border border-gray-300 px-3 py-2 sm:max-w-xs"
    />
  );
}
