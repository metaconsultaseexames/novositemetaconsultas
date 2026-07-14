import { base44 } from "@/api/base44Client";

const invoke = (payload) =>
  base44.functions.invoke("agendamento", payload).then((res) => res.data);

export const agendamentoApi = {
  getUnidades: () => invoke({ action: "unidades" }),
  getEspecialidades: () => invoke({ action: "especialidades" }),
  getProcedimentos: (especialidade_id) => invoke({ action: "procedimentos", especialidade_id }),
  getProfissionais: (especialidade_id) => invoke({ action: "profissionais", especialidade_id }),
  getDisponibilidade: (params) => invoke({ action: "disponibilidade", ...params }),
  buscarPaciente: (cpf) => invoke({ action: "buscarPaciente", cpf }),
  criarPaciente: (paciente) => invoke({ action: "criarPaciente", paciente }),
  editarPaciente: (paciente) => invoke({ action: "editarPaciente", paciente }),
  consultarCpf: (cpf, birthdate) => invoke({ action: "consultarCpf", cpf, birthdate }),
  criarAgendamento: (agendamento) => invoke({ action: "criarAgendamento", agendamento }),
};

export const getId = (item) =>
  item.especialidade_id || item.profissional_id || item.procedimento_id || item.id;

export const getDisplayName = (item) =>
  item.nome || item.empresa || item.descricao || item.especialidade ||
  item.procedimento || item.nome_completo || item.profissional || `Item ${getId(item)}`;

export const getUnitId = (unit) => unit.unidade_id ?? unit.id ?? unit.local_id;
export const getUnitName = (unit) => unit.nome_fantasia || unit.nome || unit.empresa || `Unidade ${getUnitId(unit)}`;
export const getUnitOnline = (unit) => Number(unit.ExibirAgendamentoOnline) === 1;
export const getFullAddress = (unit) => {
  const street = unit.endereco || [unit.logradouro, unit.numero].filter(Boolean).join(", ");
  const cityState = [unit.cidade, unit.estado].filter(Boolean).join(" - ");
  const parts = [street, unit.complemento, unit.bairro, cityState, unit.cep];
  return parts.filter(Boolean).join(", ");
};