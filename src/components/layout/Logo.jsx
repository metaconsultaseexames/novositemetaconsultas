import React from "react";

const LOGO_URL = "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/f85c64595_0e5131917_Meta-Marca-Cor.png";

export default function Logo({ className = "", imgClassName = "h-[1248px]" }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src={LOGO_URL}
        alt="Clínica Meta — Consultas e Exames"
        className={`w-auto object-contain opacity-100 ${imgClassName}`} />
      
    </div>);

}