import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SpecialtyImageCarousel({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white rounded-2xl p-6 border border-gray-100"
    >
      <div
        className="relative rounded-2xl overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="aspect-[16/10] sm:aspect-[16/9] relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]?.url}
              alt={images[current]?.caption || ""}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {images[current]?.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium text-[#1E293B]">
                {images[current].caption}
              </span>
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#735AAA] hover:bg-white hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#735AAA] hover:bg-white hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 right-3 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Ir para imagem ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}