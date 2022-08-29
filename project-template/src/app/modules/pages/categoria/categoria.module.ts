import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { DetalheCategoriaComponent } from './components/detalhe-categoria/detalhe-categoria.component';
import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoriaFormService } from './services/categoria-form.service';
import { CategoriaFormResolver } from './resolvers/categoria.resolver';

@NgModule({
  declarations: [DetalheCategoriaComponent, ListaCategoriasComponent],
  imports: [CommonModule, CategoriaRoutingModule, SharedModule],
  providers: [CategoriaFormService, CategoriaFormResolver],
})
export class CategoriaModule {}
