import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

const gallery = [
  {
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    alt: "Consultório médico moderno e climatizado",
    label: "Consultórios",
  },
  {
    url: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80",
    alt: "Sala de exames com equipamento de diagnóstico",
    label: "Salas de Exames",
  },
  {
    url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
    alt: "Equipamento de imagem de alta precisão",
    label: "Imagem Diagnóstica",
  },
  {
    url: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80",
    alt: "Recepção e área de espera acolhedora",
    label: "Recepção",
  },
];

export default function InfrastructureSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#735AAA] to-[#46BEE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Infraestrutura e Tecnologia"
          title="Ambientes que inspiram confiança"
          subtitle="Ambientes climatizados, modernos e equipados com o que há de mais recente na medicina diagnóstica."
          light
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {gallery.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg shadow-[#735AAA]/5 aspect-[3/4]"
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-white font-heading font-semibold text-sm">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}