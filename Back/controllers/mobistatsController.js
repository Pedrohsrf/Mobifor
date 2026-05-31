import Vaga from "../models/Vaga.js";
import Estacionamento from "../models/Estacionamento.js";

export const obterMobistats = async (req, res) => {
  try {
    const totalVagas = await Vaga.countDocuments();

    const vagasDisponiveis = await Vaga.countDocuments({
      status: "disponivel",
    });

    const vagasIndisponiveis = await Vaga.countDocuments({
      status: {
        $in: ["ocupada", "reservada"],
      },
    });

    const taxaDisponivel =
      totalVagas > 0 ? ((vagasDisponiveis / totalVagas) * 100).toFixed(1) : 0;

    const taxaIndisponivel =
      totalVagas > 0 ? ((vagasIndisponiveis / totalVagas) * 100).toFixed(1) : 0;

    const estacionamentos = await Estacionamento.find();

    let estacionamentoMaisVagas = null;
    let estacionamentoMenosVagas = null;

    let maiorQtd = 0;
    let menorQtd = Infinity;

    for (const est of estacionamentos) {
      const qtdDisponiveis = await Vaga.countDocuments({
        estacionamento: est._id,
        status: "disponivel",
      });

      if (qtdDisponiveis > maiorQtd) {
        maiorQtd = qtdDisponiveis;
        estacionamentoMaisVagas = est.nome;
      }

      if (qtdDisponiveis < menorQtd) {
        menorQtd = qtdDisponiveis;
        estacionamentoMenosVagas = est.nome;
      }
    }

    res.json({
      vagasDisponiveis,
      vagasIndisponiveis,
      taxaDisponivel,
      taxaIndisponivel,

      estacionamentoMaisVagas,
      maiorQtd,

      estacionamentoMenosVagas,
      menorQtd,
    });
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao carregar mobistats",
    });
  }
};