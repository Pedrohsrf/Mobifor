export function salvarLogin(token, usuario, permanecerConectado = false) {
  removerLogin()

  const storage = permanecerConectado ? localStorage : sessionStorage

  storage.setItem('token', token)
  storage.setItem('usuario', JSON.stringify(usuario))
}

export function buscarToken() {
  return sessionStorage.getItem('token') || localStorage.getItem('token')
}

export function buscarUsuario() {
  const usuario =
    sessionStorage.getItem('usuario') || localStorage.getItem('usuario')

  return usuario ? JSON.parse(usuario) : null
}

export function removerLogin() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('usuario')

  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
}