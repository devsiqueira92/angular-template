import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataMode } from '../../shared/helpers/datamode.helper';
import { DetalheCategoriaComponent } from './components/detalhe-categoria/detalhe-categoria.component';
import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias.component';
import { CategoriaFormResolver } from './resolvers/categoria.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListaCategoriasComponent,
  },
  {
    path: 'create',
    data: { mode: DataMode.create },
    component: DetalheCategoriaComponent,
    resolve: { formData: CategoriaFormResolver },
  },

  {
    path: 'edit/:id',
    data: { mode: DataMode.edit },
    component: DetalheCategoriaComponent,
    resolve: { formData: CategoriaFormResolver },
  },

  {
    path: ':id',
    data: { mode: DataMode.view },
    component: DetalheCategoriaComponent,
    resolve: { formData: CategoriaFormResolver },
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaRoutingModule {}
