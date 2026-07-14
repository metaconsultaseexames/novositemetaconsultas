import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ChevronDown, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Tenho uma dúvida.";
const categoryTabs = ["Todos", "Consultas", "Exames", "Convênios", "Geral"];

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [activeTab, setActiveTab] = useState("Todos");

  useEffect(() => {
    base44.entities.FAQ.list("order", 50)
      .then(setFaqs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = faqs.filter(
    (f) => activeTab === "Todos" || f.category === activeTab
  );

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F9FBFF]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Dúvidas Frequentes"
          title="Perguntas Frequentes"
          subtitle="Encontre respostas para as dúvidas mais comuns sobre nossos serviços."
        />

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categoryTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === cat
                  ? "bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white"
                  : "bg-white text-[#1E293B]/60 border border-gray-200 hover:border-[#46BEE6]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 rounded-2xl bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#F9FBFF] transition-colors"
                  >
                    <span className="font-heading font-semibold text-base text-[#1E293B] pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#735AAA] flex-shrink-0 transition-transform duration-200 ${
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
                        <div className="px-6 pb-5">
                          <p className="text-[#1E293B]/70 leading-relaxed text-sm">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#1E293B]/50">Nenhuma pergunta encontrada nesta categoria.</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-[#1E293B]/50 text-lg mb-4">Ainda tem dúvidas?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#735AAA]/25 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Fale Conosco pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}