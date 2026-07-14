import React from "react";
import { Check } from "lucide-react";

const STEPS = ["Unidade", "Especialidade", "Procedimento", "Profissional", "Horário", "Dados", "Confirmação"];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-between min-w-[560px] max-w-3xl mx-auto">
        {STEPS.map((label, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                i < currentStep
                  ? "bg-[#735AAA] text-white"
                  : i === currentStep
                  ? "bg-gradient-to-br from-[#46BEE6] to-[#735AAA] text-white scale-110 shadow-lg shadow-[#735AAA]/30"
                  : "bg-gray-100 text-gray-400"
              }`}>
                {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${
                i <= currentStep ? "text-[#1E293B]" : "text-gray-400"
              }`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                i < currentStep ? "bg-[#735AAA]" : "bg-gray-200"
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}