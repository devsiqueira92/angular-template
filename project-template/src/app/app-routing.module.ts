import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // canActivate: [isAuthenticatedGuard],
    // data: { authDesiredValue: true, redirect: '/' },
    loadChildren: () =>
      import(
        /* webpackChunkName: "DespesaModule" */
        './modules/pages/despesa/despesa.module'
      ).then((m) => m.DespesaModule),
  },
  {
    path: 'categoria',
    // canActivate: [isAuthenticatedGuard],
    // data: { authDesiredValue: true, redirect: '/' },
    loadChildren: () =>
      import(
        /* webpackChunkName: "CategoriaModule" */
        './modules/pages/categoria/categoria.module'
      ).then((m) => m.CategoriaModule),
  },
  {
    path: 'estabelecimento',
    // canActivate: [isAuthenticatedGuard],
    // data: { authDesiredValue: true, redirect: '/' },
    loadChildren: () =>
      import(
        /* webpackChunkName: "EstabelecimentoModule" */
        './modules/pages/estabelecimento/estabelecimento.module'
      ).then((m) => m.EstabelecimentoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
