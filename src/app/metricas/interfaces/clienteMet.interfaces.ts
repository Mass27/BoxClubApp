export interface ClienteMet {
  medidas:       Medidas;
  _id:           string;
  clienteId:     string;
  fecha:         Date;
  pesoCorporal:  number;
  grasaCorporal: number;
  imc:           number;
  rutinaActual:  string;
  progreso:      string;
  nota:          string;
  __v:           number;
}

export interface Medidas {
  cintura: number;
  pecho:   number;
  biceps:  number;
}
