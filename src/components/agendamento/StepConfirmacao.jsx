import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Calendar, Clock, MapPin, Stethoscope, User, ClipboardList, CalendarPlus, ShieldCheck } from "lucide-react";
import { agendamentoApi } from "@/lib/agendamentoApi";

const formatBRDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};

const SummaryRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-[#735AAA]" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-[#1E293B]/50 uppercase tracking-wide">{label}</p>
      <p className="text-[#1E293B] font-medium truncate">{value}</p>
    </div>
  </div>
);

export default function StepConfirmacao({ formData, onReset }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);
  const [agendamentoId, setAgendamentoId] = useState(null);

  const getFieldErrors = (result) => {
    if (!result || typeof result !== "object") return null;
    const errors = [];
    const fieldsToCheck = ["local_id", "paciente_id", "procedimento_id", "profissional_id", "especialidade_id", "data", "horario", "valor", "plano", "plano_id"];
    for (const field of fieldsToCheck) {
      if (Array.isArray(result[field]) && result[field].length > 0) {
        errors.push(...result[field]);
      }
    }
    if (result.content?.errors && typeof result.content.errors === "object") {
      for (const arr of Object.values(result.content.errors)) {
        if (Array.isArray(arr)) errors.push(...arr);
      }
    }
    return errors.length > 0 ? errors.join(" ") : null;
  };

  const handleConfirm = async () => {
    setStatus("loading");
    setError(null);
    if (!formData.paciente?.id) {
      setError("Dados do paciente não validados. Volte e valide seu CPF antes de confirmar.");
      setStatus("error");
      return;
    }
    if (!formData.horario?.data || !formData.horario?.hora) {
      setError("Data e horário não selecionados. Volte e escolha um horário disponível.");
      setStatus("error");
      return;
    }
    try {
      const isoDate = formData.horario.data;
      const timeStr = formData.horario.hora.includes(":") ? formData.horario.hora : `${formData.horario.hora}:00`;
      const horaFormatted = timeStr.includes(":") && timeStr.split(":").length === 2
        ? `${timeStr}:00`
        : timeStr;
      const payload = {
        local_id: formData.unidade_id ?? 0,
        paciente_id: formData.paciente.id,
        procedimento_id: formData.procedimento_id,
        especialidade_id: formData.especialidade_id,
        profissional_id: formData.profissional_id || null,
        data: isoDate,
        horario: horaFormatted,
        valor: formData.procedimento_valor || 0,
        plano: false,
        plano_id: null,
      };
      const result = await agendamentoApi.criarAgendamento(payload);
      if (result.success === false) {
        const fieldErrors = getFieldErrors(result);
        throw new Error(fieldErrors || result.error || result.message || "Não foi possível criar o agendamento. Verifique os campos.");
      }
      setAgendamentoId(result.content?.id || result.id || result.data?.id);
      setStatus("success");
    } catch (e) {
      setError(e.message || "Erro ao criar agendamento.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-[#1E293B] mb-2">Agendamento confirmado!</h2>
        <p className="text-[#1E293B]/60 max-w-md mx-auto mb-6">
          Seu agendamento foi realizado com sucesso. Você receberá a confirmação em breve.
        </p>
        {agendamentoId && (
          <p className="text-sm text-[#1E293B]/50 mb-8">Protocolo: #{agendamentoId}</p>
        )}
        <div className="max-w-md mx-auto bg-[#F9FBFF] rounded-2xl p-5 mb-8 text-left">
          <SummaryRow icon={MapPin} label="Unidade" value={formData.unidade_nome} />
          <SummaryRow icon={Stethoscope} label="Especialidade" value={formData.especialidade_nome} />
          <SummaryRow icon={ClipboardList} label="Procedimento" value={formData.procedimento_nome} />
          <SummaryRow icon={User} label="Profissional" value={formData.profissional_nome || "Sem preferência"} />
          <SummaryRow icon={Calendar} label="Data" value={formatBRDate(formData.horario?.data)} />
          <SummaryRow icon={Clock} label="Horário" value={formData.horario?.hora} />
        </div>
        <button
          onClick={onReset}
          className="bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-[#735AAA]/30 transition-all duration-300"
        >
          Novo agendamento
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Confirme seu agendamento</h2>
        <p className="text-[#1E293B]/60 mt-2">Revise os detalhes antes de confirmar</p>
      </div>

      <div className="max-w-md mx-auto bg-[#F9FBFF] rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#735AAA]/10">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-600">Paciente validado via Receita Federal</span>
        </div>
        <SummaryRow icon={MapPin} label="Unidade" value={formData.unidade_nome} />
        <SummaryRow icon={Stethoscope} label="Especialidade" value={formData.especialidade_nome} />
        <SummaryRow icon={ClipboardList} label="Procedimento" value={formData.procedimento_nome} />
        <SummaryRow icon={User} label="Profissional" value={formData.profissional_nome || "Sem preferência"} />
        <SummaryRow icon={Calendar} label="Data" value={formatBRDate(formData.horario?.data)} />
        <SummaryRow icon={Clock} label="Horário" value={formData.horario?.hora} />
        <SummaryRow icon={User} label="Paciente" value={formData.paciente?.nome_completo || formData.paciente?.nome} />
      </div>

      {status === "error" && (
        <div className="max-w-md mx-auto mb-4 p-4 rounded-xl bg-red-50 text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      <div className="max-w-md mx-auto">
        <button
          onClick={handleConfirm}
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#735AAA]/30 transition-all duration-300 disabled:opacity-50"
        >
          {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : <CalendarPlus className="w-5 h-5" />}
          {status === "loading" ? "Confirmando..." : "Confirmar agendamento"}
        </button>
      </div>
    </div>
  );
}