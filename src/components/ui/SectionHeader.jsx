// Cores do brilho e da barrinha vertical de cada variação
const colors = {
  blue: {
    glow: "bg-[#0A84FF]",
    bar: "bg-[#0A84FF] shadow-[0_0_16px_#0A84FF]",
  },
  gray: {
    glow: "bg-condo",
    bar: "bg-condo shadow-[0_0_16px_var(--color-condo)]",
  },
  // Para seções com fundo azul (Empresas)
  white: {
    glow: "bg-white",
    bar: "bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)]",
  },
  // Para seções com fundo azul claro (Condomínios): texto e barra em marinho
  navy: {
    // Branco bem mais forte: no fundo azul claro, o brilho com 40% quase não aparece
    glow: "bg-white opacity-90",
    bar: "bg-navy shadow-[0_0_16px_rgba(11,31,94,0.35)]",
    text: "text-navy",
    eyebrow: "text-corp",
  },
};

/**
 * Título de seção com barrinha vertical e brilho.
 * O conteúdo usa a mesma largura e o mesmo espaçamento lateral das grades de cards
 * (max-w-[1600px] px-6 md:px-10 2xl:px-16), então a barrinha fica alinhada com a borda dos cards.
 * Se mudar o espaçamento das grades, mude aqui também.
 */
export default function SectionHeader({ title, eyebrow, align = "left", color = "blue" }) {
  const isRight = align === "right";
  const c = colors[color] ?? colors.blue;

  return (
    <div className={`relative z-[3] w-full overflow-x-clip py-7 md:py-9 ${c.text ?? "text-white"}`}>
      {/* Brilho que acompanha o lado do título (pode se espalhar para cima e para baixo) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 h-48 w-[28rem] -translate-y-1/2 rounded-full blur-3xl
          ${c.glow.includes("opacity-") ? c.glow : `${c.glow} opacity-40`}
          ${isRight ? "-right-24" : "-left-24"}`}
      />

      {/* Mesma largura das grades de cards */}
      <div
        className={`relative mx-auto flex max-w-[1600px] items-center px-6 md:px-10 2xl:px-16
          ${isRight ? "justify-end text-right" : "justify-start text-left"}`}
      >
        <div className={`flex items-center gap-5 ${isRight ? "flex-row-reverse" : ""}`}>
          {/* Barra de destaque */}
          <span aria-hidden="true" className={`h-14 w-1 shrink-0 rounded-full ${c.bar}`} />

          <div className="flex flex-col">
            {eyebrow && (
              <span className={`mb-1 text-xs font-medium uppercase tracking-[0.3em] ${c.eyebrow ?? "text-[#5AB0FF]"}`}>
                {eyebrow}
              </span>
            )}
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}