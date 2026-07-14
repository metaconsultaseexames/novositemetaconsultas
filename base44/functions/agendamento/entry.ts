const FEEGOW_BASE = "https://api.feegow.com/v1/api/";

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { action } = body;

    const feegowToken = Deno.env.get("FEEGOW_TOKEN");
    if (!feegowToken) return Response.json({ error: 'FEEGOW_TOKEN not configured' }, { status: 500 });

    const feegowHeaders = {
      'x-access-token': feegowToken,
      'Content-Type': 'application/json'
    };

    switch (action) {
      case 'unidades': {
        const res = await fetch(FEEGOW_BASE + "company/list-unity", { headers: feegowHeaders });
        const data = await res.json();
        return Response.json(data);
      }

      case 'especialidades': {
        const res = await fetch(FEEGOW_BASE + "specialties/list", { headers: feegowHeaders });
        const data = await res.json();
        return Response.json(data);
      }

      case 'procedimentos': {
        const params = new URLSearchParams();
        if (body.especialidade_id) params.set('especialidade_id', body.especialidade_id);
        const url = FEEGOW_BASE + "procedures/list" + (params.toString() ? "?" + params.toString() : "");
        const res = await fetch(url, { headers: feegowHeaders });
        const data = await res.json();
        return Response.json(data);
      }

      case 'profissionais': {
        const params = new URLSearchParams();
        if (body.especialidade_id) params.set('especialidade_id', body.especialidade_id);
        const url = FEEGOW_BASE + "professional/list" + (params.toString() ? "?" + params.toString() : "");
        const res = await fetch(url, { headers: feegowHeaders });
        const data = await res.json();
        return Response.json(data);
      }

      case 'origens': {
        const res = await fetch(FEEGOW_BASE + "patient/list-origins", { headers: feegowHeaders });
        const data = await res.json();
        return Response.json(data);
      }

      case 'buscarPaciente': {
        const params = new URLSearchParams();
        if (body.cpf) params.set('cpf', body.cpf);
        const url = FEEGOW_BASE + "patient/list" + (params.toString() ? "?" + params.toString() : "");
        const res = await fetch(url, { headers: feegowHeaders });
        const data = await res.json();
        return Response.json(data);
      }

      case 'criarPaciente': {
        const res = await fetch(FEEGOW_BASE + "patient/save", {
          method: 'POST',
          headers: feegowHeaders,
          body: JSON.stringify(body.paciente)
        });
        const data = await res.json();
        return Response.json(data);
      }

      case 'editarPaciente': {
        const res = await fetch(FEEGOW_BASE + "patient/edit", {
          method: 'POST',
          headers: feegowHeaders,
          body: JSON.stringify(body.paciente)
        });
        const data = await res.json();
        return Response.json(data);
      }

      case 'disponibilidade': {
        const params = new URLSearchParams();
        if (body.tipo) params.set('tipo', body.tipo);
        if (body.unidade_id !== undefined && body.unidade_id !== null) params.set('unidade_id', body.unidade_id);
        if (body.especialidade_id) params.set('especialidade_id', body.especialidade_id);
        if (body.procedimento_id) params.set('procedimento_id', body.procedimento_id);
        if (body.profissional_id) params.set('profissional_id', body.profissional_id);
        if (body.data_start) params.set('data_start', body.data_start);
        if (body.data_end) params.set('data_end', body.data_end);
        const url = FEEGOW_BASE + "appoints/available-schedule?" + params.toString();
        const res = await fetch(url, { headers: feegowHeaders });
        const data = await res.json();
        return Response.json(data);
      }

      case 'criarAgendamento': {
        const res = await fetch(FEEGOW_BASE + "appoints/new-appoint", {
          method: 'POST',
          headers: feegowHeaders,
          body: JSON.stringify(body.agendamento)
        });
        const data = await res.json();
        return Response.json(data);
      }

      case 'consultarCpf': {
        const infosimplesToken = Deno.env.get("INFOSIMPLES_TOKEN");
        if (!infosimplesToken) return Response.json({ error: 'INFOSIMPLES_TOKEN not configured' }, { status: 500 });
        const params = new URLSearchParams();
        params.set('token', infosimplesToken);
        params.set('cpf', body.cpf);
        params.set('birthdate', body.birthdate);
        params.set('referrer', 'base44');
        const res = await fetch("https://api.infosimples.com/api/v2/consultas/receita-federal/cpf", {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        });
        const data = await res.json();
        return Response.json(data);
      }

      default:
        return Response.json({ error: 'Invalid action: ' + action }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});