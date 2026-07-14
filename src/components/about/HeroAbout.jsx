import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HERO_IMG = "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/2b949f73c_generated_image.png";
const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de agendar minha primeira consulta na Clínica Meta.";

export default function HeroAbout() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#735AAA] to-[#46BEE6] pt-28 pb-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-sm font-medium">Quem Somos</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[3.2rem] text-white leading-tight">
              Medicina de alta performance{" "}
              <span className="text-white">
                para todos.
              </span>
            </h1>

            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
              Nascemos para provar que você não precisa escolher entre preço justo e atendimento de elite. Na Clínica Meta, a tecnologia de ponta encontra o acolhimento que sua saúde merece.
            </p>

            <div className="mt-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#735AAA] px-8 py-4 rounded-full text-base font-semibold hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                Agendar minha primeira consulta
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Recepção moderna e humanizada da Clínica Meta"
              className="relative rounded-3xl shadow-2xl shadow-black/20 w-full object-cover aspect-[4/3]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}