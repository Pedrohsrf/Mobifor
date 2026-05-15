// Back/controllers/reservaController.js
import Reserva from '../models/Reserva.js';
import Vaga from '../models/Vaga.js';

export const listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('usuario').populate('vaga');
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar reservas' });
  }
};

export const obterReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('usuario').populate('vaga');
    if (!reserva) return res.status(404).json({ erro: 'Reserva não encontrada' });
    res.json(reserva);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter reserva' });
  }
};

export const criarReserva = async (req, res) => {
  try {
    const { usuario, vaga, horario_chegada } = req.body;

    const vagaExiste = await Vaga.findById(vaga);
    if (!vagaExiste) return res.status(404).json({ erro: 'Vaga não encontrada' });
    if (vagaExiste.status !== 'disponivel') return res.status(400).json({ erro: 'Vaga não está disponível' });

    const nova = new Reserva({ usuario, vaga, horario_chegada });
    await nova.save();

    await Vaga.findByIdAndUpdate(vaga, { status: 'reservada' });

    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar reserva', err: JSON.stringify(err) });
  }
};

export const atualizarReserva = async (req, res) => {
  try {
    const { status } = req.body;
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(reserva);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar reserva' });
  }
};

export const cancelarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ erro: 'Reserva não encontrada' });

    await Vaga.findByIdAndUpdate(reserva.vaga, { status: 'disponivel' });
    await Reserva.findByIdAndDelete(req.params.id);

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cancelar reserva' });
  }
};