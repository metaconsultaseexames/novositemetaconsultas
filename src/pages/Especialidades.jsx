import React, { useState } from "react";
import SpecialtiesHero from "@/components/specialties/SpecialtiesHero";
import SpecialtiesSearchBar from "@/components/specialties/SpecialtiesSearchBar";
import SpecialtiesGrid from "@/components/specialties/SpecialtiesGrid";
import SpecialtiesDifferentials from "@/components/specialties/SpecialtiesDifferentials";
import SpecialtiesCheckup from "@/components/specialties/SpecialtiesCheckup";
import SpecialtiesFaq from "@/components/specialties/SpecialtiesFaq";

export default function Especialidades() {
  const [search, setSearch] = useState("");
  return (
    <div className="bg-[#F9FBFF]">
      <SpecialtiesHero />
      <SpecialtiesSearchBar value={search} onChange={setSearch} />
      <SpecialtiesGrid search={search} />
      <SpecialtiesDifferentials />
      <SpecialtiesCheckup />
      <SpecialtiesFaq />
    </div>
  );
}