import { useEffect, useRef, useState } from "react";
import { WHATSAPP_DISPLAY, whatsappLink } from "../../config/contact";

/**
 * Modal da Política de Privacidade.
 *
 * Uso:
 *   const [privacyOpen, setPrivacyOpen] = useState(false);
 *   <button onClick={() => setPrivacyOpen(true)}>Política de Privacidade</button>
 *   <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
 *
 * Fecha com: botão X, botão "Entendi", tecla Esc ou clique fora da caixa.
 * Enquanto está aberto, a página de trás não rola.
 * Ao abrir: o fundo aparece suavemente e a caixa sobe um pouco e cresce até o tamanho normal.
 *
 * TODO: o texto abaixo é um modelo geral baseado na LGPD (Lei 13.709/2018).
 * Revise com o jurídico/responsável da HTech antes de publicar.
 */

// Data da última atualização da política
const UPDATED_AT = "22 de novembro de 2026";

// Cada seção: título + parágrafos (ou lista, quando tiver `items`)
const sections = [
  {
    title: "1. Quem somos",
    paragraphs: [
      "Esta Política de Privacidade explica como a HTech coleta, usa e protege os dados pessoais de quem visita este site ou entra em contato com a nossa equipe.",
    ],
  },
  {
    title: "2. Quais dados coletamos",
    items: [
      "Dados que você nos envia ao entrar em contato, como nome, telefone, e-mail, empresa ou condomínio e o conteúdo da mensagem.",
      "Dados de navegação, como páginas visitadas, tipo de dispositivo e navegador, coletados de forma automática para o funcionamento e a melhoria do site.",
    ],
  },
  {
    title: "3. Para que usamos os dados",
    items: [
      "Responder às suas solicitações e apresentar as nossas soluções.",
      "Agendar demonstrações e enviar propostas comerciais que você solicitou.",
      "Melhorar o site e a experiência de quem nos visita.",
      "Cumprir obrigações legais e regulatórias.",
    ],
  },
  {
    title: "4. Contato pelo WhatsApp",
    paragraphs: [
      "Ao clicar nos botões do WhatsApp, você é direcionado para o aplicativo do WhatsApp, que tem a sua própria política de privacidade. As conversas com a nossa equipe são usadas apenas para atender a sua solicitação.",
    ],
  },
  {
    title: "5. Compartilhamento",
    paragraphs: [
      "A HTech não vende os seus dados pessoais. Eles só podem ser compartilhados com fornecedores que nos ajudam a prestar os serviços (por exemplo, hospedagem e sistemas de atendimento), sempre com o mesmo nível de proteção, ou quando exigido por lei ou por ordem de autoridade competente.",
    ],
  },
  {
    title: "6. Por quanto tempo guardamos",
    paragraphs: [
      "Os dados são mantidos apenas pelo tempo necessário para cumprir as finalidades desta política ou para atender a obrigações legais. Depois disso, são excluídos ou anonimizados.",
    ],
  },
  {
    title: "7. Segurança",
    paragraphs: [
      "Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, perda, alteração ou divulgação indevida.",
    ],
  },
  {
    title: "8. Seus direitos",
    paragraphs: ["Pela LGPD, você pode, a qualquer momento:"],
    items: [
      "Confirmar se tratamos os seus dados e ter acesso a eles.",
      "Corrigir dados incompletos, inexatos ou desatualizados.",
      "Pedir a anonimização, o bloqueio ou a exclusão de dados desnecessários.",
      "Revogar o seu consentimento e pedir a exclusão dos dados tratados com base nele.",
      "Pedir informações sobre com quem compartilhamos os seus dados.",
    ],
  },
  {
    title: "9. Alterações nesta política",
    paragraphs: [
      "Esta política pode ser atualizada para refletir mudanças nos nossos serviços ou na legislação. A data da última atualização fica sempre no topo deste texto.",
    ],
  },
];

export default function PrivacyModal({ open, onClose }) {
  const closeRef = useRef(null);
  // Liga as classes da animação um quadro depois de montar, para a transição acontecer
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // Esc fecha, a página de trás não rola e o foco vai para o botão de fechar
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#071433]/70 p-4 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        className={`relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] transition duration-300 ease-out motion-reduce:transition-none ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Topo */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-6 py-5 md:px-8">
          <div>
            <h2 id="privacy-title" className="text-2xl font-semibold text-navy">
              Política de Privacidade
            </h2>
            <p className="mt-1 text-sm text-neutral-500">Última atualização: {UPDATED_AT}</p>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-navy focus-visible:outline-2 focus-visible:outline-[#0A84FF]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Texto (rola por dentro) */}
        <div className="overflow-y-auto px-6 py-6 text-[15px] leading-relaxed text-neutral-700 md:px-8">
          {sections.map((section) => (
            <section key={section.title} className="mb-6 last:mb-0">
              <h3 className="mb-2 text-base font-semibold text-navy">{section.title}</h3>

              {section.paragraphs?.map((text) => (
                <p key={text} className="mb-2">
                  {text}
                </p>
              ))}

              {section.items && (
                <ul className="list-disc space-y-1 pl-5 marker:text-[#0A84FF]">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h3 className="mb-2 text-base font-semibold text-navy">10. Fale com a gente</h3>
            <p>
              Para exercer os seus direitos ou tirar dúvidas sobre esta política, fale com a HTech pelo WhatsApp{" "}
              <a
                href={whatsappLink("Olá! Tenho uma dúvida sobre a Política de Privacidade da HTech.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0A84FF] underline-offset-2 hover:underline"
              >
                {WHATSAPP_DISPLAY}
              </a>
              .
            </p>
          </section>
        </div>

        {/* Rodapé */}
        <div className="border-t border-neutral-200 px-6 py-4 md:px-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#0A84FF] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#0070e0] sm:ml-auto sm:block sm:w-auto"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}