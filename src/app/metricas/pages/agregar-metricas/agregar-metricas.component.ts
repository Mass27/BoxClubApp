import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetricasService } from '../../services/metricas.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Metricas } from '../../interfaces/metricas.interfaces';
import { MetricasID } from '../../interfaces/metricasId.interfaces';
import { Clientes } from 'src/app/usuarios/interfaces/usuario.interfaces';
import { RutinasService } from 'src/app/rutinas/services/rutinas.service';
import { Rutinas } from 'src/app/rutinas/interfaces/rutinas.interfaces';
import { usuarioService } from 'src/app/usuarios/services/usuarios.service';

@Component({
  selector: 'app-agregar-metricas',
  templateUrl: './agregar-metricas.component.html',
  // styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
  // host: { class: 'contents' },
})
export class AgregarMetricasComponent implements OnInit {
  metricaForm: FormGroup;
  isEditMode: boolean = false;
  metricaId: string | null = null;
  modoEvaluacion: boolean = false;
  metricasHistorial: Metricas[] = [];
  mostrarFormulario = false;
  clienteId: string = '';
  clientes: Clientes[] = [];
  rutinas: Rutinas[] = [];
  showFormulario = false;
 filtroFecha: string = '';
ordenHistorial: 'reciente' | 'antiguo' = 'reciente';
  // @HostBinding('class') protected readonly class = 'contents'; // Makes component host as if it was not there, can offer less css headaches. Assumes .contents{display:contents} css class exits
  constructor(
    private fb: FormBuilder,
    private metricasService: MetricasService,
    private rutinaServices: RutinasService,
    private usuariosService: usuarioService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe
  ) {
    this.metricaForm = this.fb.group({
      clienteId: [''],
      fecha: ['', Validators.required],
      pesoCorporal: ['', Validators.required],
      grasaCorporal: ['', Validators.required],
      imc: ['', Validators.required],
      rutinaActual: ['', Validators.required],
      progreso: ['', Validators.required],
      nota: [''],
      medidas: this.fb.group({
        cintura: ['', Validators.required],
        pecho: ['', Validators.required],
        biceps: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.metricasService.obtenerPorId(id).subscribe((resp: MetricasID) => {
          const metrica = resp.data;

          this.metricaId = metrica._id;
          this.clienteId = metrica.clienteId._id;

          this.metricaForm.patchValue({
            clienteId: this.clienteId,
          });

          this.cargarHistorial(this.clienteId);
        });
      }
    });

    this.getRutinaName();
    this.getCienteName();
  }

  cargarHistorial(id: string) {
    this.metricasService.getMetricasPorCliente(id).subscribe((metricas) => {
      this.metricasHistorial = metricas;
    });
  }

  getCienteName() {
    this.usuariosService.getAllUser().subscribe((clientes: Clientes[]) => {
      this.clientes = clientes;
    });
  }

  getRutinaName() {
    this.rutinaServices.getAllRutinas().subscribe((rutinas: Rutinas[]) => {
      this.rutinas = rutinas;
    });
  }

  cargarParaEditar(metrica: Metricas) {
    this.metricaForm.patchValue({
      ...metrica,
      fecha: this.datepipe.transform(metrica.fecha, 'yyyy-MM-dd'),
    });
    this.mostrarFormulario = true;
    this.isEditMode = true;
    this.metricaId = metrica._id;
  }
  onSubmit() {
    const datos = this.metricaForm.value;

    if (!datos.clienteId && this.clienteId) {
      datos.clienteId = this.clienteId;
    }

    // const esHistorial =
    //   this.ActivatedRoute.snapshot.routeConfig?.path?.includes('edit');

    // const payload = {
    //   ...datos,
    //   ...(this.isEditMode && { _id: this.metricaId }),
    //   esHistorial:true

    // };

    if (this.isEditMode) {
      datos._id = this.metricaId;
      this.metricasService.updateRutinas(datos).subscribe(() => {
        this.cargarHistorial(this.clienteId);
        this.resetForm();
      });
    } else {
      this.metricasService.guardar(datos).subscribe(() => {
        this.resetForm();
        this.router.navigate(['/metricas']);
      });
    }
  }
  toggleFormulario() {
    this.showFormulario = !this.showFormulario;
  }

  resetForm() {
    this.metricaForm.reset();
    this.isEditMode = false;
    this.metricaId = '';
  }

 get metricasHistorialFiltradas() {
  let filtradas = this.metricasHistorial;

  if (this.filtroFecha) {
    const fechaSeleccionada = new Date(this.filtroFecha).toDateString();
    filtradas = filtradas.filter(m => new Date(m.fecha).toDateString() === fechaSeleccionada);
  }

  filtradas.sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime();
    const fechaB = new Date(b.fecha).getTime();
    return this.ordenHistorial === 'reciente' ? fechaB - fechaA : fechaA - fechaB;
  });

  return filtradas;
}

}
