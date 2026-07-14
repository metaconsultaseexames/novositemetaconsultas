import React from "react";
import { motion } from "framer-motion";
import { Heart, Zap, Cpu, Wallet } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const pillars = [
  {
    icon: Heart,
    title: "Acolhimento",
    text: "Aqui, você não é apenas um número. Nosso atendimento é focado na escuta ativa e no respeito ao seu tempo.",
  },
  {
    icon: Zap,
    title: "Agilidade Real",
    text: "Consultas e exames no mesmo lugar. Resultados rápidos para quem tem pressa em viver bem.",
  },
  {
    icon: Cpu,
    title: "Tecnologia e Autoridade",
    text: "Equipamentos de última geração e um corpo clínico rigorosamente selecionado. Qualidade que supera as expectativas dos pacientes mais exigentes.",
  },
  {
    icon: Wallet,
    title: "Acessibilidade Inteligente",
    text: "Facilidade de pagamento e preços que respeitam seu planejamento financeiro, sem abrir mão da excelência.",
  },
];

export default function PillarsSection() {
  return (
    <section className="py-24 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Nossa História e Premissas"
          title="Os pilares que sustentam a Clínica Meta"
          subtitle="Acreditamos que preço acessível não é sinônimo de baixa qualidade — é o resultado de uma gestão eficiente e moderna."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#46BEE6]/20 hover:shadow-xl hover:shadow-[#735AAA]/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <p.icon className="w-7 h-7 text-[#735AAA]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1E293B] mb-3">{p.title}</h3>
              <p className="text-sm text-[#1E293B]/60 leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}