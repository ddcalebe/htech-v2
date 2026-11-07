/**
 * CRM em destaque: três telas do sistema abertas em leque (como cartas na mão) e o texto ao lado,
 * unidos por um painel escuro de fundo (as telas passam um pouco do topo do painel).
 * É bem mais estreito que o card de produto acima (max-w-4xl), para parecer um complemento dele.
 * Fica acima do Chatbot e do Agente de IA, ligado a eles pelo CardConnector (invertido).
 *
 * Props:
 *  - title, description
 *  - items: lista de tópicos curtos (ex.: ["Funil de vendas por etapas", ...])
 *  - images: até 3 prints, do fundo para a frente → [atrás, meio, frente]
 *            Sem imagem, aparecem telas de exemplo desenhadas aqui mesmo:
 *            atrás = contatos, meio = relatórios, frente = funil de vendas.
 *  - className
 */

// Posição e giro de cada tela do leque (do fundo para a frente)
const fan = [
  "left-0 top-[14%] -rotate-[9deg]",
  "left-[13%] top-[7%] -rotate-2",
  "left-[26%] top-[2%] rotate-6",
];

/** Moldura de janela comum às telas de exemplo */
function Window({ title, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/60 bg-white text-navy shadow-[0_24px_50px_rgba(4,12,50,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-[#dfe7f5] bg-[#eef3fb] px-3 py-2 text-[11px] font-semibold">
        <i className="h-2 w-2 rounded-full bg-[#c8d4ea]" />
        <i className="h-2 w-2 rounded-full bg-[#c8d4ea]" />
        <i className="h-2 w-2 rounded-full bg-[#c8d4ea]" />
        <span className="ml-1.5">{title}</span>
      </div>
      <div className="aspect-video p-3">{children}</div>
    </div>
  );
}

/** Exemplo: lista de contatos */
function SampleContacts() {
  return (
    <Window title="Contatos">
      <div className="grid gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-[18px] w-[18px] shrink-0 rounded-full bg-[#dbe6fb]" />
            <span className="grid flex-1 gap-1">
              <b className="h-1.5 rounded bg-[#dfe7f5]" />
              <b className="h-1.5 w-[55%] rounded bg-[#dfe7f5]" />
            </span>
            <span className="h-3 w-9 rounded-full bg-[#153DCD]/15" />
          </div>
        ))}
      </div>
    </Window>
  );
}

/** Exemplo: relatórios com números e gráfico de barras */
function SampleReports() {
  const bars = [35, 52, 44, 68, 58, 80, 72, 90, 76, 95];
  const kpis = [
    ["Atendimentos", "1.284"],
    ["Conversão", "32%"],
    ["Tempo médio", "4m"],
  ];
  return (
    <Window title="Relatórios">
      <div className="grid h-full grid-rows-[auto_1fr] gap-2.5">
        <div className="grid grid-cols-3 gap-2">
          {kpis.map(([label, value]) => (
            <span key={label} className="grid rounded-lg bg-[#f3f6fd] px-2 py-1.5">
              <em className="text-[9.5px] not-italic text-navy/60">{label}</em>
              <b className="text-[15px] text-[#153DCD]">{value}</b>
            </span>
          ))}
        </div>
        <div className="flex items-end gap-1.5 border-b border-[#dfe7f5] px-1 pt-1.5">
          {bars.map((h, i) => (
            <i key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#153DCD] to-[#5AB0FF]" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </Window>
  );
}

/** Exemplo: funil de vendas em colunas (fica na frente do leque) */
function SampleFunnel() {
  const cols = [
    { name: "Novo lead", cards: [["Mariana Costa", "WhatsApp"], ["Lucas Pereira", "Instagram"], ["Ana Ribeiro", "Messenger"]] },
    { name: "Negociação", cards: [["Clínica Bem Estar", "R$ 1.200/mês", "hi"], ["Farmácia Life", "Proposta enviada"], ["Pet Shop Amigo", "Reunião marcada"]] },
    { name: "Fechado", cards: [["Jardim das Flores", "✓ Contrato assinado", "ok"], ["Ótica Visão", "✓ Contrato assinado", "ok"]] },
  ];
  return (
    <Window title="Funil de vendas">
      <div className="grid grid-cols-3 items-start gap-2">
        {cols.map((col) => (
          <div key={col.name} className="grid gap-1.5 rounded-lg bg-[#f3f6fd] p-1.5">
            <em className="flex items-center justify-between text-[9.5px] font-bold uppercase not-italic text-navy/60">
              {col.name}
              <span className="rounded-full bg-[#153DCD]/10 px-1.5 text-[#153DCD]">{col.cards.length}</span>
            </em>
            {col.cards.map(([who, info, tone]) => (
              <span
                key={who}
                className={`grid rounded-md border bg-white px-1.5 py-1.5 leading-tight ${
                  tone === "hi" ? "border-[#5AB0FF] ring-1 ring-[#5AB0FF]" : tone === "ok" ? "border-[#b6e8c9] bg-[#e7f8ee]" : "border-[#dfe7f5]"
                }`}
              >
                <b className="truncate text-[10px]">{who}</b>
                <em className={`truncate text-[9px] not-italic ${tone === "ok" ? "font-semibold text-green-700" : "text-navy/60"}`}>{info}</em>
              </span>
            ))}
          </div>
        ))}
      </div>
    </Window>
  );
}

// Telas de exemplo, do fundo para a frente
const samples = [SampleContacts, SampleReports, SampleFunnel];

export default function CrmShowcase({
  title = "CRM",
  description,
  items = [],
  images = [],
  className = "",
}) {
  return (
    <div className={`relative isolate mx-auto grid w-full max-w-4xl items-center gap-8 px-6 pb-7 pt-2 text-white md:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:pb-8 ${className}`}>
      {/* Fundo que une as telas e o texto: painel escuro (mesmos tons do blob dos chats), com grade suave e
          contorno branco fino. Começa um pouco abaixo do topo, para as telas "saírem" dele. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[12%] -z-10 overflow-hidden rounded-3xl border border-white/20 shadow-[0_30px_60px_rgba(4,12,50,0.35)]"
        style={{ background: "linear-gradient(135deg, rgba(11,31,94,0.85) 0%, rgba(7,20,51,0.75) 100%)" }}
      >
        <span
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            WebkitMaskImage: "radial-gradient(80% 80% at 30% 50%, #000, transparent)",
            maskImage: "radial-gradient(80% 80% at 30% 50%, #000, transparent)",
          }}
        />
        {/* Brilho azul atrás das telas */}
        <span className="absolute -left-[10%] top-1/2 aspect-square w-[60%] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,132,255,0.45),transparent)]" />
      </div>

      {/* Telas em leque */}
      <div className="relative mx-auto aspect-[1.55] w-full max-w-md" aria-hidden="true">
        {fan.map((pos, i) => {
          const Sample = samples[i];
          return (
            <div key={i} className={`absolute w-[74%] ${pos}`}>
              {images[i] ? (
                <img
                  src={images[i]}
                  alt=""
                  className="block w-full rounded-xl border border-white/60 shadow-[0_24px_50px_rgba(4,12,50,0.45)]"
                />
              ) : (
                <Sample />
              )}
            </div>
          );
        })}
      </div>

      {/* Texto (um pouco mais baixo, para ficar centralizado no painel e não nas telas) */}
      <div className="flex min-w-0 flex-col lg:pt-10">
        <h4 className="font-display text-3xl font-semibold uppercase leading-tight md:text-4xl">
          <span className="bg-[linear-gradient(135deg,#ffffff_10%,#5AB0FF)] bg-clip-text pb-1 text-transparent">
            {title}
          </span>
        </h4>
        {description && <p className="mt-2 max-w-sm text-white/85">{description}</p>}

        {items.length > 0 && (
          <ul className="mt-4 grid gap-2 text-sm">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}