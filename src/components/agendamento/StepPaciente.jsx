import React, { useState } from "react";
import { Search, UserPlus, Loader2, CheckCircle2, AlertCircle, ShieldCheck, BadgeCheck } from "lucide-react";
import { agendamentoApi } from "@/lib/agendamentoApi";

const onlyDigits = (str) => (str || "").replace(/\D/g, "");

const formatCpf = (value) => {
  const d = onlyDigits(value).slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const parseInfoSimplesDate = (dateStr) => {
  if (!dateStr) return "";
  const parts = dateStr.split("/");
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return dateStr;
};

const normalizeDate = (dateStr) => {
  if (!dateStr) return "";
  const ymd = dateStr.split("-");
  if (ymd.length === 3) return ymd.join("");
  const dmy = dateStr.split("/");
  if (dmy.length === 3) return `${dmy[2]}${dmy[1]}${dmy[0]}`;
  return onlyDigits(dateStr);
};

export default function StepPaciente({ formData, updateFormData, onNext }) {
  const [cpf, setCpf] = useState(formData.paciente?.cpf || "");
  const [birthdate, setBirthdate] = useState(formData.paciente?.data_nascimento || "");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [foundPatient, setFoundPatient] = useState(null);
  const [infosimplesData, setInfosimplesData] = useState(null);
  const [formMode, setFormMode] = useState(null); // "create" | "edit"
  const [patientForm, setPatientForm] = useState({});

  const handleVerify = async () => {
    setError(null);
    setFoundPatient(null);
    setInfosimplesData(null);
    setFormMode(null);

    const cleanCpf = onlyDigits(cpf);
    if (cleanCpf.length !== 11) { setError("Digite um CPF válido (11 dígitos)."); return; }
    if (!birthdate) { setError("Informe sua data de nascimento."); return; }

    setVerifying(true);
    try {
      // 1. Primeiro busca o paciente no Feegow pelo CPF
      const patientResult = await agendamentoApi.buscarPaciente(cleanCpf);
      const existing = patientResult.content && patientResult.content[0];

      if (existing) {
        // Paciente encontrado no Feegow — valida a data de nascimento
        const enteredNorm = normalizeDate(birthdate);
        const feegowNorm = normalizeDate(existing.data_nascimento);
        if (enteredNorm && feegowNorm && enteredNorm !== feegowNorm) {
          setError("A data de nascimento informada não confere com o cadastro. Verifique e tente novamente.");
          setVerifying(false);
          return;
        }
        setFoundPatient(existing);
        updateFormData({ paciente: existing });
        setVerifying(false);
        return;
      }

      // 2. CPF não existe no Feegow — valida via Receita Federal (InfoSimples)
      const birthdateParts = birthdate.split("-");
      const birthdateBR = birthdateParts.length === 3
        ? `${birthdateParts[2]}/${birthdateParts[1]}/${birthdateParts[0]}`
        : birthdate;
      const cpfResult = await agendamentoApi.consultarCpf(cleanCpf, birthdateBR);
      if (Number(cpfResult.code) !== 0) {
        const msg = (cpfResult.errors && cpfResult.errors[0]) || cpfResult.code_message || "Não foi possível validar o CPF. Verifique os dados e tente novamente.";
        setError(msg);
        setVerifying(false);
        return;
      }
      const rfData = (cpfResult.data && cpfResult.data[0]) || {};
      setInfosimplesData(rfData);
      setPatientForm({
        nome_completo: rfData.nome || "",
        cpf: cleanCpf,
        data_nascimento: parseInfoSimplesDate(rfData.data_nascimento) || birthdate,
        genero: rfData.genero === "MASCULINO" ? "M" : rfData.genero === "FEMININO" ? "F" : "",
        nome_mae: rfData.nome_mae || "",
        telefone: "",
        celular: "",
        email: "",
        cep: "",
        cidade: "",
        estado: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
      });
      setFormMode("create");
    } catch (e) {
      setError(e.message || "Erro ao verificar CPF. Tente novamente.");
    }
    setVerifying(false);
  };

  const handleSavePatient = async () => {
    setError(null);
    setVerifying(true);
    try {
      const result = formMode === "create"
        ? await agendamentoApi.criarPaciente(patientForm)
        : await agendamentoApi.editarPaciente(patientForm);
      const savedPatient = result.content || result.data || result;
      if (savedPatient && savedPatient.id) {
        updateFormData({ paciente: savedPatient });
        onNext();
      } else if (foundPatient) {
        updateFormData({ paciente: foundPatient });
        onNext();
      } else {
        setError("Não foi possível salvar os dados do paciente.");
      }
    } catch (e) {
      setError(e.message || "Erro ao salvar paciente.");
    }
    setVerifying(false);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-[#1E293B]">Seus dados</h2>
        <p className="text-[#1E293B]/60 mt-2">Informe seu CPF e data de nascimento para continuar</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1.5">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              placeholder="000.000.000-00"
              maxLength={14}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Data de nascimento</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA] transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={verifying || !cpf || !birthdate}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#735AAA]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {verifying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          {verifying ? "Verificando..." : "Verificar dados"}
        </button>

        {error && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {infosimplesData && (
          <div className="mt-4 p-4 rounded-2xl bg-[#735AAA]/5 border border-[#735AAA]/15">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-[#735AAA]" />
              <span className="text-sm font-semibold text-[#735AAA]">Dados validados na Receita Federal</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#1E293B]/50">Nome</span>
                <span className="font-medium text-[#1E293B]">{infosimplesData.nome || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1E293B]/50">Situação cadastral</span>
                <span className="inline-flex items-center gap-1 font-medium text-green-600">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {infosimplesData.situacao_cadastral || "REGULAR"}
                </span>
              </div>
              {infosimplesData.nome_mae && (
                <div className="flex justify-between">
                  <span className="text-[#1E293B]/50">Nome da mãe</span>
                  <span className="font-medium text-[#1E293B]">{infosimplesData.nome_mae}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {foundPatient && (
          <div className="mt-6 p-5 rounded-2xl bg-green-50 border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-green-700">Paciente encontrado!</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#1E293B]/50">Nome</span>
                <span className="font-medium text-[#1E293B]">{foundPatient.nome_completo || foundPatient.nome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1E293B]/50">CPF</span>
                <span className="font-medium text-[#1E293B]">{foundPatient.cpf}</span>
              </div>
              {foundPatient.data_nascimento && (
                <div className="flex justify-between">
                  <span className="text-[#1E293B]/50">Nascimento</span>
                  <span className="font-medium text-[#1E293B]">{foundPatient.data_nascimento}</span>
                </div>
              )}
              {foundPatient.celular && (
                <div className="flex justify-between">
                  <span className="text-[#1E293B]/50">Celular</span>
                  <span className="font-medium text-[#1E293B]">{foundPatient.celular}</span>
                </div>
              )}
              {foundPatient.email && (
                <div className="flex justify-between">
                  <span className="text-[#1E293B]/50">E-mail</span>
                  <span className="font-medium text-[#1E293B]">{foundPatient.email}</span>
                </div>
              )}
            </div>
            <button
              onClick={onNext}
              className="mt-4 w-full bg-[#735AAA] text-white py-2.5 rounded-xl font-semibold hover:bg-[#5d478a] transition-colors"
            >
              Continuar
            </button>
          </div>
        )}

        {formMode === "create" && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="w-5 h-5 text-[#735AAA]" />
              <h3 className="font-heading font-semibold text-[#1E293B]">Novo cadastro</h3>
            </div>
            <p className="text-sm text-[#1E293B]/60 mb-4">Seus dados foram pré-preenchidos automaticamente pela Receita Federal. Complete com seu contato.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="col-span-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="Nome completo" value={patientForm.nome_completo || ""} onChange={(e) => setPatientForm({ ...patientForm, nome_completo: e.target.value })} />
              <input className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="Celular" value={patientForm.celular || ""} onChange={(e) => setPatientForm({ ...patientForm, celular: e.target.value })} />
              <input className="px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA]" placeholder="E-mail" value={patientForm.email || ""} onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })} />
              <input className={`px-4 py-2.5 rounded-xl border bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA] ${patientForm.cep ? "border-[#735AAA]/30 bg-[#735AAA]/[0.03]" : "border-gray-200"}`} placeholder="CEP" value={patientForm.cep || ""} onChange={(e) => setPatientForm({ ...patientForm, cep: e.target.value })} />
              <input className={`px-4 py-2.5 rounded-xl border bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA] ${patientForm.cidade ? "border-[#735AAA]/30 bg-[#735AAA]/[0.03]" : "border-gray-200"}`} placeholder="Cidade" value={patientForm.cidade || ""} onChange={(e) => setPatientForm({ ...patientForm, cidade: e.target.value })} />
              <input className={`px-4 py-2.5 rounded-xl border bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA] ${patientForm.endereco ? "border-[#735AAA]/30 bg-[#735AAA]/[0.03]" : "border-gray-200"}`} placeholder="Endereço" value={patientForm.endereco || ""} onChange={(e) => setPatientForm({ ...patientForm, endereco: e.target.value })} />
              <input className={`px-4 py-2.5 rounded-xl border bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA] ${patientForm.numero ? "border-[#735AAA]/30 bg-[#735AAA]/[0.03]" : "border-gray-200"}`} placeholder="Número" value={patientForm.numero || ""} onChange={(e) => setPatientForm({ ...patientForm, numero: e.target.value })} />
              <input className={`px-4 py-2.5 rounded-xl border bg-[#F9FBFF] focus:outline-none focus:ring-2 focus:ring-[#735AAA]/20 focus:border-[#735AAA] ${patientForm.bairro ? "border-[#735AAA]/30 bg-[#735AAA]/[0.03]" : "border-gray-200"}`} placeholder="Bairro" value={patientForm.bairro || ""} onChange={(e) => setPatientForm({ ...patientForm, bairro: e.target.value })} />
            </div>
            <button
              onClick={handleSavePatient}
              disabled={verifying}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#735AAA]/30 transition-all duration-300 disabled:opacity-50"
            >
              {verifying ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              {verifying ? "Salvando..." : "Salvar e continuar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}