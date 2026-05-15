// Back/models/Vaga.js
import mongoose from 'mongoose';

const vagaSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  tipo: { type: String, enum: ['carro', 'carro_eletrico', 'moto', 'moto_eletrica'], required: true },
  status: { type: String, enum: ['disponivel', 'ocupada', 'reservada'], default: 'disponivel' },
  estacionamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Estacionamento', required: true }
});

export default mongoose.model('Vaga', vagaSchema);