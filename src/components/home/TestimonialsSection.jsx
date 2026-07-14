import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const testimonials = [
  {
    name: "Mariana Oliveira",
    role: "Paciente há 2 anos",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    text: "Atendimento impecável desde a recepção até a consulta. Os exames saíram rápido e os médicos são extremamente atenciosos. Senti-me cuidada de verdade."
  },
  {
    name: "Carlos Eduardo Mendes",
    role: "Paciente há 1 ano",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
    text: "Agendei pelo WhatsApp em minutos e fui atendido no horário marcado. Estrutura moderna e equipe preparada. Recomendo a Clínica Meta para toda a família."
  },
  {
    name: "Juliana Ferreira",
    role: "Paciente há 3 anos",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    rating: 5,
    text: "Fiz meu check-up preventivo aqui e foi a melhor decisão. Acompanhamento completo, médicos que explicam cada etapa. A tecnologia usada transmite muita segurança."
  },
  {
    name: "Rafael Souza",
    role: "Paciente há 6 meses",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    text: "Profissionalismo do início ao fim. A clínica tem um ambiente acolhedor que tira aquele nervosismo de consulta. Resultados dos exames entregues com agilidade."
  },
  {
    name: "Patrícia Almeida",
    role: "Paciente há 4 anos",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    rating: 5,
    text: "Já passei por várias clínicas e a Meta é disparado a melhor. Pontualidade, cuidado humanizado e médicos de altíssimo nível. Virou a clínica da minha família."
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const active = testimonials[current];

  return (
    <section className="py-24 bg-gradient-to-br from-[#735AAA] to-[#46BEE6] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Depoimentos"
          title="Histórias de quem confia na nossa equipe"
          subtitle="A satisfação dos nossos pacientes é o reflexo do cuidado e dedicação que colocamos em cada atendimento."
          light
        />

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative bg-white rounded-3xl shadow-xl shadow-black/10 border border-white/20 p-8 sm:p-12 overflow-hidden min-h-[340px]">
            <div className="absolute top-6 right-8 text-[#46BEE6]/10">
              <Quote className="w-24 h-24" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8"
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#46BEE6] to-[#735AAA] rounded-full blur-md opacity-30 scale-105" />
                    <img
                      src={active.photo}
                      alt={active.name}
                      className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex justify-center sm:justify-start gap-1 mb-3">
                    {Array.from({ length: active.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl text-[#1E293B]/80 leading-relaxed font-body mb-6">
                    "{active.text}"
                  </p>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-[#1E293B]">{active.name}</h4>
                    <p className="text-sm text-[#46BEE6] font-medium">{active.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            aria-label="Depoimento anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-6 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#735AAA] hover:bg-[#735AAA] hover:text-white transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Próximo depoimento"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-6 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#735AAA] hover:bg-[#735AAA] hover:text-white transition-all duration-300 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}