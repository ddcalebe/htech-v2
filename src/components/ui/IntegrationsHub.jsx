import htechCloud from "../../assets/logo/htech-nuvem.png";

/**
 * Hub de Integrações: círculo central brilhante (com a logo da Htech) ligado às ferramentas integradas.
 * Fica no fim das linhas do CardConnector (abaixo do Agente de IA e do Chatbot).
 *
 * Props:
 *  - integrations: lista de { label, icon } (metade vai para a esquerda, metade para a direita)
 *  - title, description, linkLabel, href
 */

// Ícones genéricos (traço). Para usar outro, adicione aqui e use a chave em `icon`.
const icons = {
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  sheet: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M4 9h16M4 15h16M10 3v18" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  api: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />,
  form: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v2h6V3" />
      <rect x="8" y="9" width="2.5" height="2.5" rx=".5" />
      <path d="M13 10.25h3" />
      <rect x="8" y="14.5" width="2.5" height="2.5" rx=".5" />
      <path d="M13 15.75h3" />
    </>
  ),
};

function Icon({ name, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name] ?? icons.link}
    </svg>
  );
}

function Node({ label, icon, index = 0 }) {
  return (
    <div className="hub-node relative shrink-0" style={{ animationDelay: `${index * -1.3}s` }}>
      {/* Anel de vidro + círculo branco com o ícone */}
      <div className="grid h-[68px] w-[68px] place-items-center rounded-full border border-white/40 bg-white/10 shadow-[0_10px_30px_rgba(4,12,50,0.35)] backdrop-blur-sm">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-corp shadow-[inset_0_-3px_8px_rgba(21,61,205,0.15)]">
          <Icon name={icon} className="h-6 w-6" />
        </div>
      </div>
      {/* Nome numa pílula embaixo do círculo, sem mudar a altura do item */}
      <span className="absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-[#071433]/50 px-2.5 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}

/** Linha tracejada animada entre os itens, com um "pacote" de luz passando (fileira do tablet/computador) */
function Line({ reverse = false, index = 0 }) {
  return (
    <div aria-hidden="true" className="relative h-0.5 min-w-4 flex-1">
      <div className={`hub-line absolute inset-0 ${reverse ? "hub-line-rev" : ""}`} />
      <span
        className={`hub-packet absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.8)] ${
          reverse ? "" : "hub-packet-rev"
        }`}
        style={{ animationDelay: `${index * -0.7}s` }}
      />
    </div>
  );
}

/** Círculo central: anel girando, ondas saindo e a logo da Htech. `small` = versão do celular */
function HubCore({ title, small = false, className = "" }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <span aria-hidden="true" className="hub-pulse absolute inset-0 rounded-full border-2 border-white/60" />
      <span aria-hidden="true" className="hub-pulse absolute inset-0 rounded-full border-2 border-white/60 [animation-delay:-1.5s]" />
      {/* Anel externo fino */}
      <span aria-hidden="true" className="absolute -inset-3 rounded-full border border-white/25" />
      <div
        className={`hub-ring relative grid place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#1b3a9e,#071433_70%)] shadow-[0_0_50px_rgba(255,255,255,0.4),inset_0_0_30px_rgba(90,176,255,0.25)] ${
          small ? "h-28 w-28" : "h-36 w-36"
        }`}
        role="img"
        aria-label={title}
      >
        {/* Logo da Htech num círculo branco */}
        <span
          className={`grid place-items-center rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.5)] ${
            small ? "h-16 w-16" : "h-20 w-20"
          }`}
        >
          <img src={htechCloud} alt="" className={small ? "w-10" : "w-12"} />
        </span>
      </div>
    </div>
  );
}

/**
 * Versão do celular (abaixo de md): a logo no centro e as integrações em volta, numa órbita,
 * cada uma ligada ao centro por uma linha tracejada com luz correndo para dentro.
 */
// Distância de cada integração até o centro, em % da largura do quadro
const ORBIT_RADIUS = 37;

function HubOrbit({ integrations, title }) {
  const count = integrations.length;
  // Começa na diagonal de cima à direita, para nenhum item ficar colado em cima ou embaixo do centro
  const spots = integrations.map((item, i) => {
    const angle = ((-90 + 180 / count + (360 / count) * i) * Math.PI) / 180;
    return {
      ...item,
      x: 50 + ORBIT_RADIUS * Math.cos(angle),
      y: 50 + ORBIT_RADIUS * Math.sin(angle),
    };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] md:hidden">
      {/* Brilho atrás */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent)]"
      />

      {/* Órbita e linhas até o centro */}
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
        <circle
          cx="50"
          cy="50"
          r={ORBIT_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeDasharray="2 5"
          vectorEffect="non-scaling-stroke"
          className="hub-orbit"
        />
        {spots.map((spot, i) => (
          <line
            key={spot.label}
            x1={spot.x}
            y1={spot.y}
            x2="50"
            y2="50"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 10"
            vectorEffect="non-scaling-stroke"
            className="hub-spoke"
            style={{ animationDelay: `${i * -0.3}s` }}
          />
        ))}
      </svg>

      {/* Centro */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <HubCore title={title} small />
      </div>

      {/* Integrações em volta */}
      {spots.map((spot, i) => (
        <div
          key={spot.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
        >
          <Node label={spot.label} icon={spot.icon} index={i} />
        </div>
      ))}
    </div>
  );
}

export default function IntegrationsHub({
  integrations = [],
  title = "Integrações",
  description,
  linkLabel = "Ver integrações",
  href = "#",
  className = "",
}) {
  const half = Math.ceil(integrations.length / 2);
  const left = integrations.slice(0, half);
  const right = integrations.slice(half);

  return (
    <div className={`text-white ${className}`}>
      <style>{`
        .hub-line {
          background: repeating-linear-gradient(90deg, #ffffff 0 10px, transparent 10px 34px);
          opacity: .8;
          filter: drop-shadow(0 0 3px rgba(255,255,255,.6));
          animation: hub-flow 1.2s linear infinite;
        }
        .hub-line-rev { animation-name: hub-flow-rev; }
        @keyframes hub-flow { from { background-position: 0 0; } to { background-position: 34px 0; } }
        @keyframes hub-flow-rev { from { background-position: 0 0; } to { background-position: -34px 0; } }

        .hub-ring::before {
          content: ""; position: absolute; inset: 0; border-radius: 9999px; padding: 4px;
          background: conic-gradient(from 0deg, #ffffff, #5AB0FF, #ffffff, #A8D4FF, #ffffff);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
          animation: hub-spin 8s linear infinite;
        }
        @keyframes hub-spin { to { transform: rotate(360deg); } }

        /* Pacote de luz correndo pela linha, sempre em direção ao centro (rev = da direita para a esquerda) */
        .hub-packet { left: 0; animation: hub-packet 2.4s ease-in-out infinite; }
        .hub-packet-rev { animation-name: hub-packet-rev; }
        @keyframes hub-packet { 0% { left: 0; opacity: 0; } 15%, 85% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
        @keyframes hub-packet-rev { 0% { left: 100%; opacity: 0; } 15%, 85% { opacity: 1; } 100% { left: 0; opacity: 0; } }

        /* Ondas saindo do círculo central */
        .hub-pulse { animation: hub-pulse 3s ease-out infinite; }
        @keyframes hub-pulse { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(1.9); opacity: 0; } }

        /* Celular: linhas tracejadas correndo para o centro e órbita girando devagar */
        .hub-spoke { animation: hub-spoke 1.2s linear infinite; }
        @keyframes hub-spoke { to { stroke-dashoffset: -14; } }
        .hub-orbit { transform-origin: 50px 50px; animation: hub-spin 40s linear infinite; }

        /* Integrações flutuando de leve */
        .hub-node { animation: hub-float 5s ease-in-out infinite; }
        @keyframes hub-float { 50% { translate: 0 -5px; } }

        @media (prefers-reduced-motion: reduce) {
          .hub-line, .hub-ring::before, .hub-packet, .hub-pulse, .hub-node, .hub-spoke, .hub-orbit { animation: none; }
          .hub-packet { display: none; }
        }
      `}</style>

      {/* Celular: logo no centro e integrações em volta */}
      <HubOrbit integrations={integrations} title={title} />

      {/* Tablet e computador: ferramentas da esquerda — círculo central — ferramentas da direita */}
      <div className="relative hidden items-center md:flex">
        {/* Brilho suave atrás de toda a fileira */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-64 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent)]"
        />
        {/* Esquerda: as linhas apontam para o centro */}
        <div className="flex flex-1 items-center justify-center">
          {left.map((item, i) => (
            <div key={item.label} className="contents">
              {i > 0 && <Line reverse index={i} />}
              <Node {...item} index={i} />
            </div>
          ))}
          {left.length > 0 && <Line reverse index={left.length} />}
        </div>

        {/* Círculo central (fim das linhas do CardConnector) */}
        <HubCore title={title} className="mx-3" />

        {/* Direita: as linhas saem do centro */}
        <div className="flex flex-1 items-center justify-center">
          {right.length > 0 && <Line index={0} />}
          {right.map((item, i) => (
            <div key={item.label} className="contents">
              {i > 0 && <Line index={i} />}
              <Node {...item} index={i + left.length} />
            </div>
          ))}
        </div>
      </div>

      {/* Texto */}
      <div className="mt-10 flex flex-col items-center gap-2 text-center md:mt-14">
        <h4 className="text-3xl font-semibold uppercase tracking-wide">
          <span className="bg-[linear-gradient(135deg,#ffffff_10%,#5AB0FF)] bg-clip-text text-transparent">{title}</span>
        </h4>
        {description && <p className="max-w-2xl text-white/80">{description}</p>}
        {linkLabel && (
          <a href={href} className="font-semibold text-white/90 underline-offset-4 transition hover:text-white hover:underline">
            {linkLabel} →
          </a>
        )}
      </div>
    </div>
  );
}