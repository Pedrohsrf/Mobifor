export const verificarAdmin = (req, res, next) => {
  const tipoUsuario =
    req.user?.tipo ||
    req.user?.user?.tipo ||
    req.user?.usuario?.tipo

  if (tipoUsuario !== 'admin') {
    return res.status(403).json({
      erro: 'Acesso negado. Apenas administradores podem realizar essa ação.'
    })
  }

  next()
}