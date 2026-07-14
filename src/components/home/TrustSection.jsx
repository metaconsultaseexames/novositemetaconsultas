import React from "react";
import { motion } from "framer-motion";
import { Award, Clock, MapPin, Star } from "lucide-react";

const PATIENT_IMG = "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/596bc8279_generated_ca154f1b.png";

const stats = [
  { icon: Star, value: "50.000+", label: "Vidas Atendidas" },
  { icon: Clock, value: "24h", label: "Para Resultados de Exames" },
  { icon: Award, value: "4.9", label: "Nota no Google" },
  { icon: MapPin, value: "20+", label: "Especialidades Médicas" },
];

export default function TrustSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#735AAA] to-[#46BEE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-white/10 rounded-3xl blur-xl" />
              <img
                src={PATIENT_IMG}
                alt="Paciente em ambiente acolhedor na Clínica Meta"
                className="relative rounded-3xl shadow-lg w-full object-cover aspect-[4/3]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/80 mb-3">
              Prova Social
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white leading-tight mb-6">
              A confiança de milhares{" "}
              <span className="text-white">
                de pacientes
              </span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              A Clínica Meta é referência em saúde acessível e de qualidade. Com uma equipe multidisciplinar e infraestrutura moderna, cuidamos de você e da sua família com dedicação e profissionalismo.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100"
                >
                  <stat.icon className="w-5 h-5 text-[#46BEE6] mb-3" />
                  <p className="font-heading font-bold text-2xl text-[#1E293B]">{stat.value}</p>
                  <p className="text-sm text-[#1E293B]/50 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}