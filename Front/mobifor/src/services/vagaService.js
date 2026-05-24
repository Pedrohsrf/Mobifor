const API_URL = import.meta.env.VITE_API_URL;

export async function listarVagas() {
  const response = await fetch(`${API_URL}/vagas/listar`);

  if (!response.ok) {
    throw new Error("Erro ao listar vagas");
  }

  return response.json();
}

export async function atualizarStatusVaga(id, status) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/vagas/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar status da vaga");
  }

  return response.json();
}