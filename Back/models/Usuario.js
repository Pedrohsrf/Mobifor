// Back/models/Usuario.js
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  matricula: { type: String, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['aluno', 'professor', 'admin'], required: true }
});

export default mongoose.model('Usuario', usuarioSchema);