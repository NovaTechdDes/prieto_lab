import { Request, Response } from "express";
import { obtenerSaldos } from "../services/saldos.services";

export const getSaldos = async (req: Request, res: Response) => {
  const nombre = req.query.texto as string;

  const result = await obtenerSaldos(nombre);

  if (!result) {
    return res.status(404).json({
      ok: false,
      msg: "No se encontraron saldos",
    });
  }

  res.status(200).json({
    ok: true,
    msg: "Conexion Exitosa a los saldos",
    result,
  });
};
