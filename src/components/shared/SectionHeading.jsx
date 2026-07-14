import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ label, title, subtitle, align = "center", light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {label && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#46BEE6] mb-3">
          {label}
        </span>
      )}
      <h2 className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight ${light ? "text-white" : "text-[#1E293B]"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg max-w-2xl ${align === "center" ? "mx-auto" : ""} ${light ? "text-gray-300" : "text-[#1E293B]/60"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}