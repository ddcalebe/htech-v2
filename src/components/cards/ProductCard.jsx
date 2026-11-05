import htechCloud from "../../assets/logo/htech-nuvem.png";

/**
 * Card de produto (Central de Conversas, PABX...) da seção de Empresas.
 *
 * Card escuro (marinho → quase preto) para ficar em cima da seção azul de Empresas,
 * com uma grade suave e a nuvem da HTech grande ao fundo (marca d'água).
 * Esquerda: badge, título (com degradê), subtítulo e a imagem do produto com um brilho azul atrás.
 * Direita: as características em blocos arredondados com o ícone num círculo branco, e o botão no final.
 *
 * Props:
 *  - badge, title, subtitle, ctaLabel, ctaHref
 *  - features: lista de { title, text, icon? }
 *      title: parte em negrito (curta, ex.: "Todos os contatos")
 *      text:  complemento curto (ex.: "em um só lugar")
 *      icon:  "users" | "funnel" | "clock" | "chat" | "chart" | "phone" | "menu" | "record"
 *  - image | laptopImage + tabletImage + phoneImage
 *  - className
 */

const icons = {
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" />
    </>
  ),
  funnel: <path d="M3 4h18l-7 8v6l-4 2v-8Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h10" />,
  record: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
};

// Ícone padrão de cada característica, pela posição (se a característica não tiver `icon`)
const defaultIcons = ["users", "funnel", "clock", "chat", "chart"];

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
      {icons[name] ?? icons.chat}
    </svg>
  );
}

export default function ProductCard({
  badge,
  title,
  subtitle,
  features = [],
  ctaLabel,
  ctaHref = "#contato",
  image,
  laptopImage,
  tabletImage,
  phoneImage,
  className = "",
}) {
  const hasMockup = laptopImage || tabletImage || phoneImage;

  return (
    <article
      className={`relative isolate grid items-center gap-10 overflow-hidden rounded-3xl p-6 text-white shadow-[0_30px_60px_rgba(4,12,50,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] md:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12 ${className}`}
      style={{ background: "linear-gradient(135deg, #0B1F5E 0%, #0a1846 50%, #071433 100%)" }}
    >
      {/* Grade suave, mais forte perto do título e sumindo nas bordas */}
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

      {/* Marca d'água: nuvem da HTech grande no canto de baixo */}
      <img
        src={htechCloud}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[18%] -right-[8%] -z-10 w-[52%] opacity-[0.06] brightness-0 invert"
      />

      {/* Esquerda: badge, título, subtítulo e imagem */}
      <div className="relative flex min-w-0 flex-col">
        {badge && (
          <span className="self-start rounded bg-white px-2 py-0.5 text-xs font-semibold text-corp">{badge}</span>
        )}
        <h3 className="mt-2 font-display text-4xl font-semibold uppercase leading-[1.05] md:text-5xl">
          <span className="bg-[linear-gradient(135deg,#ffffff_10%,#5AB0FF)] bg-clip-text pb-1 text-transparent">
            {title}
          </span>
        </h3>
        {subtitle && <p className="mt-2 text-lg text-white/80">{subtitle}</p>}

        {/* Imagem com brilho atrás e sombra embaixo, para parecer flutuando */}
        <div className="relative mt-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-[1.6] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.55),rgba(21,61,205,0.2)_55%,transparent)]"
          />

          {hasMockup ? (
            <div className="relative">
              {laptopImage && (
                <img
                  src={laptopImage}
                  alt=""
                  className="relative z-0 ml-auto w-[80%] drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]"
                />
              )}
              {tabletImage && (
                <img
                  src={tabletImage}
                  alt=""
                  className="absolute bottom-0 left-[12%] z-10 w-[45%] drop-shadow-[0_20px_24px_rgba(0,0,0,0.45)]"
                />
              )}
              {phoneImage && (
                <img
                  src={phoneImage}
                  alt=""
                  className="absolute bottom-0 left-0 z-20 w-[15%] drop-shadow-[0_16px_20px_rgba(0,0,0,0.45)]"
                />
              )}
            </div>
          ) : (
            image && (
              <img
                src={image}
                alt=""
                className="relative mx-auto w-full max-w-xl drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]"
              />
            )
          )}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 left-[15%] right-[15%] h-5 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.5),transparent)]"
          />
        </div>
      </div>

      {/* Direita: blocos e botão */}
      <div className="relative z-10 flex min-w-0 flex-col">
        {features.length > 0 && (
          <ul className="grid gap-3">
            {features.map((f, i) => (
              <li
                key={f.title}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] py-2.5 pl-2.5 pr-4 leading-snug"
              >
                <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-white text-corp">
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
          <a
            href={ctaHref}
            className="mt-6 block rounded-xl bg-[#0A84FF] px-6 py-3 text-center text-lg font-semibold text-white shadow-[0_10px_30px_rgba(10,132,255,0.4)] transition-colors hover:bg-[#0670D9]"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </article>
  );
}