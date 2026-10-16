export default function SectionHeader({
  title,
  eyebrow,
  open,
  onToggle,
  align = "left",
  id,
}) {
  const isRight = align === "right";
  const panelId = id ? `${id}-content` : undefined;

  return (
    <h2 className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`group relative flex w-full items-center justify-between gap-6 overflow-hidden
          bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900
          px-6 py-7 text-white md:px-12 md:py-9
          focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0A84FF]
          ${isRight ? "flex-row-reverse text-right" : "text-left"}`}
      >
        {/* Textura de grade sutil */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Brilho azul que acompanha o lado do título */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 h-48 w-96 -translate-y-1/2 rounded-full bg-[#0A84FF]
            blur-3xl transition-opacity duration-500
            ${isRight ? "-right-24" : "-left-24"}
            ${open ? "opacity-25" : "opacity-10 group-hover:opacity-20"}`}
        />

        {/* Título */}
        <span className={`relative flex items-center gap-5 ${isRight ? "flex-row-reverse" : ""}`}>
          {/* Barra de destaque */}
          <span
            aria-hidden="true"
            className={`w-1 rounded-full bg-[#0A84FF] transition-all duration-500
              ${open ? "h-14 shadow-[0_0_16px_#0A84FF]" : "h-8 group-hover:h-11"}`}
          />

          <span className="flex flex-col">
            {eyebrow && (
              <span className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-[#5AB0FF]">
                {eyebrow}
              </span>
            )}
            <span className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </span>
          </span>
        </span>

        {/* Botão do chevron */}
        <span
          aria-hidden="true"
          className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border
            transition-all duration-300
            ${
              open
                ? "border-[#0A84FF] bg-[#0A84FF] shadow-[0_0_24px_rgba(10,132,255,0.5)]"
                : "border-white/20 bg-white/5 group-hover:border-[#0A84FF]/70 group-hover:bg-[#0A84FF]/10"
            }`}
        >
          <svg
            className={`h-6 w-6 transition-transform duration-500 ease-out ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </span>

        {/* Linha inferior que se expande ao abrir */}
        <span
          aria-hidden="true"
          className={`absolute bottom-0 h-px bg-gradient-to-r from-transparent via-[#0A84FF] to-transparent
            transition-all duration-700 ease-out
            ${isRight ? "right-0" : "left-0"}
            ${open ? "w-full opacity-100" : "w-1/3 opacity-40 group-hover:w-1/2"}`}
        />
      </button>
    </h2>
  );
}