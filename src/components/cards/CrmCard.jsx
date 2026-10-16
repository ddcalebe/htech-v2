import Button from "../ui/Button";
import Badge from "../ui/Badge";

const features = [
  {
    title: "Todos os contatos em um só lugar:",
    text: "histórico de conversas, dados do cliente e etapa de negociação centralizados.",
  },
  {
    title: "Funil de vendas organizado:",
    text: "acompanhar cada oportunidade, do primeiro contato ao fechamento.",
  },
  {
    title: "Automação de follow-up:",
    text: "mensagens e lembretes automáticos enviados para cada cliente.",
  },
  {
    title: "Atendimento multicanal:",
    text: "WhatsApp, Instagram, Messenger, etc., tudo na mesma tela.",
  },
  {
    title: "Relatórios e métricas:",
    text: "quantos atendimentos, taxa de conversão, desempenho da equipe.",
  },
];

export default function CrmCard() {
  return (
    <article className="relative flex h-full flex-col rounded-xl bg-[#0B2BC4] p-6 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge>Para empresas</Badge>
          <h3 className="mt-6 text-5xl font-semibold">CRM</h3>
          <p className="mt-2 font-semibold leading-tight">
            Atendimento <br /> multicanal <br /> WEB e Mobile
          </p>
        </div>

        {/* Placeholder para mockup (notebook + celular) */}
        <div className="-mt-10 hidden h-40 w-64 rounded-lg bg-white/20 sm:block" />
      </div>

      <ul className="mt-10 list-disc space-y-5 pl-8">
        {features.map((f) => (
          <li key={f.title}>
            <strong>{f.title}</strong> {f.text}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex justify-center pt-10">
        <Button variant="card" size="sm">
          Solicitar demonstração grátis
        </Button>
      </div>
    </article>
  );
}
