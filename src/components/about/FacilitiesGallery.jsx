import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const photos = [
  { thumb: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80", full: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80", alt: "Consultório médico moderno e climatizado", label: "Consultórios" },
  { thumb: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80", full: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200&q=80", alt: "Sala de exames com equipamento de diagnóstico", label: "Salas de Exames" },
  { thumb: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80", full: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&q=80", alt: "Equipamento de imagem de alta precisão", label: "Imagem Diagnóstica" },
  { thumb: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80", full: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1200&q=80", alt: "Recepção e área de espera acolhedora", label: "Recepção" },
  { thumb: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", full: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80", alt: "Laboratório de análises clínicas", label: "Laboratório" },
  { thumb: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80", full: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80", alt: "Áreas de circulação amplas e iluminadas", label: "Circulação" },
];

export default function FacilitiesGallery() {
  const [active, setActive] = useState(null);
  const isOpen = active !== null;

  const close = () => setActive(null);
  const go = (dir) => setActive((i) => (i === null ? null : (i + dir + photos.length) % photos.length));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <section className="py-24 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Nossa Estrutura"
          title="Conheça nossas instalações"
          subtitle="Cada ambiente foi pensado para oferecer conforto, segurança e a precisão que sua saúde merece."
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {photos.map((p, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg shadow-[#735AAA]/5 aspect-[4/3]"
            >
              <img src={p.thumb} alt={p.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <span className="text-white font-heading font-semibold text-sm">{p.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1E293B]/90 backdrop-blur-sm p-4"
            onClick={close}
          >
            <button onClick={close} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label="Fechar">
              <X className="w-5 h-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label="Anterior">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={photos[active].full} alt={photos[active].alt} className="w-full max-h-[75vh] object-contain rounded-2xl" />
              <p className="text-center text-white/90 mt-4 font-heading font-medium">{photos[active].label}</p>
            </motion.div>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label="Próxima">
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}