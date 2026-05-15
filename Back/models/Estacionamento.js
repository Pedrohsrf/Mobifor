// Back/models/Estacionamento.js
import mongoose from 'mongoose';

const estacionamentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  localizacao: { type: String, required: true },
  vagas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vaga' }]
});

export default mongoose.model('Estacionamento', estacionamentoSchema);