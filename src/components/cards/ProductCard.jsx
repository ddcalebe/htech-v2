import htechCloud from "../../assets/logo/htech-nuvem.png";

/**
 * Card de produto (Central de Conversas, PABX...) da seção de Empresas.
 *
 * Card branco em cima da seção azul de Empresas, com uma grade suave e a nuvem da HTech
 * grande ao fundo (marca d'água).
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
 *  - floatingIcons: até 3 imagens de ícone (ex.: WhatsApp, Messenger, Instagram) que flutuam ao lado do título.
 *      Use PNG/SVG com fundo transparente, de qualquer cor: o ícone é pintado com `floatingIconColor`.
 *  - floatingIconColor: cor ou degradê dos ícones (padrão: degradê do azul de empresas ao azul claro)
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

// Posição e tamanho de cada ícone flutuante (até 3), espalhados no espaço ao lado do título
const floatSpots = [
  "left-[6%] top-[4%] h-20 w-20 -rotate-6",   // 1º: WhatsApp (o maior)
  "right-[4%] top-[6%] h-16 w-16 rotate-3",   // 2º: Messenger (menor)
  "left-[44%] top-[58%] h-14 w-14 rotate-6",  // 3º: Instagram
];

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
  floatingIcons = [],
  floatingIconColor = "linear-gradient(135deg, var(--color-corp), #5AB0FF)",
  className = "",
}) {
  const hasMockup = laptopImage || tabletImage || phoneImage;

  return (
    <article
      className={`relative isolate grid items-center gap-10 overflow-hidden rounded-3xl bg-white p-6 text-navy shadow-[0_24px_50px_rgba(4,12,50,0.25)] md:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12 ${className}`}    >
      <style>{`
        /* Ícones dos canais flutuando de leve, cada um num tempo */
        .product-float { animation: product-float 6s ease-in-out infinite; }
        @keyframes product-float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -8px; }
        }
        @media (prefers-reduced-motion: reduce) { .product-float { animation: none; } }
      `}</style>

      {/* Grade suave, mais forte perto do título e sumindo nas bordas */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0B1F5E 1px, transparent 1px), linear-gradient(to bottom, #0B1F5E 1px, transparent 1px)",
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
        className="pointer-events-none absolute -bottom-[18%] -right-[8%] -z-10 w-[52%] opacity-[0.07]"
      />

      {/* Esquerda: badge, título, subtítulo e imagem */}
      <div className="relative flex min-w-0 flex-col">
        {/* Ícones dos canais flutuando no espaço ao lado do título (só em telas grandes) */}
        {floatingIcons.length > 0 && (
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 hidden h-44 w-[38%] lg:block">
            {floatingIcons.slice(0, 3).map((icon, i) => (
              <span
                key={i}
                className={`product-float absolute grid place-items-center rounded-full bg-white shadow-[0_14px_30px_rgba(11,31,94,0.18)] ring-1 ring-[#e1e9fb] ${floatSpots[i]}`}
                style={{ animationDelay: `${i * -1.6}s` }}
              >
                {/* O PNG vira máscara e é pintado com o degradê azul do site (funciona com ícone preto) */}
                <span
                  className="h-[52%] w-[52%]"
                  style={{
                    background: floatingIconColor,
                    WebkitMaskImage: `url(${icon})`,
                    maskImage: `url(${icon})`,
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
              </span>
            ))}
          </div>
        )}

        {badge && (
          <span className="self-start rounded bg-corp px-2 py-0.5 text-xs font-semibold text-white">{badge}</span>
        )}
        <h3 className="mt-2 font-display text-4xl font-semibold uppercase leading-[1.05] md:text-5xl">
          <span className="bg-[linear-gradient(135deg,var(--color-corp),#5AB0FF)] bg-clip-text pb-1 text-transparent">
            {title}
          </span>
        </h3>
        {subtitle && <p className="mt-2 text-lg text-navy/75">{subtitle}</p>}

        {/* Imagem com brilho atrás e sombra embaixo, para parecer flutuando */}
        <div className="relative mt-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-[1.6] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(90,176,255,0.45),transparent)]"
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
            className="pointer-events-none absolute -bottom-3 left-[15%] right-[15%] h-5 rounded-full bg-[radial-gradient(closest-side,rgba(11,31,94,0.35),transparent)]"
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
                className="flex items-center gap-3 rounded-2xl border border-[#e1e9fb] bg-[#f1f5ff] py-2.5 pl-2.5 pr-4 leading-snug"
              >
                <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-corp text-white">
                  <Icon name={f.icon ?? defaultIcons[i % defaultIcons.length]} />
                </span>
                <span>
                  <b className="font-bold">{f.title}</b>
                  {f.text && <span className="text-navy/80"> {f.text}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}

        {ctaLabel && (
          <a
            href={ctaHref}
            className="mt-6 block rounded-xl bg-corp px-6 py-3 text-center text-lg font-semibold text-white shadow-[0_10px_24px_rgba(21,61,205,0.35)] transition-colors hover:bg-[#0B2BA8]"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </article>
  );
}