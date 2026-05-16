// Back/controllers/usuarioController.js
import { hashSenha, verificarSenha } from '../utils/bcrypt.js';
import { gerarToken } from '../utils/jwt.js';
import Usuario from '../models/Usuario.js';

export const login = async (req, res) => {
  const { matricula, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ matricula });
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    const senhaValida = await verificarSenha(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    const token = gerarToken(usuario);

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        matricula: usuario.matricula,
        tipo: usuario.tipo
      }
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no login', err: JSON.stringify(err) });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
};

export const obterUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter usuário' });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, matricula, senha, tipo } = req.body;

    const senhaHash = await hashSenha(senha);

    const novo = new Usuario({
      nome,
      email,
      matricula,
      senha: senhaHash,
      tipo
    });

    await novo.save();

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuario: {
        id: novo._id,
        nome: novo.nome,
        email: novo.email,
        matricula: novo.matricula,
        tipo: novo.tipo
      }
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário', err: JSON.stringify(err) });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, matricula, senha, tipo } = req.body;
    const senhaHash = await hashSenha(senha);
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nome, email, matricula, senha: senhaHash, tipo },
      { new: true }
    );
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
};

export const deletarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
};