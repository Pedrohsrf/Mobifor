export function salvarLogin(token, usuario) {
  localStorage.setItem('token', token)
  localStorage.setItem('usuario', JSON.stringify(usuario))
}

export function buscarToken() {
  return localStorage.getItem('token')
}

export function buscarUsuario() {
  const usuario = localStorage.getItem('usuario')
  return usuario ? JSON.parse(usuario) : null
}

export function removerLogin() {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
}