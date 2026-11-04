import Button from "../ui/Button";
import Badge from "../ui/Badge";
import LogoLayer from "../ui/LogoLayer";

// Cores de cada tema
const themes = {
  blue: {
    card: "bg-[#153DCD] text-white",
    logo: "bg-white/[0.07]",
    badge: "blue",
    button: "card",
  },
  gray: {
    card: "bg-neutral-300 text-neutral-700",
    logo: "bg-neutral-400/40",
    badge: "gray",
    button: "secondary",
  },
};

/** Card largo de produto (CRM, PABX, App de Gestão...). */
export default function ProductCard({
  theme = "blue",
  badge,
  badgeIcon,
  title,
  subtitle,
  features = [],
  ctaLabel,
  ctaHref = "#",
  image,
  laptopImage,
  tabletImage,
  phoneImage,
  className = "",
}) {
  const t = themes[theme] ?? themes.blue;

  return (
    <article data-logo-card className={`relative overflow-hidden rounded-xl p-6 md:p-10 ${t.card} ${className}`}>
      <LogoLayer className={t.logo} />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
        <div className="flex flex-col">
          {badge && (
            <div>
              <Badge variant={t.badge}>
                {badgeIcon && <img src={badgeIcon} alt="" className="h-8 w-8" />}
                {badge}
              </Badge>
            </div>
          )}
          <h3 className="mt-6 text-5xl font-semibold">{title}</h3>
          {subtitle && (
            <p className="mt-2 whitespace-pre-line font-semibold leading-tight">{subtitle}</p>
          )}

          {/* Imagem única (ex.: PABX) */}
          {image && !laptopImage && (
            <img src={image} alt="" className="mt-8 hidden w-full max-w-md object-contain sm:block" />
          )}

          {/* Mockup em fileira: celular (frente) → tablet (meio) → notebook (atrás) */}
          {laptopImage && (
            <div className="relative mt-8 hidden w-full max-w-md pb-2 sm:block">
              <img src={laptopImage} alt="" className="relative z-0 ml-auto w-[78%] translate-x-[20%] object-contain" />

              {tabletImage && (
                <img
                  src={tabletImage}
                  alt=""
                  className="absolute bottom-0 left-[12%] z-10 w-[45%] object-contain drop-shadow-xl"
                />
              )}

              {phoneImage && (
                <img
                  src={phoneImage}
                  alt=""
                  className="absolute bottom-0 left-0 z-20 w-[15%] object-contain drop-shadow-xl"
                />
              )}
            </div>
          )}
        </div>

        {/* Direita: recursos + botão */}
        <div className="flex flex-col self-center">
          <ul className="list-disc space-y-5 pl-6">
            {features.map((f) => (
              <li key={f.title}>
                <strong>{f.title}</strong> {f.text}
              </li>
            ))}
          </ul>

          {ctaLabel && (
            <div className="mt-8 px-8">
              <Button href={ctaHref} variant={t.button} size="md" className="w-full">
                {ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}