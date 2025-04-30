export interface Rutinas {
  _id:         string;
  nombre:      string;
  descripcion: string;
  ejercicios:  Ejercicio[];
  fechaInicio: Date;
  fechaFin:    Date;
  empleado:    string;
  createdAt:   Date;
  updatedAt:   Date;
  __v:         number;
}

export interface Ejercicio {
  nombre:       string;
  repeticiones: number;
  series:       number;
  descanso:     string;
  _id:          string;
}
