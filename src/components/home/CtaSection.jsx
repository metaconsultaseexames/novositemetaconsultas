import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de agendar uma consulta.";

export default function CtaSection() {
  return (
    <section className="py-24 bg-[#F9FBFF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#46BEE6]/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#735AAA]/10 rounded-full blur-[60px] -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
              Cuide da sua saúde hoje
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
              Agende sua consulta pelo WhatsApp de forma rápida e prática. Nossa equipe está pronta para atender você.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-[#735AAA]/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              Agendar Agora pelo WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}