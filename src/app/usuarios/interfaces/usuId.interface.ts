
export interface IDUsuarios {
  estado:         string;
  _id:            string;
  nombreCompleto: string;
  identidad:      number;
  numeroTelefono: string;
  fechaIngreso:   string;
  __v:            number;
  correo:         string;
  imagen?:        string;
  idPlan?:        string;
}
