import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPlanesComponent } from './pages/layout-planes/layout-planes.component';
import { ListPlComponent } from './pages/list-pl/list-pl.component';
import { AgregarPlComponent } from './pages/agregar-pl/agregar-pl.component';




const routes: Routes = [


  {
    path:'',
    component:LayoutPlanesComponent,
    children:[
      {
        path:'list',
        component:ListPlComponent
      },{
        path:'agregar',
        component:AgregarPlComponent
      }
      ,{
        path:'edit/:id',
        component:AgregarPlComponent
      },
      {
        path:'**',
        redirectTo:'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanesRoutingModule { }
