// Back/seeds/seedVagas.js

import mongoose from "mongoose";
import dotenv from "dotenv";

import Vaga from "../models/Vaga.js";
import Estacionamento from "../models/Estacionamento.js";

import { estacionamentosLayout } from "../data/vagasLayout.js";
import { gerarVagasDoBloco } from "../utils/gerarVagas.js";

dotenv.config();

async function seedVagas() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Conectado ao MongoDB");

    await Vaga.deleteMany({});
    await Estacionamento.deleteMany({});

    for (const estacionamentoData of estacionamentosLayout) {
      const estacionamento = await Estacionamento.create({
        nome: estacionamentoData.nome,
        localizacao: estacionamentoData.localizacao
      });

      const vagasDoEstacionamento = estacionamentoData.blocos.flatMap((bloco) => {
        const vagasGeradas = gerarVagasDoBloco(bloco);

        return vagasGeradas.map((vaga) => ({
          ...vaga,
          estacionamento: estacionamento._id
        }));
      });

      await Vaga.insertMany(vagasDoEstacionamento);

      console.log(
        `${estacionamentoData.nome}: ${vagasDoEstacionamento.length} vagas cadastradas`
      );
    }

    console.log("Seed finalizado com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("Erro ao executar seed:", err);
    process.exit(1);
  }
}

seedVagas();