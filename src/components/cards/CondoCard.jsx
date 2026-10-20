import Badge from "../ui/Badge";
import nuvem from "../../assets/bg/nuvem-bg.svg";
import condoIcon from "../../assets/icons/condo-icon.png";

/**
 * Card das soluções condominiais.
 * size = "lg" para o card de destaque (App de Gestão), "md" para os demais.
 *
 * O logo de fundo é um pedaço de um logo grande que fica "atrás" da grade inteira.
 * A posição (--logo-x, --logo-y) e o tamanho (--logo-w) vêm da CondoSolutions.
 */
export default function CondoCard({ title, size = "md", badge, href = "#" }) {
  const isLarge = size === "lg";

  return (
    <a
      href={href}
      data-logo-card
      className={`relative block overflow-hidden rounded-xl bg-neutral-300 p-5 transition hover:brightness-105 ${
        isLarge ? "min-h-[420px] md:col-span-2" : "min-h-[280px]"
      }`}
    >
      {/* Pedaço do logo grande. A cor vem do bg-neutral-400/40 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-neutral-400/40"
        style={{
          maskImage: `url(${nuvem})`,
          WebkitMaskImage: `url(${nuvem})`,
          maskSize: "var(--logo-w) auto",
          WebkitMaskSize: "var(--logo-w) auto",
          maskPosition: "var(--logo-x) var(--logo-y)",
          WebkitMaskPosition: "var(--logo-x) var(--logo-y)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />

      {badge && (
        <div className="absolute right-3 top-3 z-10">
          <Badge variant="gray">
            <img src={condoIcon} alt="" className="h-8 w-8" />
            {badge}
          </Badge>
        </div>
      )}

      <h3
        className={`relative z-10 whitespace-pre-line font-semibold uppercase text-neutral-600 ${
          isLarge ? "text-4xl md:text-5xl leading-tight" : "text-2xl leading-tight"
        }`}
      >
        {title}
      </h3>
    </a>
  );
}