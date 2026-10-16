export default function Badge({ children, variant = "blue" }) {
  const styles =
    variant === "blue"
      ? "bg-white/15 text-white"
      : "bg-neutral-400/40 text-neutral-600";

  return (
    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] ${styles}`}>
      {children}
    </span>
  );
}
