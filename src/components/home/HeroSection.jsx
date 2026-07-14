import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText, Star } from "lucide-react";

const HERO_IMG = "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/e830f1cf3_generated_b91a36e9.png";
const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de agendar uma consulta.";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#735AAA] to-[#46BEE6]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            
            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-sm font-medium">Clínica Popular de Confiança</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[3.4rem] text-white leading-tight">
              Saúde de excelência,{" "}
              <span className="text-white">
                no seu tempo
              </span>{" "}
              e que cabe no seu bolso.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-lg">
              Agilidade de particular, preço de popular, cuidado de família. Atendimento médico moderno e humanizado para quem não pode esperar meses por uma consulta.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#735AAA] px-8 py-4 rounded-full text-base font-semibold hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-0.5">
                
                <Calendar className="w-5 h-5" />
                Agendar Consulta Agora
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <div className="flex -space-x-1">
                {[Star, Star, Star, Star, Star].map((Icon, i) =>
                <Icon key={i} className="w-4 h-4 text-white fill-white" />
                )}
              </div>
              <span>
                <strong className="text-white">+50.000 atendimentos</strong> realizados com excelência
              </span>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
              { value: "50mil+", label: "Vidas Atendidas" },
              { value: "24h", label: "Resultados de Exames" },
              { value: "4.9", label: "Nota no Google" }].
              map((stat) =>
              <div key={stat.label}>
                  <p className="font-heading font-bold text-2xl text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block">
            
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-2xl" />
              <img
                src={HERO_IMG}
                alt="Visualização médica moderna representando precisão e tecnologia"
                className="relative rounded-3xl shadow-2xl shadow-black/20 w-full object-cover" />
              
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-1/4 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl shadow-black/10 border border-white hidden">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#46BEE6]/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#46BEE6]" />
                </div>
                <div>
                  <p className="text-xs text-[#1E293B]/50">Próxima Consulta</p>
                  <p className="text-sm font-semibold text-[#1E293B]">Disponível Hoje</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 bottom-1/4 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl shadow-black/10 border border-white">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#735AAA]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#735AAA]" />
                </div>
                <div>
                  <p className="text-xs text-[#1E293B]/50">Resultados</p>
                  <p className="text-sm font-semibold text-[#1E293B]">Em até 24h</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>);

}