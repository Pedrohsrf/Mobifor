import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },

  vaga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaga',
    required: true
  },

  status: {
    type: String,
    enum: ['pendente', 'aprovada', 'rejeitada', 'cancelada'],
    default: 'pendente'
  }
}, {
  timestamps: true
});

export default mongoose.model('Reserva', reservaSchema);