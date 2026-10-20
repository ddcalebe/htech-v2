import Button from "../ui/Button";
import Badge from "../ui/Badge";
import LogoLayer from "../ui/LogoLayer";
import corpIcon from "../../assets/icons/corp-icon.png";

/** Card largo de produto (CRM, PABX em nuvem...). */
export default function ProductCard({ badge, title, subtitle, features = [], ctaLabel, ctaHref = "#", image, laptopImage, tabletImage, phoneImage, className = "" }) {
  return (
    <article
      data-logo-card
      className={`relative overflow-hidden rounded-xl bg-[#0B2BC4] p-6 text-white md:p-10 ${className}`}
    >
      <LogoLayer className="bg-white/[0.07]" />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
        <div className="flex flex-col">
          {badge && (
            <div>
              <Badge>
                <img src={corpIcon} alt="" className="h-8 w-8" />
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
            <img
              src={image}
              alt=""
              className="mt-8 hidden w-full max-w-md object-contain sm:block"
            />
          )}

          {/* Mockup em fileira: celular (frente) → tablet (meio) → notebook (atrás) */}
          {laptopImage && (
            <div className="relative mt-8 hidden w-full max-w-md pb-2 sm:block">
              {/* Notebook: atrás, alinhado à direita */}
              <img src={laptopImage} alt="" className="relative z-0 ml-auto w-[78%] translate-x-[20%] object-contain" />

              {/* Tablet: no meio, maior que o celular, sobrepondo a lateral do notebook */}
              {tabletImage && (
                <img
                  src={tabletImage}
                  alt=""
                  className="absolute bottom-0 left-[12%] z-10 w-[45%] object-contain drop-shadow-xl"
                />
              )}

              {/* Celular: na frente, mais à esquerda */}
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
              <Button href={ctaHref} variant="card" size="md" className="w-full">
                {ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}