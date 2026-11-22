import whatsappIcon from "../../assets/icons/whatsapp-icon.png";
import { whatsappLink } from "../../config/contact";

/**
 * Botão flutuante do WhatsApp, fixo no canto inferior direito da tela.
 * Abre a conversa direto no WhatsApp (app no celular, WhatsApp Web no computador).
 * O ícone é o whatsapp-icon.png pintado de branco com máscara, então funciona com qualquer cor do PNG.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Htech no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 md:bottom-8 md:right-8"
    >
      {/* Texto que aparece ao passar o mouse (só no computador) */}
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy opacity-0 shadow-lg transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Fale com a gente
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
        {/* Onda pulsando atrás do botão */}
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40 motion-reduce:hidden"
        />

        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_25px_-5px_rgba(37,211,102,0.6)] transition duration-300 group-hover:scale-110 group-hover:bg-[#1ebe5a]">
          <span
            aria-hidden="true"
            className="h-7 w-7 bg-white md:h-8 md:w-8"
            style={{
              maskImage: `url(${whatsappIcon})`,
              WebkitMaskImage: `url(${whatsappIcon})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </span>
      </span>
    </a>
  );
}