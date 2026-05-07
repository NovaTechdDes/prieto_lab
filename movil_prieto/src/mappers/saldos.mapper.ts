import { Saldo, SaldoBackend } from "../interface/Saldo";

export const mapSaldosTotal = (saldos: SaldoBackend[]) => {
  const agrupado = saldos.reduce((acc: Saldo[], item: SaldoBackend) => {
    const existing = acc.find((o) => o.id_odontologo === item.id_odontologo);

    if (existing) {
      existing.paciente.push({
        nombre_paciente: item.paciente,

        saldo: item.saldo,
      });
    } else {
      acc.push({
        id_odontologo: item.id_odontologo,
        nom_odontologo: item.nom_odontologo,
        paciente: [
          {
            nombre_paciente: item.paciente,
            saldo: item.saldo,
          },
        ],
      });
    }

    return acc;
  }, []);

  return agrupado;
};
