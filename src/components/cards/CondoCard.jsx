import Badge from "../ui/Badge";

/**
 * Card das soluções condominiais.
 * size = "lg" para o card de destaque (App de Gestão), "md" para os demais.
 */
export default function CondoCard({ title, size = "md", badge, href = "#" }) {
  const isLarge = size === "lg";

  return (
    <a
      href={href}
      className={`relative block overflow-hidden rounded-xl bg-neutral-300 p-5 transition hover:brightness-105 ${
        isLarge ? "min-h-[420px] md:col-span-2" : "min-h-[280px]"
      }`}
    >
      {badge && (
        <div className="absolute right-3 top-3">
          <Badge variant="gray">{badge}</Badge>
        </div>
      )}

      <h3
        className={`relative z-10 whitespace-pre-line font-semibold uppercase text-neutral-600 ${
          isLarge ? "text-4xl md:text-5xl leading-tight" : "text-2xl leading-tight"
        }`}
      >
        {title}
      </h3>

      {/* Forma decorativa de fundo / imagem do produto entram aqui */}
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-3/4 rounded-full bg-neutral-400/30" />
    </a>
  );
}
