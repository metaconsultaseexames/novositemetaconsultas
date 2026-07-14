import React from "react";
import {
  HeartPulse, Flower2, Baby, Bone, Sparkles, Eye, ScanLine,
  Brain, Activity, Apple, Stethoscope, Droplets, ShieldPlus, Wind,
  Microscope, Syringe, Pill, Footprints
} from "lucide-react";

const slugImageMap = {
  cardiologia: "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/460245532_generated_image.png",
  ginecologia: "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/6e9fafe13_generated_image.png",
  pediatria: "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/132702412_generated_image.png",
  ortopedia: "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/8ede97db2_generated_image.png",
  dermatologia: "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/ce53448f6_generated_image.png",
  "alergologia-e-imunologia": "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/0ea63a320_generated_image.png",
  angiologia: "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/b31d30dd9_generated_image.png",
  oftalmologia: "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/7c2755a27_generated_image.png",
  ultrassonografia: "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/9c9489661_generated_image.png",
  neurologia: "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/7149adfe9_generated_image.png",
};

const iconMap = {
  Heart: HeartPulse,
  Flower2,
  Baby,
  Bone,
  Sparkles,
  Eye,
  Monitor: ScanLine,
  Brain,
  Activity,
  Apple,
  Stethoscope,
  Droplet: Droplets,
  Shield: ShieldPlus,
  Wind,
  Microscope,
  Syringe,
  Pill,
  Footprints,
};

export default function SpecialtyIcon({ name, slug, className = "w-6 h-6" }) {
  if (slug && slugImageMap[slug]) {
    return (
      <img
        src={slugImageMap[slug]}
        alt={name || slug}
        className={className}
        loading="lazy"
      />
    );
  }
  const Icon = iconMap[name] || Stethoscope;
  return <Icon className={className} />;
}