import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Onibus from '../models/Onibus.js';
import { onibusLayout } from '../data/onibusLayout.js';

dotenv.config();

async function seedOnibus() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Conectado ao MongoDB');

    await Onibus.deleteMany({});

    await Onibus.insertMany(onibusLayout);

    console.log(`${onibusLayout.length} ônibus cadastrados`);

    console.log('Seed finalizado com sucesso!');

    process.exit(0);

  } catch (err) {

    console.error('Erro ao executar seed:', err);

    process.exit(1);
  }
}

seedOnibus();