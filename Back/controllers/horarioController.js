// Back/controllers/horarioController.js
import Horario from '../models/Horario.js';

export const listarHorarios = async (req, res) => {
  try {
    const horarios = await Horario.find().populate('onibus');
    res.json(horarios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar horários' });
  }
};

export const obterHorario = async (req, res) => {
  try {
    const horario = await Horario.findById(req.params.id).populate('onibus');
    if (!horario) return res.status(404).json({ erro: 'Horário não encontrado' });
    res.json(horario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter horário' });
  }
};

export const criarHorario = async (req, res) => {
  try {
    const { onibus, hora_saida, hora_chegada, dias_semana } = req.body;
    const novo = new Horario({ onibus, hora_saida, hora_chegada, dias_semana });
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar horário', err: JSON.stringify(err) });
  }
};

export const atualizarHorario = async (req, res) => {
  try {
    const { onibus, hora_saida, hora_chegada, dias_semana } = req.body;
    const horario = await Horario.findByIdAndUpdate(
      req.params.id,
      { onibus, hora_saida, hora_chegada, dias_semana },
      { new: true }
    );
    res.json(horario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar horário' });
  }
};

export const deletarHorario = async (req, res) => {
  try {
    await Horario.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar horário' });
  }
};