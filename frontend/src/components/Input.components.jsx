export default function Input({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-blue-500"
    />
  );
}