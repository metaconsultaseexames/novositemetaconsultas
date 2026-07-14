import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ScanLine, FileText, ShieldCheck } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de agendar uma consulta.";
const CHECKUP_URL = "https://wa.me/5500000000000?text=Olá! Gostaria de saber sobre os pacotes de Check-up Preventivo.";

const shortcuts = [
  {
    icon: Calendar,
    title: "Agendar Consulta",
    desc: "Atendimento rápido via WhatsApp",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: ScanLine,
    title: "Exames de Imagem",
    desc: "Diagnósticos com tecnologia de ponta",
    href: "/exames",
    external: false,
  },
  {
    icon: FileText,
    title: "Resultados Online",
    desc: "Acesse seus laudos digitais",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: ShieldCheck,
    title: "Check-up Preventivo",
    desc: "Pacotes completos com preço especial",
    href: CHECKUP_URL,
    external: true,
  },
];

export default function QuickAccessGrid() {
  return (
    <section className="py-12 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {shortcuts.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-start gap-3 p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#46BEE6]/30 hover:shadow-lg hover:shadow-[#46BEE6]/10 transition-all duration-300 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-[#735AAA]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base text-[#1E293B] group-hover:text-[#735AAA] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#1E293B]/50 mt-1">{item.desc}</p>
                  </div>
                </a>
              ) : (
                <Link
                  to={item.href}
                  className="group flex flex-col items-start gap-3 p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#46BEE6]/30 hover:shadow-lg hover:shadow-[#46BEE6]/10 transition-all duration-300 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#46BEE6]/10 to-[#735AAA]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-[#735AAA]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base text-[#1E293B] group-hover:text-[#735AAA] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#1E293B]/50 mt-1">{item.desc}</p>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}