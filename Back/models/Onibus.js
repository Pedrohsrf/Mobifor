import mongoose from 'mongoose';

const onibusSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true
  },

  ponto_partida: {
    type: String,
    required: true
  },

  pontos_passagem: [{
    type: String
  }],

  terminal_chegada: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['ativo', 'inativo'],
    default: 'ativo'
  }
});

export default mongoose.model('Onibus', onibusSchema);