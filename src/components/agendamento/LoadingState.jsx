import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingState({ message = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-[#735AAA]" />
      <span className="mt-3 text-[#1E293B]/60 text-sm">{message}</span>
    </div>
  );
}