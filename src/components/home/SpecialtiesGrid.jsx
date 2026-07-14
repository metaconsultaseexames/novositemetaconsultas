import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import SpecialtyIcon from "@/components/shared/SpecialtyIcon";

export default function SpecialtiesGrid() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Specialty.list("order", 50)
      .then((data) => setSpecialties(data.filter((s) => s.is_featured)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-[#735AAA] to-[#46BEE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-white/20 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#735AAA] to-[#46BEE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Especialidades"
          title="Cuidados para toda a família"
          subtitle="Conte com uma equipe multidisciplinar para cuidar da sua saúde em todas as fases da vida."
          light
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {specialties.map((spec, i) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/especialidade/${spec.slug}`}
                className="group block p-6 rounded-2xl bg-white border border-transparent hover:border-[#46BEE6]/30 hover:shadow-lg hover:shadow-[#46BEE6]/10 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <SpecialtyIcon name={spec.icon_name} className="w-7 h-7 text-[#735AAA]" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-[#1E293B] group-hover:text-[#735AAA] transition-colors">
                  {spec.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/especialidades"
            className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all duration-300"
          >
            Ver todas as especialidades
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}