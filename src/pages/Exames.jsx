import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ChevronDown, FileText, AlertCircle, MessageCircle, ScanLine, TestTubes, HeartPulse, Search } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import HighlightText from "@/components/shared/HighlightText";

const iconMap = { ScanLine, TestTubes, HeartPulse };
const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de enviar um pedido médico para orçamento.";

export default function Exames() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openExam, setOpenExam] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    base44.entities.ExamCategory.list("order", 50)
      .then(setCategories)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const normalize = (str) =>
    String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const q = normalize(search);
  const filteredCategories = q
    ? categories
        .map((cat) => ({
          ...cat,
          exams: (cat.exams || []).filter(
            (exam) =>
              normalize(exam.name).includes(q) ||
              normalize(exam.preparation).includes(q)
          ),
        }))
        .filter((cat) => cat.exams.length > 0)
    : categories;

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Exames e Procedimentos"
          title="Nossos Exames"
          subtitle="Diagnósticos precisos com equipamentos de última geração. Clique em um exame para ver as instruções de preparo."
        />

        {/* General instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#46BEE6]/10 to-[#735AAA]/10 border border-[#46BEE6]/20 rounded-2xl p-6 mb-12 flex items-start gap-4"
        >
          <AlertCircle className="w-6 h-6 text-[#735AAA] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading font-semibold text-base text-[#1E293B] mb-1">Instruções Gerais de Preparo</h3>
            <p className="text-[#1E293B]/60 text-sm leading-relaxed">
              Traga sempre um documento de identificação com foto e o pedido médico. Para exames com jejum, água pura é permitida. Em caso de dúvidas sobre o preparo, entre em contato antes do exame.
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E293B]/30" />
            <input
              type="text"
              placeholder="Buscar exame ou preparo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 text-[#1E293B] placeholder:text-[#1E293B]/30 focus:border-[#46BEE6] focus:ring-2 focus:ring-[#46BEE6]/20 outline-none transition-all text-base"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 rounded-2xl bg-white animate-pulse" />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#1E293B]/50 text-lg">Nenhum exame encontrado.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredCategories.map((cat, ci) => {
              const CatIcon = iconMap[cat.icon_name] || FileText;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-50">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 flex items-center justify-center mb-4">
                      <CatIcon className="w-6 h-6 text-[#735AAA]" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#1E293B]"><HighlightText text={cat.name} query={search} /></h3>
                    <p className="text-sm text-[#1E293B]/50 mt-1">{cat.description}</p>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {(cat.exams || []).map((exam) => {
                      const isOpen = q ? true : openExam === `${cat.id}-${exam.name}`;
                      return (
                        <div key={exam.name}>
                          <button
                            onClick={() => setOpenExam(isOpen ? null : `${cat.id}-${exam.name}`)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#F9FBFF] transition-colors"
                          >
                            <span className="text-sm text-[#1E293B]/80 font-medium">
                              <HighlightText text={exam.name} query={search} />
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-[#1E293B]/30 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-4">
                                  <div className="bg-[#46BEE6]/5 rounded-xl p-4">
                                    <p className="text-xs font-semibold text-[#735AAA] uppercase tracking-wide mb-1">
                                      Preparo
                                    </p>
                                    <p className="text-sm text-[#1E293B]/70 leading-relaxed">
                                      {exam.preparation}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-[#1E293B]/50 text-lg mb-4">
            Tem um pedido médico? Envie para orçamento.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#735AAA]/25 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Enviar Pedido para Orçamento
          </a>
        </motion.div>
      </div>
    </div>
  );
}