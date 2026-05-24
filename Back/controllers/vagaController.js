// Back/controllers/vagaController.js
import Vaga from '../models/Vaga.js';

export const listarVagas = async (req, res) => {
  try {
    const vagas = await Vaga.find().populate('estacionamento');
    res.json(vagas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar vagas' });
  }
};

export const obterVaga = async (req, res) => {
  try {
    const vaga = await Vaga.findById(req.params.id).populate('estacionamento');
    if (!vaga) return res.status(404).json({ erro: 'Vaga não encontrada' });
    res.json(vaga);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter vaga' });
  }
};

export const criarVaga = async (req, res) => {
  try {
    const { codigo, tipo, status, estacionamento } = req.body;
    const nova = new Vaga({ codigo, tipo, status, estacionamento });
    await nova.save();
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar vaga', err: JSON.stringify(err) });
  }
};

export const atualizarVaga = async (req, res) => {
  try {
    const { codigo, tipo, status, estacionamento } = req.body;
    const vaga = await Vaga.findByIdAndUpdate(
      req.params.id,
      { codigo, tipo, status, estacionamento },
      { new: true }
    );
    res.json(vaga);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar vaga' });
  }
};

export const atualizarStatusVaga = async (req, res) => {
  try {
    const { status } = req.body;

    const statusPermitidos = ['disponivel', 'ocupada', 'reservada'];

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' });
    }

    const vaga = await Vaga.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('estacionamento');

    if (!vaga) {
      return res.status(404).json({ erro: 'Vaga não encontrada' });
    }

    res.json(vaga);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar status da vaga' });
  }
};

export const deletarVaga = async (req, res) => {
  try {
    await Vaga.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar vaga' });
  }
};