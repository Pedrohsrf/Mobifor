import { buscarToken } from "../utils/authStorage"

const API_URL = import.meta.env.VITE_API_URL

export async function listarOnibus() {
  const token = buscarToken()

  const response = await fetch(`${API_URL}/onibus`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao listar ônibus")
  }

  return data
}

export async function atualizarOnibus(id, body) {
  const token = buscarToken()

  const response = await fetch(`${API_URL}/onibus/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao atualizar ônibus")
  }

  return data
}