export interface MetricasID {
  msj:     string;
  data:    Data;
  errores: any[];
}

export interface Data {
  medidas:       Medidas;
  _id:           string;
  clienteId:     ClienteID;
  fecha:         Date;
  pesoCorporal:  number;
  grasaCorporal: number;
  imc:           number;
  rutinaActual:  string;
  progreso:      string;
  nota:          string;
  __v:           number;
}

export interface ClienteID {
  _id:              string;
  imagen:           null;
  nombreCompleto:   string;
  identidad:        string;
  numeroTelefono:   string;
  correo:           string;
  estado:           string;
  fechaIngreso:     Date;
  idPlan:           string;
  rutinasAsignadas: string[];
  diasRestantes:    number;
  __v:              number;
}

export interface Medidas {
  cintura: number;
  pecho:   number;
  biceps:  number;
}
