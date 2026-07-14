import React from "react";
import { motion } from "framer-motion";
import { Cpu, Users, Zap, CreditCard } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const differentials = [
  {
    icon: Cpu,
    title: "Tecnologia de Ponta",
    description: "Equipamentos de última geração para precisão diagnóstica e conforto do paciente.",
  },
  {
    icon: Users,
    title: "Corpo Clínico Especializado",
    description: "Médicos com RQE ativo e experiência comprovada, nas melhores instituições.",
  },
  {
    icon: Zap,
    title: "Agilidade nos Resultados",
    description: "Resultados de exames em até 24 horas, com laudos digitais disponíveis online.",
  },
  {
    icon: CreditCard,
    title: "Facilidade de Pagamento",
    description: "Parcelamos sua saúde em até 12x. Qualidade sem burocracia.",
  },
];

export default function DifferentialsSection() {
  return (
    <section className="py-24 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Por que escolher a Meta"
          title="Diferenciais que fazem a diferença"
          subtitle="Combinamos excelência técnica com cuidado humanizado para oferecer a melhor experiência em saúde."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((diff, i) => (
            <motion.div
              key={diff.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#46BEE6]/30 hover:shadow-xl hover:shadow-[#735AAA]/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <diff.icon className="w-6 h-6 text-[#735AAA]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1E293B] mb-2">{diff.title}</h3>
              <p className="text-[#1E293B]/60 text-sm leading-relaxed">{diff.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}