// Back/controllers/estacionamentoController.js
import Estacionamento from '../models/Estacionamento.js';

export const listarEstacionamentos = async (req, res) => {
  try {
    const estacionamentos = await Estacionamento.find().populate('vagas');
    res.json(estacionamentos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar estacionamentos' });
  }
};

export const obterEstacionamento = async (req, res) => {
  try {
    const estacionamento = await Estacionamento.findById(req.params.id).populate('vagas');
    if (!estacionamento) return res.status(404).json({ erro: 'Estacionamento não encontrado' });
    res.json(estacionamento);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter estacionamento' });
  }
};

export const criarEstacionamento = async (req, res) => {
  try {
    const { nome, localizacao, vagas } = req.body;
    const novo = new Estacionamento({ nome, localizacao, vagas });
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar estacionamento', err: JSON.stringify(err) });
  }
};

export const atualizarEstacionamento = async (req, res) => {
  try {
    const { nome, localizacao, vagas } = req.body;
    const estacionamento = await Estacionamento.findByIdAndUpdate(
      req.params.id,
      { nome, localizacao, vagas },
      { new: true }
    );
    res.json(estacionamento);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar estacionamento' });
  }
};

export const deletarEstacionamento = async (req, res) => {
  try {
    await Estacionamento.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar estacionamento' });
  }
};