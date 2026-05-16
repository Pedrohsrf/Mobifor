const API_URL = import.meta.env.VITE_API_URL

export async function loginUsuario(matricula, senha) {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      matricula,
      senha
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.erro || 'Erro ao fazer login')
  }

  return data
}