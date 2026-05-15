// Back/models/Reserva.js
import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  vaga: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaga', required: true },
  horario_chegada: { type: Date, required: true },
  horario_interno: { type: Date, default: Date.now },
  status: { type: String, enum: ['ativo', 'cancelado', 'expirado'], default: 'ativo' }
});

export default mongoose.model('Reserva', reservaSchema);

