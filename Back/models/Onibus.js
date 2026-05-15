// Back/models/Onibus.js
import mongoose from 'mongoose';

const onibusSchema = new mongoose.Schema({
  identificador: { type: String, required: true, unique: true },
  localizacao_atual: { type: String },
  rota: { type: mongoose.Schema.Types.ObjectId, ref: 'Rota', required: true }
});

export default mongoose.model('Onibus', onibusSchema);