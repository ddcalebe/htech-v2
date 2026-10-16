import Button from "../ui/Button";

/**
 * Card usado em "Agente de IA" e "Chatbot".
 * reverse = true coloca a imagem à esquerda e o texto à direita.
 */
export default function FeatureCard({ icon, title, description, href, reverse = false }) {
  return (
    <article className="flex h-full flex-col rounded-xl bg-[#0B2BC4] p-4 text-white">
      <header className="flex items-center gap-2">
        {icon && <span className="h-7 w-7">{icon}</span>}
        <h4 className="text-2xl font-semibold uppercase">{title}</h4>
      </header>

      <div className={`mt-3 flex flex-1 gap-4 ${reverse ? "flex-row-reverse" : ""}`}>
        <div className="flex flex-1 flex-col justify-between gap-4 px-2">
          <p className="text-justify text-sm leading-snug">{description}</p>
          <Button href={href} variant="card" size="sm" className="w-full">
            Ver mais
          </Button>
        </div>

        {/* Placeholder para print da conversa */}
        <div className="w-1/2 rounded-lg bg-white/90" />
      </div>
    </article>
  );
}
