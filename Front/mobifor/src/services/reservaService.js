const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
}

export async function solicitarReserva(vagaId) {
  const response = await fetch(`${API_URL}/reservas/criar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      vaga: vagaId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao solicitar reserva");
  }

  return data;
}

export async function listarReservasPendentes() {
  const response = await fetch(`${API_URL}/reservas/pendentes`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao listar reservas pendentes");
  }

  return data;
}

export async function aprovarReserva(id) {
  const response = await fetch(`${API_URL}/reservas/${id}/aprovar`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao aprovar reserva");
  }

  return data;
}

export async function rejeitarReserva(id) {
  const response = await fetch(`${API_URL}/reservas/${id}/rejeitar`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao rejeitar reserva");
  }

  return data;
}