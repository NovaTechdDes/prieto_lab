export interface SaldoBackend {
  id_odontologo: number;
  nom_odontologo: string;
  paciente: string;
  saldo: number;
}

export interface Saldo {
  id_odontologo: number;
  nom_odontologo: string;
  paciente: Paciente[];
}

export interface Paciente {
  nombre_paciente: string;
  saldo: number;
}
