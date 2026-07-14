import React, { useState, useEffect } from "react";
import { ClipboardList } from "lucide-react";
import { agendamentoApi, getId, getDisplayName } from "@/lib/agendamentoApi";
import OptionCard from "./OptionCard";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export default function StepProcedimento({ formData, updateFormData, onNext }) {
  const [procedimentos, setProcedimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    agendamentoApi.getProcedimentos(formData.especialidade_id)
      .then((data) => {
        const all = data.content || [];
        const filtered = all.filter((p) => p.permite_agendamento_online === true);
        setProcedimentos(filtered.length > 0 ? filtered : all);
        setLoading(false);
      })
      .catch((e) => { setError(e.message || "Erro ao carregar procedimentos"); setLoading(false); });
  }, []);

  if (loading) return <LoadingState message="Carregando procedimentos..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Qual procedimento?</h2>
        <p className="text-[#1E293B]/60 mt-2">Especialidade: <strong>{formData.especialidade_nome}</strong></p>
      </div>
      <div className="grid gap-3 max-w-2xl mx-auto">
        {procedimentos.length === 0 ? (
          <p className="text-center text-[#1E293B]/60 py-8">Nenhum procedimento disponível.</p>
        ) : (
          procedimentos.map((proc) => (
            <OptionCard
              key={getId(proc)}
              selected={formData.procedimento_id === getId(proc)}
              onClick={() => {
                updateFormData({ procedimento_id: getId(proc), procedimento_nome: getDisplayName(proc), procedimento_valor: proc.valor || 0, procedimento_tempo: proc.tempo || "30" });
                onNext();
              }}
              icon={ClipboardList}
              title={getDisplayName(proc)}
            />
          ))
        )}
      </div>
    </div>
  );
}