export default function Badge({ children, variant = "blue" }) {
  const styles =
    variant === "blue"
      ? "bg-white/15 text-white"
      : "bg-neutral-400/40 text-neutral-600";

  return (
    <span className={`inline-flex items-center gap-2 rounded px-2.5 py-1 text-md ${styles}`}>
      {children}
    </span>
  );
}
