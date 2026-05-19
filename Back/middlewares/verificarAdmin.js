// Back/middlewares/verificarAdmin.js
export const verificarAdmin = (req, res, next) => {
  const usuario = req.user?.user;
  
  if (!usuario || usuario.tipo !== 'admin') {
    return res.status(403).json({ erro: 'Acesso negado! Apenas administradores podem realizar essa ação.' });
  }
  
  next();
};