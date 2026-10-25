import quotes from "../../assets/icons/quotes.png";

const logos = [
  { name: "Cliente 1", src: null },
  { name: "Cliente 2", src: null },
  { name: "Cliente 3", src: null },
  { name: "Cliente 4", src: null },
  { name: "Cliente 5", src: null },
  { name: "Cliente 6", src: null },
  { name: "Cliente 7", src: null },
  { name: "Cliente 8", src: null },
];

// ⚠️ DEPOIMENTOS DE EXEMPLO: trocar por depoimentos reais antes de publicar.
const testimonials = [
  {
    quote:
      "A portaria ficou muito mais organizada. Os moradores liberam as visitas pelo celular e eu acompanho tudo pelo app, sem papel e sem ligação para o interfone.",
    name: "Bernardo Alves",
    role: "Síndico \nCondomínio Residencial Jardim das Flores",
    type: "Condomínio",
  },
  {
    quote:
      "Antes as mensagens dos clientes se perdiam entre WhatsApp e Instagram. Com o CRM, a equipe atende tudo numa tela só e eu vejo o andamento de cada negociação.",
    name: "Maria Cecília",
    role: "Gerente \nFármacia Life",
    type: "Empresa",
  },
  {
    quote:
      "O chatbot responde fora do horário e passa para a equipe só o que precisa de atendimento humano. Ninguém mais fica sem resposta no fim de semana.",
    name: "Carlos Eduardo",
    role: "Atendente \nClínica do Bem estar",
    type: "Empresa",
  },
];

function LogoItem({ name, src }) {
  return (
    <li className="flex shrink-0 items-center px-8 md:px-12">
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-10 w-auto opacity-60 brightness-0 invert transition hover:opacity-100 md:h-12"
        />
      ) : (
        <span className="whitespace-nowrap text-xl font-semibold text-white/40">{name}</span>
      )}
    </li>
  );
}

export default function Clients() {
  return (
    <section id="clientes" className="bg-neutral-900 py-16 text-white">
      {/* Faixa de logos */}
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
          Quem já confia na HTech
        </h2>
      </div>

      <div
        className="group mt-8 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        {/* A lista aparece duas vezes para o carrossel emendar sem pulo */}
        <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {logos.map((logo) => (
            <LogoItem key={`a-${logo.name}`} {...logo} />
          ))}
          {logos.map((logo) => (
            <LogoItem key={`b-${logo.name}`} {...logo} />
          ))}
        </ul>
      </div>

      {/* Depoimentos */}
      <div className="mx-auto mt-16 max-w-7xl px-6">
        <h3 className="mb-8 text-3xl font-semibold">O que dizem nossos clientes</h3>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col gap-4 items-center rounded-xl border border-white/10 bg-neutral-800/60 p-6"
            >


              <figcaption className="flex items-start justify-center gap-4 w-full border-b border-white/10 pb-4">
                <div>
                  <p className="font-semibold uppercase text-center text-blue">{t.name}</p>
                  <p className="whitespace-pre-line text-md text-center text-white/60">{t.role}</p>
                </div>
{/*                 <span className="shrink-0 rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">
                  {t.type}
                </span> */}
              </figcaption>
              <blockquote className="mt-2 flex-1 text-justify leading-relaxed text-white/85">{t.quote}</blockquote>

              <img src={quotes} alt="quotes" className="w-20 py-4" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}