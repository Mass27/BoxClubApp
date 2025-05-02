
export interface IDUsuarios {
  _id:            string;
  imagen:         string;
  nombreCompleto: string;
  identidad:      string;
  numeroTelefono: string;
  correo:         string;
  estado:         string;
  fechaIngreso:   Date;
  idPlan:         string;
  diasRestantes:  number;
  __v:            number;
  rutinaAsignada: string;
}
