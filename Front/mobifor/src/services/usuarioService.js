const API_URL = import.meta.env.VITE_API_URL

export async function cadastrarUsuario(usuario) {
  const response = await fetch(`${API_URL}/usuarios/criar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.erro || 'Erro ao cadastrar usuário')
  }

  return data
}