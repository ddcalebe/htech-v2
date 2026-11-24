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

// Ícones dos tópicos (modo `features`), em traço
const topicIcons = {
  door: (
    <>
      <path d="M5 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" />
      <path d="M3 21h18M13 12h.01" />
    </>
  ),
  qr: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
    </>
  ),
  camera: (
    <>
      <path d="M3 7h12l4-2v10l-4-2H3z" />
      <path d="M7 13v4M5 17h4" />
    </>
  ),
  box: (
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
};

function TopicIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {topicIcons[name] ?? topicIcons.door}
    </svg>
  );
}

/**
 * Card com tópicos, no mesmo formato dos cards de Empresas (ProductCard), mas no visual escuro de Condomínios:
 * esquerda = selo, título, descrição e imagem; direita = tópicos com ícone e o botão no final.
 */
function TopicsCard({ title, badge, description, features, ctaLabel, href, image, className }) {
  return (
    <article
      className={`relative isolate overflow-hidden rounded-3xl p-6 text-white shadow-[0_24px_50px_rgba(4,12,50,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] md:p-10 ${className}`}
      style={{ background: "linear-gradient(135deg, #0B1F5E 0%, #0a1846 50%, #071433 100%)" }}
    >
      <CardBackground large />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        {/* Esquerda */}
        <div className="flex min-w-0 flex-col">
          {badge && (
            <span className="mb-2 self-start rounded bg-white px-2 py-0.5 text-xs font-semibold text-navy">{badge}</span>
          )}
          <Title className="text-3xl md:text-4xl">{title}</Title>
          {description && <p className="mt-3 text-base leading-snug text-white/80">{description}</p>}

          {image && (
            <div className="relative mt-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 aspect-[1.6] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.45),transparent)]"
              />
              <img
                src={image}
                alt=""
                className="relative w-full rounded-2xl drop-shadow-[0_20px_24px_rgba(0,0,0,0.45)]"
              />
            </div>
          )}
        </div>

        {/* Direita: tópicos e botão */}
        <div className="flex flex-col">
          <ul className="flex flex-col gap-3">
            {features.map((f) => (
              <li
                key={f.title}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] py-2.5 pl-2.5 pr-4 leading-snug"
              >
                <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-condo text-navy">
                  <TopicIcon name={f.icon} />
                </span>
                <span>
                  <b className="font-bold">{f.title}</b>
                  {f.text && <span className="text-white/75"> {f.text}</span>}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Cta href={href}>{ctaLabel}</Cta>
          </div>
        </div>
      </div>
    </article>
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
  imageClassName = "",
  largeTitle = false,
  features,
  className = "",
}) {
  // Com `features` (tópicos), o card usa o formato dos cards de Empresas
  if (features?.length) {
    return (
      <TopicsCard
        title={title}
        badge={badge}
        description={description}
        features={features}
        ctaLabel={ctaLabel}
        href={href}
        image={image}
        className={className}
      />
    );
  }

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

          <Title className={tall || largeTitle ? "text-3xl md:text-4xl" : "text-2xl"}>{title}</Title>

          {description && (
            <p className={`mt-3 leading-snug text-white/80 ${tall || largeTitle ? "text-base" : "text-sm"}`}>{description}</p>
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

          {/* Nos cards horizontais o botão fica embaixo do texto (só quando texto e imagem estão lado a lado, a partir de sm) */}
          {!tall && (
            <div className="mt-auto hidden w-full pt-6 sm:block">
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
            <div className={`relative h-full overflow-hidden rounded-2xl ${tall ? "min-h-64" : "min-h-40"} ${imageClassName}`}>
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

        {/* No card alto, e no card horizontal empilhado (celular), o botão é sempre o último elemento */}
        {(tall || side) && (
          <div className={`w-full ${tall ? "" : "sm:hidden"}`}>
            <Cta href={href} size="sm">
              {ctaLabel}
            </Cta>
          </div>
        )}
      </div>
    </article>
  );
}