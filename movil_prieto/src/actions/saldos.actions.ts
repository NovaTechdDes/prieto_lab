import { clienteAxios } from "../api/conexion";
import { Saldo, SaldoBackend } from "../interface/Saldo";
import { mapSaldosTotal } from "../mappers/saldos.mapper";

export const getSaldos = async (texto: string): Promise<Saldo[]> => {
  try {
    const response = await clienteAxios.get("saldos", {
      params: {
        texto,
      },
    });

    const { ok, result } = response.data as {
      ok: boolean;
      result: SaldoBackend[];
    };

    if (!ok) {
      throw new Error("Error al obtener los saldos");
    }

    return mapSaldosTotal(result);
  } catch (error) {
    console.error("Error al obtener los saldos: ", error);
    throw error;
  }
};
