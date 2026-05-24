import Reserva from '../models/Reserva.js';
import Vaga from '../models/Vaga.js';

function getUsuarioId(req) {
  return (
    req.user?.id ||
    req.user?._id ||
    req.user?.user?.id ||
    req.user?.user?._id
  );
}

export const listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate('usuario')
      .populate({
        path: 'vaga',
        populate: {
          path: 'estacionamento'
        }
      })
      .sort({ createdAt: -1 });

    res.json(reservas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar reservas' });
  }
};

export const listarReservasPendentes = async (req, res) => {
  try {
    const reservas = await Reserva.find({ status: 'pendente' })
      .populate('usuario')
      .populate({
        path: 'vaga',
        populate: {
          path: 'estacionamento'
        }
      })
      .sort({ createdAt: -1 });

    res.json(reservas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar reservas pendentes' });
  }
};

export const listarMinhasReservas = async (req, res) => {
  try {
    const usuario = getUsuarioId(req);

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não identificado' });
    }

    const reservas = await Reserva.find({ usuario })
      .populate({
        path: 'vaga',
        populate: {
          path: 'estacionamento'
        }
      })
      .sort({ createdAt: -1 });

    res.json(reservas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar suas reservas' });
  }
};

export const obterReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate('usuario')
      .populate({
        path: 'vaga',
        populate: {
          path: 'estacionamento'
        }
      });

    if (!reserva) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }

    res.json(reserva);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter reserva' });
  }
};

export const criarReserva = async (req, res) => {
  try {
    const usuario = getUsuarioId(req);
    const { vaga } = req.body;

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não identificado' });
    }

    if (!vaga) {
      return res.status(400).json({ erro: 'Vaga não informada' });
    }

    const vagaExiste = await Vaga.findById(vaga);

    if (!vagaExiste) {
      return res.status(404).json({ erro: 'Vaga não encontrada' });
    }

    if (vagaExiste.status !== 'disponivel') {
      return res.status(400).json({ erro: 'Vaga não está disponível' });
    }

    const reservaPendenteDaVaga = await Reserva.findOne({
      vaga,
      status: 'pendente'
    });

    if (reservaPendenteDaVaga) {
      return res.status(400).json({
        erro: 'Esta vaga já possui uma solicitação pendente'
      });
    }

    const reservaExistenteDoUsuario = await Reserva.findOne({
      usuario,
      vaga,
      status: 'pendente'
    });

    if (reservaExistenteDoUsuario) {
      return res.status(400).json({
        erro: 'Você já possui uma solicitação pendente para esta vaga'
      });
    }

    const nova = await Reserva.create({
      usuario,
      vaga,
      status: 'pendente'
    });

    const reservaPopulada = await Reserva.findById(nova._id)
      .populate('usuario')
      .populate({
        path: 'vaga',
        populate: {
          path: 'estacionamento'
        }
      });

    res.status(201).json(reservaPopulada);
  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao criar reserva',
      err: JSON.stringify(err)
    });
  }
};

export const aprovarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);

    if (!reserva) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }

    if (reserva.status !== 'pendente') {
      return res.status(400).json({ erro: 'A reserva não está pendente' });
    }

    const vagaAtualizada = await Vaga.findOneAndUpdate(
      { _id: reserva.vaga, status: 'disponivel' },
      { status: 'reservada' },
      { new: true }
    );

    if (!vagaAtualizada) {
      return res.status(400).json({
        erro: 'A vaga não está mais disponível'
      });
    }

    reserva.status = 'aprovada';
    await reserva.save();

    await Reserva.updateMany(
      {
        _id: { $ne: reserva._id },
        vaga: reserva.vaga,
        status: 'pendente'
      },
      { status: 'rejeitada' }
    );

    const reservaPopulada = await Reserva.findById(reserva._id)
      .populate('usuario')
      .populate({
        path: 'vaga',
        populate: {
          path: 'estacionamento'
        }
      });

    res.json(reservaPopulada);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao aprovar reserva' });
  }
};

export const rejeitarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);

    if (!reserva) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }

    if (reserva.status !== 'pendente') {
      return res.status(400).json({ erro: 'A reserva não está pendente' });
    }

    reserva.status = 'rejeitada';
    await reserva.save();

    const reservaPopulada = await Reserva.findById(reserva._id)
      .populate('usuario')
      .populate({
        path: 'vaga',
        populate: {
          path: 'estacionamento'
        }
      });

    res.json(reservaPopulada);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao rejeitar reserva' });
  }
};

export const atualizarReserva = async (req, res) => {
  try {
    const { status } = req.body;

    const statusPermitidos = ['pendente', 'aprovada', 'rejeitada', 'cancelada'];

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' });
    }

    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!reserva) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }

    res.json(reserva);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar reserva' });
  }
};

export const cancelarReserva = async (req, res) => {
  try {
    const usuario = getUsuarioId(req);

    const reserva = await Reserva.findById(req.params.id);

    if (!reserva) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }

    if (String(reserva.usuario) !== String(usuario)) {
      return res.status(403).json({ erro: 'Você não pode cancelar esta reserva' });
    }

    if (reserva.status === 'aprovada') {
      await Vaga.findByIdAndUpdate(reserva.vaga, { status: 'disponivel' });
    }

    reserva.status = 'cancelada';
    await reserva.save();

    res.json(reserva);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cancelar reserva' });
  }
};