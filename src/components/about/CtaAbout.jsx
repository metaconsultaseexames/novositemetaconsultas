import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de agendar minha primeira consulta na Clínica Meta.";

export default function CtaAbout() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#735AAA] to-[#46BEE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-16 sm:px-16 sm:py-20 text-center"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-50" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-3xl mx-auto">
              Sua saúde não pode esperar.
            </h2>
            <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto">
              Experimente um novo padrão de atendimento médico — onde tecnologia, agilidade e acolhimento caminham juntos.
            </p>
            <div className="mt-10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#735AAA] px-8 py-4 rounded-full text-base font-bold hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                Agendar minha primeira consulta
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}