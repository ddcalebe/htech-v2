// Cores do brilho e da barrinha vertical de cada variação
const colors = {
  blue: {
    glow: "bg-[#0A84FF]",
    bar: "bg-[#0A84FF] shadow-[0_0_16px_#0A84FF]",
  },
  gray: {
    glow: "bg-secondary-gray",
    bar: "bg-secondary-gray shadow-[0_0_16px_var(--color-secondary-gray)]",
  },
};

export default function SectionHeader({ title, eyebrow, align = "left", color = "blue" }) {
  const isRight = align === "right";
  const c = colors[color] ?? colors.blue;

  return (
    <div
      className={`relative z-[3] flex w-full items-center gap-6 overflow-x-clip
        px-6 py-7 text-white md:px-12 md:py-9
        ${isRight ? "flex-row-reverse text-right" : "text-left"}`}
    >
      {/* Brilho que acompanha o lado do título (pode se espalhar para cima e para baixo) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 h-48 w-[28rem] -translate-y-1/2 rounded-full opacity-40 blur-3xl
          ${c.glow}
          ${isRight ? "-right-24" : "-left-24"}`}
      />

      {/* Título */}
      <div className={`relative flex items-center gap-5 ${isRight ? "flex-row-reverse pr-18" : "pl-18"}`}>
        {/* Barra de destaque */}
        <span aria-hidden="true" className={`h-14 w-1 rounded-full ${c.bar}`} />

        <div className="flex flex-col">
          {eyebrow && (
            <span className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-[#5AB0FF]">
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        </div>
      </div>
    </div>
  );
}