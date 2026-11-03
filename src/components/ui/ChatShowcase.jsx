import Badge from "./Badge";

/**
 * Chatbot e Agente de IA mostrados como janelinhas de conversa, lado a lado.
 * Fica em cima do hub de Integrações, ligado a ele pelo CardConnector.
 *
 * Simetria: as duas colunas dividem as mesmas 3 linhas (título, janela, texto),
 * então tudo fica na mesma altura mesmo se um texto for maior que o outro.
 * As janelas têm altura fixa e as mensagens ficam alinhadas embaixo, como num chat de verdade.
 *
 * Props:
 *  - items: lista de { title, tag, icon ("chat" | "spark"), status, description, href, linkLabel, messages }
 *  - messages: lista de mensagens
 *      { from: "user", text }                -> mensagem do cliente (direita, azul)
 *      { from: "user", audio: "0:12" }      -> áudio do cliente
 *      { from: "bot", text, options: [] }  -> resposta (esquerda), com menu opcional
 *      { from: "bot", text, ai: true }      -> resposta com o selo "IA"
 *      { typing: true }                     -> "digitando..."
 */

const icons = {
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" />
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
      {icons[name] ?? icons.chat}
    </svg>
  );
}

// Alturas das barrinhas do áudio (só visual)
const WAVE = [6, 12, 18, 10, 15, 7, 13, 19, 9, 14, 6, 11, 16, 8, 12, 17, 7];

function Message({ from, text, options, audio, ai, typing }) {
  if (typing) {
    return (
      <div className="flex gap-1 self-start rounded-xl rounded-bl-sm bg-white/10 px-3 py-3" aria-label="digitando">
        <i className="chat-dot" />
        <i className="chat-dot [animation-delay:0.2s]" />
        <i className="chat-dot [animation-delay:0.4s]" />
      </div>
    );
  }

  const isUser = from === "user";
  return (
    <div
      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-snug ${
        isUser ? "self-end rounded-br-sm bg-[#0B2BC4]" : "self-start rounded-bl-sm bg-white/10"
      }`}
    >
      {ai && (
        <span className="mb-1 flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#5AB0FF]">
          <Icon name="spark" className="h-3 w-3" />
          IA
        </span>
      )}

      {audio ? (
        <span className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white">
            <span className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-[#0B2BC4]" />
          </span>
          <span className="flex h-5 items-center gap-0.5">
            {WAVE.map((h, i) => (
              <i key={i} className="w-0.5 rounded-full bg-white/85" style={{ height: h }} />
            ))}
          </span>
          <span className="text-[11px] text-white/80">{audio}</span>
        </span>
      ) : (
        text
      )}

      {options && (
        <ul className="mt-2 grid gap-1">
          {options.map((opt, i) => (
            <li key={opt} className="rounded-md bg-white/10 px-2 py-1 text-xs">
              {i + 1} · {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ChatColumn({ title, tag = "CRM", icon, status = "online", description, href, linkLabel = "Ver mais", messages = [] }) {
  return (
    // No desktop, cada coluna ocupa as 3 linhas da grade de fora (subgrid), assim título, janela e texto se alinham
    <div className="grid gap-4 md:row-span-3 md:[grid-template-rows:subgrid]">
      {/* 1. Título */}
      <div className="flex items-center justify-center gap-3">
        <h4 className="text-2xl font-semibold uppercase text-white">{title}</h4>
      </div>

      {/* 2. Janela de conversa (altura fixa, igual nas duas) */}
      <div
        className="mx-auto flex h-80 w-full max-w-md flex-col rounded-2xl border border-[#5AB0FF]/35 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 text-white shadow-[0_0_34px_rgba(90,176,255,0.18)]"
        aria-label={`Exemplo de conversa: ${title}`}
      >
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs text-white/70">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0B2BC4] text-white">
            <Icon name={icon} className="h-4 w-4" />
          </span>
          {title}
{/*           <span className="ml-auto flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {status}
          </span> */}
        </div>

        {/* Mensagens alinhadas embaixo */}
        <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden pt-3">
          {messages.map((msg, i) => (
            <Message key={i} {...msg} />
          ))}
        </div>
      </div>

      {/* 3. Texto e link (o link fica sempre no fim da linha, alinhado com o da outra coluna) */}
      <div className="mx-auto flex h-full max-w-md flex-col items-center gap-2 text-center">
        <p className="text-white/80">{description}</p>
{/*         {href && (
          <a href={href} className="mt-auto font-semibold text-[#5AB0FF] transition hover:text-white">
            {linkLabel} →
          </a>
        )} */}
      </div>
    </div>
  );
}

export default function ChatShowcase({ items = [], className = "" }) {
  return (
    <div className={`grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-4 ${className}`}>
      <style>{`
        .chat-dot {
          width: 6px; height: 6px; border-radius: 9999px;
          background: rgba(255,255,255,.7);
          animation: chat-blink 1.2s infinite;
        }
        @keyframes chat-blink {
          0%, 60%, 100% { opacity: .25; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-dot { animation: none; }
        }
      `}</style>

      {items.map((item) => (
        <ChatColumn key={item.title} {...item} />
      ))}
    </div>
  );
}