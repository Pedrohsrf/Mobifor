import { useEffect, useState } from "react";

import {
  listarReservasPendentes,
  aprovarReserva,
  rejeitarReserva,
} from "../../services/reservaService";

export default function ReservaValidacaoSection({ onReservaAtualizada }) {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarReservas();
  }, []);

  async function carregarReservas() {
    try {
      setLoading(true);
      setErro("");

      const data = await listarReservasPendentes();
      setReservas(data);
    } catch (err) {
      setErro(err.message || "Erro ao carregar reservas.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAprovar(id) {
    try {
      const reservaAtualizada = await aprovarReserva(id);

      setReservas((prev) =>
        prev.map((reserva) =>
          reserva._id === id ? reservaAtualizada : reserva
        )
      );

      if (onReservaAtualizada) {
        onReservaAtualizada();
      }
    } catch (err) {
      alert(err.message || "Erro ao aprovar reserva.");
    }
  }

  async function handleRejeitar(id) {
    try {
      const reservaAtualizada = await rejeitarReserva(id);

      setReservas((prev) =>
        prev.map((reserva) =>
          reserva._id === id ? reservaAtualizada : reserva
        )
      );
    } catch (err) {
      alert(err.message || "Erro ao rejeitar reserva.");
    }
  }

  function getIdentificacaoUsuario(usuario) {
    return (
      usuario?.matricula ||
      usuario?.nome ||
      usuario?.email ||
      "Aluno"
    );
  }

  function getCodigoVaga(vaga) {
    return vaga?.codigo || "Vaga";
  }

  return (
    <section className="bg-gray-100 rounded-2xl border border-blue-200 shadow-sm p-8 mt-4 mb-10">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
        Validação de reserva
      </h2>

      {loading && (
        <p className="text-center text-sm font-semibold text-blue-500">
          Carregando solicitações...
        </p>
      )}

      {erro && !loading && (
        <p className="text-center text-sm font-semibold text-red-500">
          {erro}
        </p>
      )}

      {!loading && !erro && reservas.length === 0 && (
        <p className="text-center text-sm font-semibold text-gray-500">
          Nenhuma solicitação pendente no momento.
        </p>
      )}

      {!loading && !erro && reservas.length > 0 && (
        <div className="flex flex-wrap justify-center gap-5">
          {reservas.map((reserva) => (
            <div key={reserva._id} className="flex flex-col items-center gap-2">
              <div
                className={`flex flex-col items-center justify-center gap-1 w-28 h-32 rounded-2xl border shadow-sm bg-white p-3 transition
                  ${reserva.status === "aprovada" ? "border-green-300 bg-green-50" : ""}
                  ${reserva.status === "rejeitada" ? "border-red-300 bg-red-50 opacity-60" : ""}
                  ${reserva.status === "pendente" ? "border-gray-200" : ""}
                `}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="bi bi-person-fill text-blue-500 text-2xl" />
                </div>

                <span className="text-xs text-gray-500 font-medium text-center">
                  {getIdentificacaoUsuario(reserva.usuario)}
                </span>

                <span className="text-xs text-blue-500 font-bold text-center">
                  {getCodigoVaga(reserva.vaga)}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleRejeitar(reserva._id)}
                  disabled={reserva.status !== "pendente"}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-white shadow-sm transition
                    ${reserva.status === "rejeitada"
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 active:scale-95"}
                  `}
                >
                  <i className="bi bi-x-lg text-xs" />
                </button>

                <button
                  onClick={() => handleAprovar(reserva._id)}
                  disabled={reserva.status !== "pendente"}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-white shadow-sm transition
                    ${reserva.status === "aprovada"
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 active:scale-95"}
                  `}
                >
                  <i className="bi bi-check-lg text-xs" />
                </button>
              </div>

              {reserva.status !== "pendente" && (
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full
                    ${reserva.status === "aprovada"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"}
                  `}
                >
                  {reserva.status === "aprovada" ? "Aprovada" : "Rejeitada"}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}