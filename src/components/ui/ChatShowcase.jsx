/**
 * Chatbot e Agente de IA lado a lado: um personagem com mensagens "flutuando" ao lado.
 * Fica em cima do hub de Integrações, ligado a ele pelo CardConnector.
 *
 * Simetria: as duas colunas dividem as mesmas 3 linhas (título, ilustração, texto),
 * então tudo fica na mesma altura. A 2ª coluna é espelhada: personagem à direita, mensagens à esquerda,
 * assim as mensagens das duas ficam viradas para o centro (onde descem as linhas para o hub).
 *
 * Props de cada item:
 *  - title, description
 *  - character: "robot" (desenha o robô do Chatbot) ou uma imagem (ex.: o bonequinho do cursor)
 *  - icon: "chat" | "spark" (ícone que aparece nas respostas)
 *  - bubbles: até 3 mensagens
 *      { from: "user", text }    -> mensagem do cliente (vidro, com ícone de pessoa)
 *      { from: "user", audio }   -> áudio do cliente (ex.: audio: "0:12")
 *      { from: "bot", text }     -> resposta (azul, com o ícone do item); "\n" quebra a linha
 *      { from: "bot", text, options: [] } -> resposta com botões de resposta rápida
 *      { from: "user", text, quote }       -> resposta citando a mensagem anterior
 */

import htechCloud from "../../assets/logo/htech-nuvem.png";

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
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
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

/** Robô do Chatbot (desenho próprio): cabeça branca com visor escuro, corpo em cápsula e a logo da HTech no peito */
function Robot({ className = "" }) {
  return (
    <svg viewBox="0 0 200 250" className={className} aria-hidden="true">
      <defs>
        {/* Sombreado suave do "plástico" branco */}
        <linearGradient id="robot-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d6e4f5" />
        </linearGradient>
        <radialGradient id="robot-eye" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#bfe0ff" />
          <stop offset="1" stopColor="#5AB0FF" />
        </radialGradient>
      </defs>

      {/* Sombra no chão (dá a sensação de que ele está flutuando) */}
      <ellipse cx="100" cy="244" rx="38" ry="5" fill="#000" opacity=".35" />

      {/* Corpo: ovo de cabeça para baixo. Topo largo e arredondado, afinando até a base, separado da cabeça */}
      <path d="M100 146c32 0 47 12 47 33 0 28-22 61-47 61s-47-33-47-61c0-21 15-33 47-33Z" fill="url(#robot-shell)" />
      {/* Logo da HTech no peito (na parte mais larga) */}
      <ellipse cx="100" cy="184" rx="32" ry="26" fill="#eef5ff" />
      <image href={htechCloud} x="77" y="166" width="46" height="36" preserveAspectRatio="xMidYMid meet" />

      {/* Orelhas */}
      <ellipse cx="38" cy="80" rx="9" ry="17" fill="#d6e4f5" />
      <ellipse cx="162" cy="80" rx="9" ry="17" fill="#d6e4f5" />

      {/* Cabeça */}
      <ellipse cx="100" cy="78" rx="62" ry="58" fill="url(#robot-shell)" />

      {/* Visor com os olhos */}
      <rect x="56" y="60" width="88" height="40" rx="20" fill="#0d1424" />
      <path d="M68 68h22" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".18" />
      <g className="robot-eyes">
        <ellipse cx="83" cy="81" rx="7" ry="8" fill="url(#robot-eye)" />
        <ellipse cx="117" cy="81" rx="7" ry="8" fill="url(#robot-eye)" />
      </g>

      {/* Luzinha no topo da cabeça */}
      <circle cx="100" cy="26" r="5" fill="#5AB0FF" className="robot-light" />
    </svg>
  );
}

/**
 * Fundo de cada cena (como na referência): uma forma orgânica azul-clara atrás do personagem e das mensagens,
 * com uma linha tracejada em curva, arcos, "+" e pontinhos. Espelhado na 2ª coluna.
 */
function SceneBackdrop({ flip = false }) {
  return (
    <svg
      viewBox="0 0 500 420"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${flip ? "-scale-x-100" : ""}`}
      fill="none"
    >
      <defs>
        <linearGradient id={`backdrop-fill-${flip ? "r" : "l"}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5AB0FF" stopOpacity="0.2" />
          <stop offset="1" stopColor="#0B2BC4" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Forma orgânica */}
      <path
        d="M78 96C118 34 236 22 320 44c92 24 150 78 146 168-4 92-64 166-182 176-112 10-214-22-244-108C18 204 42 152 78 96Z"
        fill={`url(#backdrop-fill-${flip ? "r" : "l"})`}
      />

      {/* Linha tracejada em curva, passando por baixo do personagem */}
      <path
        d="M44 250c10 90 120 140 230 128 90-10 160-60 190-130"
        stroke="#5AB0FF"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeDasharray="6 8"
        vectorEffect="non-scaling-stroke"
      />

      {/* Arcos nos cantos */}
      <path d="M56 70c18-30 44-50 80-58" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M40 84c22-40 56-66 100-76" stroke="#fff" strokeOpacity="0.15" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M440 62c18 14 30 32 36 54" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

      {/* "+" e pontinhos */}
      <g stroke="#5AB0FF" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        <path d="M30 200v12M24 206h12" vectorEffect="non-scaling-stroke" />
        <path d="M470 330v12M464 336h12" vectorEffect="non-scaling-stroke" />
        <path d="M250 18v10M245 23h10" vectorEffect="non-scaling-stroke" />
      </g>
      <circle cx="60" cy="300" r="3" fill="#5AB0FF" fillOpacity="0.5" />
      <circle cx="420" cy="40" r="3" fill="#fff" fillOpacity="0.35" />
      <circle cx="480" cy="230" r="2.5" fill="#fff" fillOpacity="0.3" />
    </svg>
  );
}

// Alturas das barrinhas do áudio (só visual)
const WAVE = [6, 12, 18, 10, 15, 7, 13, 19, 9, 14, 6, 11, 16];

function Bubble({ from, text, audio, options, quote, icon, index, flip }) {
  const isUser = from === "user";
  // As mensagens alternam de lado dentro da área, como numa conversa (espelhado na 2ª coluna)
  const alignEnd = (index % 2 === 1) !== flip;
  // Ícone fica no canto de fora da mensagem
  const iconRight = alignEnd;

  return (
    <div
      className={`bubble-float relative max-w-[15rem] ${alignEnd ? "self-end" : "self-start"}`}
      style={{ animationDelay: `${index * -1.7}s` }}
    >
      <div
        className={`rounded-2xl px-4 py-3 text-sm leading-snug text-white ${
          isUser
            ? "border border-white/15 bg-white/[0.08] backdrop-blur-sm"
            : "bg-[#0B1F5E] shadow-[0_10px_28px_rgba(4,12,50,0.45)]"
        } ${iconRight ? "rounded-tr-md" : "rounded-tl-md"}`}
      >
        {/* Mensagem respondida (citação, como no WhatsApp) */}
        {quote && (
          <span className="mb-2 block rounded-md border-l-[3px] border-[#5AB0FF] bg-white/10 px-2.5 py-1.5 text-xs text-white/70">
            {quote}
          </span>
        )}

        {audio ? (
          <span className="flex items-center gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white">
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
          // whitespace-pre-line: "\n" no texto vira quebra de linha
          <span className="whitespace-pre-line">{text}</span>
        )}

        {/* Botões de resposta rápida (como no WhatsApp) */}
        {options && (
          <span className="mt-3 grid gap-1.5">
            {options.map((opt) => (
              <span
                key={opt}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 14 4 9l5-5" />
                  <path d="M4 9h10a6 6 0 0 1 6 6v5" />
                </svg>
                {opt}
              </span>
            ))}
          </span>
        )}
      </div>

      {/* Ícone redondo no canto (pessoa para o cliente, ícone do item para a resposta) */}
      <span
        className={`absolute -top-3 grid h-8 w-8 place-items-center rounded-full border-2 border-corp ${
          isUser ? "bg-white text-[#0B2BC4]" : "bg-[#5AB0FF] text-[#0B1F5E]"
        } ${iconRight ? "-right-3" : "-left-3"}`}
      >
        <Icon name={isUser ? "user" : icon} className="h-4 w-4" />
      </span>
    </div>
  );
}

function ChatColumn({ title, description, character, icon = "chat", bubbles = [], flip = false }) {
  return (
    // No desktop, cada coluna ocupa as 3 linhas da grade de fora (subgrid), assim título, ilustração e texto se alinham
    <div className="grid gap-4 md:row-span-3 md:[grid-template-rows:subgrid]">
      {/* 1. Título */}
      <div className="flex items-center justify-center">
        <h4 className="text-2xl font-semibold uppercase text-white">{title}</h4>
      </div>

      {/* 2. Ilustração: personagem + mensagens flutuando (altura fixa, igual nas duas) */}
      <div className="relative mx-auto h-[26rem] w-full max-w-lg" role="img" aria-label={`Ilustração: ${title}`}>
        <SceneBackdrop flip={flip} />

        {/* Personagem, no lado de fora */}
        <div className={`absolute top-1/2 w-[42%] -translate-y-1/2 ${flip ? "right-0" : "left-0"}`}>
          {/* Círculo de luz atrás do personagem */}
          <span className="absolute left-1/2 top-1/2 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(90,176,255,0.3),rgba(11,43,196,0.14)_60%,transparent)]" />

          {character === "robot" ? (
            <Robot className="character-float relative mx-auto w-[80%]" />
          ) : (
            <img src={character} alt="" draggable="false" className="character-float relative mx-auto w-[80%] select-none" />
          )}
        </div>

        {/* Mensagens, viradas para o centro */}
        <div className={`absolute inset-y-0 flex w-[60%] flex-col justify-center gap-5 ${flip ? "left-0" : "right-0"}`}>
          {bubbles.slice(0, 3).map((bubble, i) => (
            <Bubble key={i} {...bubble} icon={icon} index={i} flip={flip} />
          ))}
        </div>
      </div>

      {/* 3. Texto */}
      <div className="mx-auto flex h-full max-w-md flex-col items-center gap-2 text-center">
        <p className="text-white/80">{description}</p>
      </div>
    </div>
  );
}

export default function ChatShowcase({ items = [], className = "" }) {
  return (
    <div className={`grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-4 ${className}`}>
      <style>{`
        /* Mensagens e personagens flutuando de leve, cada um num tempo */
        .bubble-float { animation: float-y 5s ease-in-out infinite; }
        .character-float { animation: float-y 6s ease-in-out infinite; }
        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* Robô: luz no topo e olhos piscando */
        .robot-light { animation: robot-light 2s ease-in-out infinite; }
        @keyframes robot-light { 50% { opacity: .35; } }
        .robot-eyes { transform-box: fill-box; transform-origin: center; animation: robot-blink 4s infinite; }
        @keyframes robot-blink { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(.1); } }

        @media (prefers-reduced-motion: reduce) {
          .bubble-float, .character-float, .robot-light, .robot-eyes { animation: none; }
        }
      `}</style>

      {items.map((item, i) => (
        <ChatColumn key={item.title} {...item} flip={i % 2 === 1} />
      ))}
    </div>
  );
}