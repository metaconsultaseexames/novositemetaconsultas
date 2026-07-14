import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import StepIndicator from "./StepIndicator";
import StepUnidade from "./StepUnidade";
import StepEspecialidade from "./StepEspecialidade";
import StepProcedimento from "./StepProcedimento";
import StepProfissional from "./StepProfissional";
import StepHorario from "./StepHorario";
import StepPaciente from "./StepPaciente";
import StepConfirmacao from "./StepConfirmacao";

const STEPS = [
  StepUnidade,
  StepEspecialidade,
  StepProcedimento,
  StepProfissional,
  StepHorario,
  StepPaciente,
  StepConfirmacao,
];

const INITIAL_DATA = {
  unidade_id: null, unidade_nome: null,
  especialidade_id: null, especialidade_nome: null,
  procedimento_id: null, procedimento_nome: null, procedimento_valor: null, procedimento_tempo: null,
  profissional_id: null, profissional_nome: null,
  horario: null,
  paciente: null,
};

export default function AgendamentoWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_DATA);

  const updateFormData = (updates) => setFormData((prev) => ({ ...prev, ...updates }));
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => { setStep(0); setFormData(INITIAL_DATA); };

  const CurrentStep = STEPS[step];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-[#735AAA]/5 border border-gray-100 overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-gray-50 bg-gradient-to-r from-[#F9FBFF] to-white">
        <StepIndicator currentStep={step} />
      </div>
      <div className="p-6 sm:p-10 min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={next}
              onBack={back}
              onReset={reset}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {step > 0 && step < STEPS.length - 1 && (
        <div className="px-6 sm:px-10 py-4 border-t border-gray-50 flex justify-start">
          <button
            onClick={back}
            className="flex items-center gap-2 text-sm font-medium text-[#1E293B]/60 hover:text-[#735AAA] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}