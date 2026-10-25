import Badge from "../ui/Badge";
import Button from "../ui/Button";
import LogoLayer from "../ui/LogoLayer";

/**
 * Card das soluções condominiais.
 * size = "lg" para o card de destaque (App de Gestão), "md" para os demais.
 * reverse = true coloca a imagem à esquerda e o texto à direita (cards menores).
 */
export default function CondoCard({
  title,
  size = "md",
  badge,
  badgeIcon,
  subtitle,
  description,
  features = [],
  ctaLabel = "Ver mais",
  href = "#",
  image,
  reverse = false,
}) {
  const isLarge = size === "lg";

  return (
    <article
      data-logo-card
      className={`relative overflow-hidden rounded-xl bg-neutral-300 p-5 text-neutral-700 md:p-8 ${
        isLarge ? "min-h-[420px] md:col-span-2" : "min-h-[280px]"
      }`}
    >
      <LogoLayer className="bg-neutral-400/40" />

      {badge && (
        <div className="absolute right-3 top-3 z-10">
          <Badge variant="gray">
            {badgeIcon && <img src={badgeIcon} alt="" className="h-4 w-4" />}
            {badge}
          </Badge>
        </div>
      )}

      {isLarge ? (
        /* Card grande: título à esquerda, recursos e botão à direita */
        <div className="relative grid h-full gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <div>
            <h3 className="whitespace-pre-line text-4xl font-semibold uppercase leading-tight text-neutral-600 md:text-5xl">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-3 whitespace-pre-line font-semibold leading-tight">{subtitle}</p>
            )}
          </div>

          <div className="flex flex-col self-center">
            <ul className="list-disc space-y-4 pl-6">
              {features.map((f) => (
                <li key={f.title}>
                  <strong>{f.title}</strong> {f.text}
                </li>
              ))}
            </ul>

            {ctaLabel && (
              <div className="mt-8 px-8">
                <Button href={href} variant="secondary" size="md" className="w-full">
                  {ctaLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Cards menores: metade texto, metade imagem (reverse inverte os lados) */
        <div className="relative grid h-full gap-4 sm:grid-cols-2">
          {/* Texto */}
          <div className={`flex flex-col ${reverse ? "sm:order-2 sm:items-end sm:text-right" : ""}`}>
            <h3 className="whitespace-pre-line text-2xl font-semibold uppercase leading-tight text-neutral-600">
              {title}
            </h3>

            {description && <p className="mt-3 text-sm leading-snug">{description}</p>}

            <div className="mt-auto pt-6">
              <Button href={href} variant="secondary" size="sm">
                {ctaLabel}
              </Button>
            </div>
          </div>

          {/* Imagem (ou espaço vazio enquanto não tiver) */}
          <div className={reverse ? "sm:order-1" : ""}>
            {image ? (
              <img src={image} alt="" className="h-full w-full rounded-lg object-cover" />
            ) : (
              <div className="h-full min-h-40 rounded-lg bg-white/60" />
            )}
          </div>
        </div>
      )}
    </article>
  );
}