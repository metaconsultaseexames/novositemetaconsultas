import React from "react";
import AgendamentoWizard from "@/components/agendamento/AgendamentoWizard";

export default function Agendamento() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9FBFF] to-white pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#46BEE6] mb-3">
            Agendamento Online
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] leading-tight">
            Agende sua consulta
          </h1>
          <p className="mt-4 text-lg text-[#1E293B]/60 max-w-2xl mx-auto">
            Rápido e sem complicação. Escolha os detalhes do seu atendimento em poucos clicos.
          </p>
        </div>
        <AgendamentoWizard />
      </div>
    </div>
  );
}