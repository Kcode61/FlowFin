export async function buscarUsuario() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
export async function adicionarProjeto(
  nome: string,
  descricao: string,
  valor: number,
  dataFim: string,
  dataInicio: string,
  status: string,
) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      descricao,
      valor,
      dataFim,
      dataInicio,
      status,
    }),
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
export async function adicionarReceita(
  descricao: string,
  valor: number,
  cliente: string,
  categoria: string,
  dataInicio: string,
  status: string,
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/receita/me`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descricao,
        valor,
        categoria,
        cliente,
        dataInicio,
        status,
      }),
    },
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
export async function adicionarDespesa(
  descricao: string,
  valor: number,
  pagamento: number,
  categoria: string,
  dataInicio: string,
  status: string,
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/despesa/me`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descricao,
        valor,
        categoria,
        pagamento,
        dataInicio,
        status,
      }),
    },
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
export async function deletarDespesa(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/despesa/me/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return false;
  }

  return true;
}
export async function deletarReceita(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/receita/me/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return false;
  }

  return true;
}
export async function deletarProjeto(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projeto/me/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return false;
  }

  return true;
}

export async function listarProjetos() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projetos/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return false;
  }

  return await response.json();
}
export async function listarDespesas() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/despesas/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return false;
  }

  return await response.json();
}
export async function listarReceitas() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/receitas/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return false;
  }

  return await response.json();
}
