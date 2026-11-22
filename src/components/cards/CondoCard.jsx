import htechCloud from "../../assets/logo/htech-nuvem.png";

/**
 * Card das soluções condominiais, no mesmo estilo do card de produto de Empresas
 * (grade suave, nuvem da Htech como marca d'água, título com degradê, blocos com ícone
 * e botão arredondado), em versão escura para a seção azul clara.
 *
 * Todos os cards têm o mesmo formato: título, descrição curta, destaques (etiquetas), botão e imagem.
 *
 * Props:
 *  - title, description, highlights (lista de etiquetas curtas), badge, ctaLabel, href, image
 *  - tall = true: card alto (ocupa duas fileiras); texto em cima, imagem maior no meio e o botão embaixo dela
 *  - reverse = true: imagem à esquerda e texto à direita (nos cards horizontais)
 *  - className: posição/largura na grade (definida no CondoSolutions)
 */

/** Fundo comum: grade suave + nuvem da Htech como marca d'água */
function CardBackground({ large }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          WebkitMaskImage: "radial-gradient(80% 80% at 30% 40%, #000, transparent)",
          maskImage: "radial-gradient(80% 80% at 30% 40%, #000, transparent)",
        }}
      />
      <img
        src={htechCloud}
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute -z-10 opacity-[0.08] brightness-0 invert ${
          large ? "-bottom-[18%] -right-[6%] w-[42%]" : "-bottom-[20%] -right-[12%] w-[60%]"
        }`}
      />
    </>
  );
}

/** Título com degradê do branco ao azul claro */
function Title({ children, className = "" }) {
  return (
    <h3 className={`whitespace-pre-line font-display font-semibold uppercase leading-[1.05] ${className}`}>
      <span className="bg-[linear-gradient(135deg,#ffffff_10%,#5AB0FF)] bg-clip-text pb-1 text-transparent">
        {children}
      </span>
    </h3>
  );
}

function Cta({ href, children, size = "md" }) {
  return (
    <a
      href={href}
      className={`block rounded-xl bg-condo text-center font-semibold text-navy shadow-[0_10px_24px_rgba(90,176,255,0.3)] transition-colors hover:bg-[#7cc0ff] ${
        size === "sm" ? "px-4 py-2.5 text-sm" : "px-6 py-3 text-lg"
      }`}
    >
      {children}
    </a>
  );
}

export default function CondoCard({
  title,
  badge,
  badgeIcon,
  description,
  highlights = [],
  ctaLabel = "Quero essa solução",
  href = "#",
  image,
  tall = false,
  reverse = false,
  className = "",
}) {
  // Nos cards horizontais, texto e imagem ficam lado a lado só a partir do sm
  const side = !tall;

  return (
    <article
      className={`relative isolate flex overflow-hidden rounded-3xl p-6 text-white shadow-[0_24px_50px_rgba(4,12,50,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] md:p-8 ${className}`}
      style={{ background: "linear-gradient(135deg, #0B1F5E 0%, #0a1846 50%, #071433 100%)" }}
    >
      <CardBackground large={tall} />

      <div className={`relative grid w-full gap-6 ${side ? "sm:grid-cols-2" : "grid-rows-[auto_1fr_auto]"}`}>
        {/* Texto */}
        <div className={`flex min-w-0 flex-col ${side && reverse ? "sm:order-2 sm:items-end sm:text-right" : ""}`}>
          {badge && (
            <span className={`mb-2 inline-flex items-center gap-1 self-start rounded bg-white px-2 py-0.5 text-xs font-semibold text-navy ${side && reverse ? "sm:self-end" : ""}`}>
              {badgeIcon && <img src={badgeIcon} alt="" className="h-4 w-4" />}
              {badge}
            </span>
          )}

          <Title className={tall ? "text-3xl md:text-4xl" : "text-2xl"}>{title}</Title>

          {description && (
            <p className={`mt-3 leading-snug text-white/80 ${tall ? "text-base" : "text-sm"}`}>{description}</p>
          )}

          {/* Destaques em etiquetas */}
          {highlights.length > 0 && (
            <ul className={`mt-4 flex flex-wrap gap-1.5 ${side && reverse ? "sm:justify-end" : ""}`}>
              {highlights.map((h) => (
                <li
                  key={h}
                  className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium"
                >
                  {h}
                </li>
              ))}
            </ul>
          )}

          {/* Nos cards horizontais o botão fica embaixo do texto */}
          {!tall && (
            <div className="mt-auto w-full pt-6">
              <Cta href={href} size="sm">
                {ctaLabel}
              </Cta>
            </div>
          )}
        </div>

        {/* Imagem com brilho azul atrás (ou espaço vazio enquanto não tiver) */}
        <div className={`relative ${side && reverse ? "sm:order-1" : ""}`}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.45),transparent)]"
          />
          {image ? (
            // A imagem fica "por cima" do espaço (absolute), então não aumenta a altura do card
            <div className={`relative h-full overflow-hidden rounded-2xl ${tall ? "min-h-64" : "min-h-40"}`}>
              <img
                src={image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover drop-shadow-[0_20px_24px_rgba(0,0,0,0.45)]"
              />
            </div>
          ) : (
            <div className={`relative h-full rounded-2xl border border-white/10 bg-white/[0.07] ${tall ? "min-h-64" : "min-h-40"}`} />
          )}
        </div>

        {/* No card alto o botão fica embaixo da imagem */}
        {tall && (
          <div className="w-full">
            <Cta href={href} size="sm">
              {ctaLabel}
            </Cta>
          </div>
        )}
      </div>
    </article>
  );
}