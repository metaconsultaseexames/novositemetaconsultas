import React from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

export default function SpecialtiesSearchBar({ value, onChange }) {
  return (
    <div className="relative z-20 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl shadow-[#735AAA]/15 border border-gray-100 p-2"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#735AAA]" />
          <input
            type="text"
            placeholder="Buscar especialidade por nome ou sintoma..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-xl bg-[#F9FBFF] text-[#1E293B] placeholder:text-[#1E293B]/40 focus:ring-2 focus:ring-[#46BEE6]/30 outline-none transition-all text-base"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1E293B]/30 hover:text-[#735AAA] transition-colors"
              aria-label="Limpar busca"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}