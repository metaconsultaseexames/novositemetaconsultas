import React, { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import { agendamentoApi, getUnitId, getUnitName, getUnitOnline, getFullAddress } from "@/lib/agendamentoApi";
import OptionCard from "./OptionCard";
import LoadingState from "./LoadingState";

export default function StepUnidade({ formData, updateFormData, onNext }) {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agendamentoApi.getUnidades()
      .then((data) => {
        const groups = data.success && data.content && typeof data.content === "object" ? data.content : {};
        const allUnits = Object.values(groups).flatMap((arr) => (Array.isArray(arr) ? arr : []));
        const online = allUnits.filter(getUnitOnline);
        setUnidades(online);
        setLoading(false);
      })
      .catch(() => { setLoading(false); });
  }, []);

  const selectDefault = () => {
    updateFormData({ unidade_id: 0, unidade_nome: "Unidade principal" });
    onNext();
  };

  if (loading) return <LoadingState message="Carregando unidades..." />;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Escolha a unidade</h2>
        <p className="text-[#1E293B]/60 mt-2">Selecione onde deseja ser atendido</p>
      </div>
      <div className="grid gap-3 max-w-2xl mx-auto">
        {unidades.length === 0 ? (
          <OptionCard
            selected={true}
            onClick={selectDefault}
            icon={Building2}
            title="Unidade principal"
            subtitle="Atendimento presencial"
          />
        ) : (
          unidades.map((unidade) => (
            <OptionCard
              key={getUnitId(unidade)}
              selected={formData.unidade_id === getUnitId(unidade)}
              onClick={() => {
                updateFormData({ unidade_id: getUnitId(unidade), unidade_nome: getUnitName(unidade) });
                onNext();
              }}
              icon={Building2}
              title={getUnitName(unidade)}
              subtitle={getFullAddress(unidade)}
            />
          ))
        )}
      </div>
    </div>
  );
}