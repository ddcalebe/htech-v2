/**
 * Hub de Integrações: círculo central brilhante ligado às ferramentas integradas.
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

function Node({ label, icon }) {
  return (
    <div className="relative shrink-0">
      <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-[#5AB0FF]/70 bg-[#5AB0FF]/10 text-white">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      {/* Nome embaixo do círculo, sem mudar a altura do item (assim tudo fica centralizado na linha) */}
      <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-xs text-white/70">
        {label}
      </span>
    </div>
  );
}

/** Linha tracejada animada entre os itens (só no desktop/tablet) */
function Line({ reverse = false }) {
  return (
    <div
      aria-hidden="true"
      className={`hub-line hidden h-0.5 min-w-4 flex-1 md:block ${reverse ? "hub-line-rev" : ""}`}
    />
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
          background: repeating-linear-gradient(90deg, #5AB0FF 0 10px, transparent 10px 34px);
          opacity: .75;
          filter: drop-shadow(0 0 3px #5AB0FF);
          animation: hub-flow 1.2s linear infinite;
        }
        .hub-line-rev { animation-name: hub-flow-rev; }
        @keyframes hub-flow { from { background-position: 0 0; } to { background-position: 34px 0; } }
        @keyframes hub-flow-rev { from { background-position: 0 0; } to { background-position: -34px 0; } }

        .hub-ring::before {
          content: ""; position: absolute; inset: 0; border-radius: 9999px; padding: 4px;
          background: conic-gradient(from 0deg, #5AB0FF, #0A84FF, #5AB0FF, #0B2BC4, #5AB0FF);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
          animation: hub-spin 8s linear infinite;
        }
        @keyframes hub-spin { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) {
          .hub-line, .hub-ring::before { animation: none; }
        }
      `}</style>

      {/* Fileira: ferramentas da esquerda — círculo central — ferramentas da direita */}
      <div className="flex flex-col items-center gap-10 md:flex-row md:gap-0">
        {/* Esquerda: as linhas apontam para o centro */}
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-10 md:flex-nowrap md:gap-0">
          {left.map((item, i) => (
            <div key={item.label} className="contents">
              {i > 0 && <Line reverse />}
              <Node {...item} />
            </div>
          ))}
          {left.length > 0 && <Line reverse />}
        </div>

        {/* Círculo central (fim das linhas do CardConnector) */}
        <div
          className="hub-ring relative order-first mx-2 grid h-32 w-32 shrink-0 place-items-center rounded-full bg-[#10151f] shadow-[0_0_40px_rgba(90,176,255,0.45),inset_0_0_24px_rgba(90,176,255,0.15)] md:order-none"
          role="img"
          aria-label={title}
        >
          <Icon name="link" className="relative h-11 w-11 text-white" />
        </div>

        {/* Direita: as linhas saem do centro */}
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-10 md:flex-nowrap md:gap-0">
          {right.length > 0 && <Line />}
          {right.map((item, i) => (
            <div key={item.label} className="contents">
              {i > 0 && <Line />}
              <Node {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Texto */}
      <div className="mt-14 flex flex-col items-center gap-2 text-center md:mt-10">
        <h4 className="text-3xl font-semibold uppercase tracking-wide">{title}</h4>
        {description && <p className="max-w-2xl text-white/80">{description}</p>}
        {linkLabel && (
          <a href={href} className="font-semibold text-[#5AB0FF] transition hover:text-white">
            {linkLabel} →
          </a>
        )}
      </div>
    </div>
  );
}