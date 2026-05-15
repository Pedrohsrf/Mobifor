// Back/controllers/rotaController.js
import Rota from '../models/Rota.js';

export const listarRotas = async (req, res) => {
  try {
    const rotas = await Rota.find();
    res.json(rotas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar rotas' });
  }
};

export const obterRota = async (req, res) => {
  try {
    const rota = await Rota.findById(req.params.id);
    if (!rota) return res.status(404).json({ erro: 'Rota não encontrada' });
    res.json(rota);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter rota' });
  }
};

export const criarRota = async (req, res) => {
  try {
    const { descricao, origem, destino, pontos } = req.body;
    const nova = new Rota({ descricao, origem, destino, pontos });
    await nova.save();
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar rota', err: JSON.stringify(err) });
  }
};

export const atualizarRota = async (req, res) => {
  try {
    const { descricao, origem, destino, pontos } = req.body;
    const rota = await Rota.findByIdAndUpdate(
      req.params.id,
      { descricao, origem, destino, pontos },
      { new: true }
    );
    res.json(rota);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar rota' });
  }
};

export const deletarRota = async (req, res) => {
  try {
    await Rota.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar rota' });
  }
};