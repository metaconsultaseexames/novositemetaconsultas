import React, { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { agendamentoApi } from "@/lib/agendamentoApi";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const formatApiDate = (date) => {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
};

const formatStoreDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const generateDateRange = (days = 21) => {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
};

const parseSchedule = (content) => {
  const dateMap = {};
  if (!content || typeof content !== "object") return [];

  const profObj = content.profissional_id || content;
  if (profObj && typeof profObj === "object") {
    for (const profKey of Object.keys(profObj)) {
      const profData = profObj[profKey];
      const localObj = profData.local_id || profData;
      if (localObj && typeof localObj === "object") {
        for (const localKey of Object.keys(localObj)) {
          const localData = localObj[localKey];
          if (localData && typeof localData === "object") {
            for (const dateKey of Object.keys(localData)) {
              if (/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
                const times = localData[dateKey];
                if (Array.isArray(times) && times.length > 0) {
                  if (!dateMap[dateKey]) dateMap[dateKey] = new Set();
                  times.forEach((t) => dateMap[dateKey].add(t));
                }
              }
            }
          }
        }
      }
    }
  }

  return Object.keys(dateMap).map((data) => ({
    data,
    horarios: Array.from(dateMap[data]).sort(),
  }));
};

export default function StepHorario({ formData, updateFormData, onNext }) {
  const [dates] = useState(generateDateRange(21));
  const [selectedDate, setSelectedDate] = useState(formatStoreDate(dates[0]));
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const apiParams = {
      tipo: formData.procedimento_id ? "P" : "E",
      unidade_id: formData.unidade_id,
      especialidade_id: formData.especialidade_id,
      procedimento_id: formData.procedimento_id,
      profissional_id: formData.profissional_id,
      data_start: formatApiDate(dates[0]),
      data_end: formatApiDate(dates[dates.length - 1]),
    };
    agendamentoApi.getDisponibilidade(apiParams)
      .then((data) => {
        const parsed = parseSchedule(data.content);
        setSchedule(parsed);
        const firstAvailable = parsed.find((s) => s.horarios.length > 0);
        if (firstAvailable) setSelectedDate(firstAvailable.data);
        setLoading(false);
      })
      .catch((e) => { setError(e.message || "Erro ao carregar horários"); setLoading(false); });
  }, []);

  const getSlotsForDate = (dateStr) => {
    const entry = schedule.find((s) => s.data === dateStr);
    return entry ? entry.horarios : [];
  };

  const selectedDateObj = dates.find((d) => formatStoreDate(d) === selectedDate) || dates[0];
  const slots = getSlotsForDate(selectedDate);

  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Escolha data e horário</h2>
        <p className="text-[#1E293B]/60 mt-2">Selecione o melhor horário para você</p>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {dates.map((d) => {
            const storeDateStr = formatStoreDate(d);
            const hasSlots = getSlotsForDate(storeDateStr).length > 0;
            const dateStr = formatApiDate(d);
            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(storeDateStr)}
                disabled={!hasSlots && !loading}
                className={`flex-shrink-0 w-16 py-3 rounded-2xl border-2 transition-all duration-200 ${
                  selectedDate === storeDateStr
                    ? "border-[#735AAA] bg-[#735AAA] text-white shadow-md shadow-[#735AAA]/20"
                    : hasSlots
                    ? "border-transparent bg-[#F9FBFF] text-[#1E293B] hover:border-[#46BEE6]/30"
                    : "border-transparent bg-gray-50 text-gray-300 cursor-not-allowed"
                }`}
              >
                <div className="text-xs font-medium">{WEEKDAYS[d.getDay()]}</div>
                <div className="text-lg font-heading font-bold mt-0.5">{d.getDate()}</div>
                <div className="text-[10px]">{MONTHS[d.getMonth()]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <LoadingState message="Carregando horários disponíveis..." />
      ) : slots.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-[#1E293B]/60">Não há horários disponíveis para esta data.</p>
          <p className="text-[#1E293B]/40 text-sm mt-1">Tente selecionar outra data.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-w-2xl mx-auto">
          {slots.map((slot, i) => {
            const hora = typeof slot === "string" ? slot : (slot.hora || slot.horario || slot.time);
            if (!hora) return null;
            return (
              <button
                key={i}
                onClick={() => {
                  updateFormData({ horario: { data: selectedDate, hora } });
                  onNext();
                }}
                className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl border-2 border-transparent bg-[#F9FBFF] text-[#1E293B] font-medium text-sm hover:border-[#735AAA] hover:bg-[#735AAA]/5 hover:text-[#735AAA] transition-all duration-200"
              >
                <Clock className="w-3.5 h-3.5" />
                {hora}
              </button>
            );
          })}
        </div>
      )}

      {formData.horario && (
        <div className="mt-6 text-center">
          <p className="text-sm text-[#1E293B]/60">
            Horário selecionado: <strong className="text-[#735AAA]">{formData.horario.hora}</strong> em{" "}
            <strong className="text-[#735AAA]">{new Date(formData.horario.data + "T00:00:00").toLocaleDateString("pt-BR")}</strong>
          </p>
        </div>
      )}
    </div>
  );
}