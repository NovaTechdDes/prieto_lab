import { pool } from "../config/db";

export async function obtenerSaldos(nombre?: string) {
  try {
    const request = pool.request();
    if (nombre) {
      request.input("nombre", nombre);
    }

    console.log(nombre);

    const result = await request.query(
      `select odontologos.id_odontologo, odontologos.nom_odontologo, cta_cte.paciente, sum(cta_cte.debe - cta_cte.haber) as saldo
        from odontologos 
        inner join cta_cte on odontologos.id_odontologo = cta_cte.id_odontologo 
        ${nombre ? "WHERE LOWER(odontologos.nom_odontologo) LIKE LOWER('%' + @nombre + '%')" : ""}
        group by odontologos.id_odontologo, odontologos.nom_odontologo, cta_cte.paciente 
        having sum(cta_cte.debe - cta_cte.haber) <> 0.00 
        order by odontologos.nom_odontologo asc`,
    );

    return result.recordset;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      msg: "Error al obtener los saldos",
    };
  }
}
