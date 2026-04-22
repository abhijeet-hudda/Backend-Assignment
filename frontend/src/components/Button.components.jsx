export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-auto p-2 rounded bg-blue-600 hover:bg-blue-700 transition text-white ${className}`}
    >
      {children}
    </button>
  );
}