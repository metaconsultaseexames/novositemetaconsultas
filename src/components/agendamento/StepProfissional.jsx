import React, { useState, useEffect } from "react";
import { UserRound } from "lucide-react";
import { agendamentoApi, getId, getDisplayName } from "@/lib/agendamentoApi";
import OptionCard from "./OptionCard";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export default function StepProfissional({ formData, updateFormData, onNext }) {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    agendamentoApi.getProfissionais(formData.especialidade_id)
      .then((data) => { setProfissionais(data.content || []); setLoading(false); })
      .catch((e) => { setError(e.message || "Erro ao carregar profissionais"); setLoading(false); });
  }, []);

  if (loading) return <LoadingState message="Carregando profissionais..." />;
  if (error) return <ErrorState message={error} />;

  const getConselhoInfo = (prof) => {
    const conselho = prof.conselho || "CRM";
    const numero = prof.documento_conselho || "";
    const uf = prof.uf_conselho || "";
    const parts = [conselho, numero, uf].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : null;
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Escolha o profissional</h2>
        <p className="text-[#1E293B]/60 mt-2">Selecione com quem deseja ser atendido</p>
      </div>
      <div className="grid gap-3 max-w-2xl mx-auto">
        <OptionCard
          selected={formData.profissional_id === null}
          onClick={() => {
            updateFormData({ profissional_id: null, profissional_nome: "Sem preferência" });
            onNext();
          }}
          icon={UserRound}
          title="Sem preferência"
          subtitle="Ver horários de todos os profissionais"
        />
        {profissionais.map((prof) => (
          <OptionCard
            key={getId(prof)}
            selected={formData.profissional_id === getId(prof)}
            onClick={() => {
              updateFormData({ profissional_id: getId(prof), profissional_nome: getDisplayName(prof) });
              onNext();
            }}
            icon={UserRound}
            title={`${prof.tratamento || ""} ${getDisplayName(prof)}`.trim()}
            subtitle={getConselhoInfo(prof)}
          />
        ))}
      </div>
    </div>
  );
}