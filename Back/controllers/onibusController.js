// Back/controllers/onibusController.js
import Onibus from '../models/Onibus.js';

export const listarOnibus = async (req, res) => {
  try {
    const onibus = await Onibus.find().populate('rota');
    res.json(onibus);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar ônibus' });
  }
};

export const obterOnibus = async (req, res) => {
  try {
    const onibus = await Onibus.findById(req.params.id).populate('rota');
    if (!onibus) return res.status(404).json({ erro: 'Ônibus não encontrado' });
    res.json(onibus);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter ônibus' });
  }
};

export const criarOnibus = async (req, res) => {
  try {
    const { identificador, localizacao_atual, rota } = req.body;
    const novo = new Onibus({ identificador, localizacao_atual, rota });
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar ônibus', err: JSON.stringify(err) });
  }
};

export const atualizarOnibus = async (req, res) => {
  try {
    const { identificador, localizacao_atual, rota } = req.body;
    const onibus = await Onibus.findByIdAndUpdate(
      req.params.id,
      { identificador, localizacao_atual, rota },
      { new: true }
    );
    res.json(onibus);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar ônibus' });
  }
};

export const deletarOnibus = async (req, res) => {
  try {
    await Onibus.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar ônibus' });
  }
};