import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de agendar uma consulta.";

export default function WhatsAppFab() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:scale-110 transition-transform"
      aria-label="Agendar pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </motion.a>
  );
}