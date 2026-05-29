import Onibus from '../models/Onibus.js';

export const listarOnibus = async (req, res) => {
  try {
    const onibus = await Onibus.find();

    res.json(onibus);

  } catch (err) {

    res.status(500).json({
      erro: 'Erro ao listar ônibus'
    });
  }
};

export const obterOnibus = async (req, res) => {
  try {

    const onibus = await Onibus.findById(req.params.id);

    if (!onibus) {
      return res.status(404).json({
        erro: 'Ônibus não encontrado'
      });
    }

    res.json(onibus);

  } catch (err) {

    res.status(500).json({
      erro: 'Erro ao obter ônibus'
    });
  }
};

export const atualizarOnibus = async (req, res) => {
  try {

    const {
      numero,
      pontos_passagem,
      terminal_chegada,
      status
    } = req.body;

    const onibus = await Onibus.findById(req.params.id);

    if (!onibus) {
      return res.status(404).json({
        erro: 'Ônibus não encontrado'
      });
    }

    onibus.numero = numero;
    onibus.pontos_passagem = pontos_passagem;
    onibus.terminal_chegada = terminal_chegada;
    onibus.status = status;

    await onibus.save();

    res.json(onibus);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      erro: 'Erro ao atualizar ônibus'
    });
  }
};