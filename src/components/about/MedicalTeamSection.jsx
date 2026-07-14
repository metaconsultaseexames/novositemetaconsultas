import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, Award } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const features = [
  {
    icon: ShieldCheck,
    title: "RQE Registrado",
    text: "Todos os nossos especialistas possuem Registro de Qualificação de Especialista (RQE) ativo, garantindo formação comprovada.",
  },
  {
    icon: Stethoscope,
    title: "Experiência Hospitalar",
    text: "Muitos de nossos médicos também atuam em grandes hospitais particulares, trazendo essa mesma expertise para a Meta.",
  },
  {
    icon: Award,
    title: "Seleção Rigorosa",
    text: "Corpo clínico rigorosamente selecionado por competência técnica, ética e capacidade de acolhimento humano.",
  },
];

export default function MedicalTeamSection() {
  return (
    <section className="py-24 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Corpo Clínico"
          title="O selo de qualidade da Clínica Meta"
          subtitle="Especialistas com RQE e vasta experiência, prontos para oferecer o melhor cuidado à sua saúde."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 flex items-center justify-center mb-5">
                <f.icon className="w-7 h-7 text-[#46BEE6]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1E293B] mb-3">{f.title}</h3>
              <p className="text-sm text-[#1E293B]/60 leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}