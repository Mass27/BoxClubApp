export interface ClientePag {
  total:      number;
  page:       number;
  totalPages: number;
  clientes:   ClientePage[];
}

export interface ClientePage {
  _id:              string;
  imagen:           null | string;
  nombreCompleto:   string;
  identidad:        string;
  numeroTelefono:   string;
  correo:           string;
  estado:           string;
  fechaIngreso:     Date;
  idPlan:           string;
  diasRestantes:    number;
  __v:              number;
  rutinasAsignadas: any[];
  rutinaAsignada?:  string;
}
