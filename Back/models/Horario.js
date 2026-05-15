// Back/models/Horario.js
import mongoose from 'mongoose';

const horarioSchema = new mongoose.Schema({
  onibus: { type: mongoose.Schema.Types.ObjectId, ref: 'Onibus', required: true },
  hora_saida: { type: String, required: true },
  hora_chegada: { type: String, required: true },
  dias_semana: [{ type: String, enum: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] }]
});

export default mongoose.model('Horario', horarioSchema);