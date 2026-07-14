import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, CreditCard } from "lucide-react";

const differentials = [
  {
    icon: Zap,
    title: "Agilidade",
    description: "Consultas agendadas para a mesma semana, sem filas de espera.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade",
    description: "Médicos especialistas com RQE registrado e validado.",
  },
  {
    icon: CreditCard,
    title: "Facilidade",
    description: "Aceitamos diversas formas de pagamento e parcelamento.",
  },
];

export default function SpecialtiesDifferentials() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#735AAA] to-[#46BEE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/80 mb-3">
            Diferenciais
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
            Por que agendar conosco?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8">
          {differentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">{item.title}</h3>
              <p className="text-white/70 leading-relaxed max-w-xs mx-auto">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}