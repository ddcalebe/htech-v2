import Button from "../ui/Button";
import LogoLayer from "../ui/LogoLayer";

/** Card dos itens inclusos (Agente de IA, Chatbot...). */
export default function FeatureCard({ icon, title, description, href, image }) {
  return (
    <article data-logo-card className="relative overflow-hidden rounded-xl bg-[#0B2BC4] p-5 text-white">
      <LogoLayer className="bg-white/[0.07]" />

      <div className="relative flex h-full flex-col">
        <header className="flex items-center gap-2">
          {icon && <span className="h-7 w-7">{icon}</span>}
          <h4 className="text-2xl font-semibold uppercase">{title}</h4>
        </header>

        <p className="mt-3 text-sm leading-snug">{description}</p>

        {/* Print da conversa (ou espaço cinza enquanto não tiver imagem) */}
        {image ? (
          <img
            src={image}
            alt=""
            className="mt-4 aspect-[4/3] w-full rounded-lg object-cover object-top"
          />
        ) : (
          <div className="mt-4 aspect-[4/3] rounded-lg bg-white/90" />
        )}

        <div className="mt-auto pt-5">
          <Button href={href} variant="card" size="sm" className="w-full">
            Ver mais
          </Button>
        </div>
      </div>
    </article>
  );
}