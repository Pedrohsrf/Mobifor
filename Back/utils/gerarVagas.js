export function gerarVagasDoBloco(bloco) {
  const distanciaHorizontal = 14;
  const distanciaVertical = 12;

  return Array.from({ length: bloco.quantidade }, (_, index) => {
    const numero = String(index + 1).padStart(2, "0");

    const x =
      bloco.direcao === "horizontal"
        ? bloco.inicioX + index * distanciaHorizontal
        : bloco.inicioX;

    const y =
      bloco.direcao === "vertical"
        ? bloco.inicioY + index * distanciaVertical
        : bloco.inicioY;

    return {
      codigo: `${bloco.setor}${numero}`,
      setor: bloco.setor,
      tipo: bloco.tipo,
      status: "disponivel",
      x,
      y
    };
  });
}