// Back/models/Rota.js
import mongoose from 'mongoose';

const rotaSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  origem: { type: String, required: true },
  destino: { type: String, required: true },
  pontos: [{ type: String }]
});

export default mongoose.model('Rota', rotaSchema);