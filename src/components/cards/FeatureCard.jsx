import Button from "../ui/Button";
import LogoLayer from "../ui/LogoLayer";
import Badge from "../ui/Badge";

const themes = {
  blue: {
    card: "bg-[#0B2BC4] text-white",
    logo: "bg-white/[0.07]",
    placeholder: "bg-white/90",
    button: "card",
  },
  gray: {
    card: "bg-neutral-300 text-neutral-700",
    logo: "bg-neutral-400/40",
    placeholder: "bg-white/70",
    button: "secondary",
  },
};

/** Card menor (itens inclusos do CRM, serviços de condomínio...). */
export default function FeatureCard({ theme = "blue", tag, icon, title, description, href, image }) {
  const t = themes[theme] ?? themes.blue;

  return (
    <article data-logo-card className={`relative overflow-hidden rounded-xl p-5 ${t.card}`}>
      <LogoLayer className={t.logo} />

      <div className="relative flex h-full flex-col">
        <header className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {icon && <span className="h-7 w-7">{icon}</span>}
            <h4 className="text-2xl font-semibold uppercase">{title}</h4>
          </div>

          {tag && <Badge variant="white" className="shrink-0">{tag}</Badge>}
        </header>

        <p className="mt-3 text-sm leading-snug">{description}</p>

        {/* Imagem do serviço (ou espaço vazio enquanto não tiver imagem) */}
        {image ? (
          <img src={image} alt="" className="mt-4 aspect-[4/3] w-full rounded-lg object-cover object-top" />
        ) : (
          <div className={`mt-4 aspect-[4/3] rounded-lg ${t.placeholder}`} />
        )}

        <div className="mt-auto pt-5">
          <Button href={href} variant={t.button} size="sm" className="w-full">
            Ver mais
          </Button>
        </div>
      </div>
    </article>
  );
}