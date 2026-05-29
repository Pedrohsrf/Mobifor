import { buscarToken } from "../utils/authStorage"

const API_URL = import.meta.env.VITE_API_URL

export async function obterMobistats() {

  const token = buscarToken()

  const response = await fetch(`${API_URL}/mobistats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao carregar mobistats")
  }

  return data
}