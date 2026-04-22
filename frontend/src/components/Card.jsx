export default function Card({ children }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-lg shadow-md border border-zinc-800 text-white">
      {children}
    </div>
  );
}