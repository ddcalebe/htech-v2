import { useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import CrmCard from "../cards/CrmCard";
import FeatureCard from "../cards/FeatureCard";

export default function CorporateSolutions() {
  const [open, setOpen] = useState(true);

  return (
    <section id="solucoes-corporativas" className="bg-neutral-800">
      <SectionHeader
        title="Soluções Corporativas"
        open={open}
        onToggle={() => setOpen(!open)}
      />

      {open && (
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-2">
          <CrmCard />

          <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-semibold text-white">INCLUSO:</h3>

            <FeatureCard
              title="Agente de IA"
              description="Vai além do chatbot de menu. Entende perguntas, áudios, arquivos e responde de forma natural e encaminha para um humano quando necessário."
              href="#agente-ia"
            />

            <FeatureCard
              title="Chatbot"
              description="Responde dúvidas programadas, transfere atendimentos e não deixa cliente sem resposta fora do horário."
              href="#chatbot"
              reverse
            />
          </div>
        </div>
      )}
    </section>
  );
}
