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

/**
 * Card dos itens inclusos.
 * - Normal: empilhado no tablet/celular; horizontal no desktop (texto à esquerda, imagem à direita).
 * - wide: card largo na linha de baixo (texto à esquerda, imagem à direita).
 */
export default function FeatureCard({ theme = "blue", tag, icon, title, description, href, image, wide = false, reverse = false  }) {
  const t = themes[theme] ?? themes.blue;

  const header = (
    <header className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {icon && <span className="h-7 w-7">{icon}</span>}
        <h4 className="text-2xl font-semibold uppercase">{title}</h4>
      </div>

      {tag && <Badge variant="white" className="shrink-0">{tag}</Badge>}
    </header>
  );

  const button = (
    <Button href={href} variant={t.button} size="sm" className="w-full">
      Ver mais
    </Button>
  );

  // Card largo (Integrações): ocupa a linha de baixo inteira, com texto à esquerda e imagem à direita
  if (wide) {
    return (
      <article data-logo-card className={`relative overflow-hidden rounded-xl p-5 md:col-span-2 ${t.card}`}>
        <LogoLayer className={t.logo} />

        <div className="relative grid h-full gap-5 md:grid-cols-2">
          <div className="flex flex-col">
            {header}
            <p className="mt-3 text-sm leading-snug">{description}</p>
            <div className="mt-auto pt-5">{button}</div>
          </div>

          {image ? (
            <img src={image} alt="" className="h-full min-h-48 w-full rounded-lg object-cover" />
          ) : (
            <div className={`h-full min-h-48 rounded-lg ${t.placeholder}`} />
          )}
        </div>
      </article>
    );
  }

  // Cards normais (Agente de IA, Chatbot)
  return (
    <article data-logo-card className={`relative overflow-hidden rounded-xl p-5 ${t.card}`}>
      <LogoLayer className={t.logo} />

      <div className="relative flex h-full flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-5">
        {/* Texto + botão */}
        <div className={`flex flex-col ${reverse ? "lg:order-2" : ""}`}>
          {header}
          <p className="mt-3 text-sm leading-snug">{description}</p>
          <div className="mt-auto hidden pt-5 lg:block">{button}</div>
        </div>

        {/* Imagem (ou espaço vazio enquanto não tiver imagem) */}
        {image ? (
          <img
            src={image}
            alt=""
            className={`aspect-[4/3] w-full rounded-lg object-cover object-top lg:h-full ${reverse ? "lg:order-1" : ""}`}
          />
        ) : (
          <div className={`aspect-[4/3] rounded-lg lg:h-full ${t.placeholder} ${reverse ? "lg:order-1" : ""}`} />
        )}

        {/* No tablet/celular, o botão fica embaixo da imagem */}
        <div className="mt-auto lg:hidden">{button}</div>
      </div>
    </article>
  );
}