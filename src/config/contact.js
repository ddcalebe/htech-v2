/**
 * Contatos da Htech num lugar só.
 * Para trocar o número ou os textos, mude só aqui: o site inteiro usa estes valores.
 */

// Número com DDI (55) + DDD (81), só dígitos
export const WHATSAPP_NUMBER = "558120116700";

// Como o número aparece escrito no site (rodapé etc.)
export const WHATSAPP_DISPLAY = "(81) 2011-6700";

// Mensagem padrão (botão flutuante, rodapé, contato)
export const WHATSAPP_MESSAGE = "Olá! Vim pelo site da Htech e gostaria de saber mais.";

/**
 * Mensagens dos botões dos cards. {solucao} é trocado pelo nome do card.
 *  - interesse: botão "Quero essa solução"
 *  - demo:      botão "Solicitar demonstração grátis"
 * O *texto* entre asteriscos aparece em negrito no WhatsApp.
 */
export const WHATSAPP_MESSAGES = {
  empresa: {
    interesse:
      "Olá! Vim pelo site da Htech e tenho interesse na solução *{solucao}* para a minha empresa. Pode me passar mais informações?",
    demo: "Olá! Vim pelo site da Htech e gostaria de solicitar uma demonstração grátis da solução *{solucao}* para a minha empresa.",
  },
  condominio: {
    interesse:
      "Olá! Vim pelo site da Htech e tenho interesse na solução *{solucao}* para o meu condomínio. Pode me passar mais informações?",
    demo: "Olá! Vim pelo site da Htech e gostaria de solicitar uma demonstração grátis da solução *{solucao}* para o meu condomínio.",
  },
};

/** Monta o link do WhatsApp com a mensagem que quiser. */
export function whatsappLink(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Link do WhatsApp para o botão de um card, já com o contexto da solução.
 *
 * Exemplos:
 *   whatsappSolutionLink("Smart Box", "condominio")
 *   whatsappSolutionLink("Central de Conversas", "empresa", "demo")
 *
 * @param solution nome da solução, como deve aparecer na mensagem
 * @param audience "empresa" | "condominio"
 * @param type     "interesse" (padrão) | "demo"
 */
export function whatsappSolutionLink(solution, audience = "empresa", type = "interesse") {
  const template = WHATSAPP_MESSAGES[audience]?.[type] ?? WHATSAPP_MESSAGE;
  return whatsappLink(template.replace("{solucao}", solution));
}