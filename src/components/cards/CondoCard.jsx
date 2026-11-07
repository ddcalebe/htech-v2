import htechCloud from "../../assets/logo/htech-nuvem.png";

/**
 * Card das soluções condominiais, no mesmo estilo do card de produto de Empresas
 * (grade suave, nuvem da HTech como marca d'água, título com degradê, blocos com ícone
 * e botão arredondado), em versão escura para a seção azul clara.
 *
 * size = "lg" para o card de destaque (App de Gestão), "md" para os demais.
 * reverse = true coloca a imagem à esquerda e o texto à direita (cards menores).
 * className: largura na grade (ex.: "md:col-span-3"), definida no CondoSolutions.
 * Nos cards menores, texto e imagem ficam lado a lado só em telas grandes (lg); antes disso, empilhados.
 *
 * features (card grande): lista de { title, text, icon? }
 *   icon: "bell" | "calendar" | "door" | "receipt" | "camera" | "box" | "phone" | "key"
 */

const icons = {
  bell: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  door: (
    <>
      <path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17" />
      <path d="M3 21h18M15 12h.01" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="13" height="10" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
    </>
  ),
  box: (
    <>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5Z" />
      <path d="M3 7.5 12 12l9-4.5M12 12v9" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m10.8 12.2 8.7-8.7M17 6l2 2M14.5 8.5l2 2" />
    </>
  ),
};

// Ícone padrão de cada característica, pela posição (se a característica não tiver `icon`)
const defaultIcons = ["bell", "calendar", "door", "receipt"];

function Icon({ name }) {
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
      {icons[name] ?? icons.bell}
    </svg>
  );
}

/** Fundo comum: grade suave + nuvem da HTech como marca d'água */
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
  size = "md",
  badge,
  badgeIcon,
  subtitle,
  description,
  features = [],
  ctaLabel = "Quero essa solução",
  href = "#",
  image,
  reverse = false,
  className = "",
}) {
  const isLarge = size === "lg";

  return (
    <article
      className={`relative isolate overflow-hidden rounded-3xl p-6 text-white shadow-[0_24px_50px_rgba(4,12,50,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] md:p-8 ${
        isLarge ? "md:p-10" : "min-h-[280px]"
      } ${className}`}
      style={{ background: "linear-gradient(135deg, #0B1F5E 0%, #0a1846 50%, #071433 100%)" }}
    >
      <CardBackground large={isLarge} />

      {isLarge ? (
        /* Card grande: badge, título e subtítulo à esquerda; blocos e botão à direita */
        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="flex min-w-0 flex-col">
            {badge && (
              <span className="inline-flex items-center gap-1 self-start rounded bg-white px-2 py-0.5 text-xs font-semibold text-navy">
                {badgeIcon && <img src={badgeIcon} alt="" className="h-4 w-4" />}
                {badge}
              </span>
            )}
            <Title className="mt-2 text-4xl md:text-5xl">{title}</Title>
            {subtitle && <p className="mt-3 whitespace-pre-line text-lg text-white/80">{subtitle}</p>}
          </div>

          <div className="relative z-10 flex min-w-0 flex-col">
            {features.length > 0 && (
              <ul className="grid gap-3">
                {features.map((f, i) => (
                  <li
                    key={f.title}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] py-2.5 pl-2.5 pr-4 leading-snug"
                  >
                    <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-white text-navy">
                      <Icon name={f.icon ?? defaultIcons[i % defaultIcons.length]} />
                    </span>
                    <span>
                      <b className="font-bold">{f.title}</b>
                      {f.text && <span className="text-white/85"> {f.text}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {ctaLabel && (
              <div className="mt-6">
                <Cta href={href}>{ctaLabel}</Cta>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Cards menores: metade texto, metade imagem (reverse inverte os lados) */
        <div className="relative grid h-full gap-5 lg:grid-cols-2">
          {/* Texto */}
          <div className={`flex flex-col ${reverse ? "lg:order-2 lg:items-end lg:text-right" : ""}`}>
            <Title className="text-2xl">{title}</Title>

            {description && <p className="mt-3 text-sm leading-snug text-white/80">{description}</p>}

            <div className="mt-auto w-full pt-6">
              <Cta href={href} size="sm">
                {ctaLabel}
              </Cta>
            </div>
          </div>

          {/* Imagem com brilho azul atrás (ou espaço vazio enquanto não tiver) */}
          <div className={`relative ${reverse ? "lg:order-1" : ""}`}>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.45),transparent)]"
            />
            {image ? (
              <img
                src={image}
                alt=""
                className="relative h-full w-full rounded-2xl object-cover drop-shadow-[0_20px_24px_rgba(0,0,0,0.45)]"
              />
            ) : (
              <div className="relative h-full min-h-40 rounded-2xl border border-white/10 bg-white/[0.07]" />
            )}
          </div>
        </div>
      )}
    </article>
  );
}