import { clienteAxios } from "../api/conexion";
import { Saldo } from "../interface/Saldo";

export const getSaldos = async (texto: string): Promise<Saldo[]> => {
  try {
    const response = await clienteAxios.get("saldos", {
      params: {
        texto,
      },
    });

    const { ok, result } = response.data;

    if (!ok) {
      throw new Error("Error al obtener los saldos");
    }

    return result;
  } catch (error) {
    console.error("Error al obtener los saldos: ", error);
    throw error;
  }
};
