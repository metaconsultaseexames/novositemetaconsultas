import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

const CHECKUP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de saber sobre os pacotes de Check-up Preventivo.";

export default function CheckupBanner() {
  return (
    <section className="py-16 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#735AAA] to-[#46BEE6]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-10 sm:p-14">
            <div className="flex items-center gap-6 max-w-2xl">
              <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white/20 items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight mb-2">
                  Prevenir é o melhor cuidado.
                </h2>
                <p className="text-white/80 text-base sm:text-lg">
                  Conheça nossos pacotes de Check-up Preventivo com preço especial.
                </p>
              </div>
            </div>
            <a
              href={CHECKUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#735AAA] px-8 py-4 rounded-full text-base font-bold hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0 whitespace-nowrap"
            >
              Quero Conhecer
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}