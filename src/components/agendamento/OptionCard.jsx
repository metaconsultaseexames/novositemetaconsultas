import React from "react";
import { Check } from "lucide-react";

export default function OptionCard({ selected, onClick, title, subtitle, icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
        selected
          ? "border-[#735AAA] bg-[#735AAA]/5 shadow-md shadow-[#735AAA]/10"
          : "border-transparent bg-[#F9FBFF] hover:border-[#46BEE6]/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            selected ? "bg-[#735AAA] text-white" : "bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 text-[#735AAA]"
          }`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className={`font-heading font-semibold ${selected ? "text-[#735AAA]" : "text-[#1E293B]"}`}>{title}</h4>
          {subtitle && <p className="text-sm text-[#1E293B]/60 mt-0.5 truncate">{subtitle}</p>}
          {children}
        </div>
        {selected && (
          <div className="w-6 h-6 rounded-full bg-[#735AAA] flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </button>
  );
}