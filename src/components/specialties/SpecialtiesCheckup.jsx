import React from "react";
import { motion } from "framer-motion";
import { ShieldPlus, ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de saber sobre os pacotes de check-up preventivo.";

export default function SpecialtiesCheckup() {
  return (
    <section className="py-16 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#735AAA] to-[#46BEE6] p-10 sm:p-14"
        >
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50 pointer-events-none"
          />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-5 max-w-2xl">
              <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm items-center justify-center flex-shrink-0">
                <ShieldPlus className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-3">
                  Não espere os sintomas aparecerem.
                </h2>
                <p className="text-white/80 leading-relaxed">
                  Oferecemos pacotes de check-up preventivo personalizados para cada especialidade. Proteja quem você ama com diagnósticos precoces.
                </p>
              </div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#735AAA] px-7 py-3.5 rounded-full font-semibold hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
            >
              Ver pacotes de check-up
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}