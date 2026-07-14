import React from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function SpecialtiesHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#735AAA] to-[#46BEE6]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full mb-6"
        >
          <Compass className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Navegação Intuitiva</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
        >
          Cuidado completo em todas as{" "}
          <span className="text-white">
            fases da sua vida
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto"
        >
          Selecione a especialidade desejada para conhecer nossos especialistas, exames relacionados e pacotes de check-up preventivo.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 text-sm text-white/80 font-medium"
        >
          Clique na especialidade para saber mais →
        </motion.p>
      </div>
    </section>
  );
}