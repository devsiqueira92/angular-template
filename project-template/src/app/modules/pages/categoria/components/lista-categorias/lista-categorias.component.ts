import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaCategoriasComponent implements OnInit {
  constructor() {}
  element: any = [
    {
      id: 1,
      name: 'Supermercado',
      description: 'Supermercados, lojas de convêniencia, etc',
    },
    {
      id: 2,
      name: 'Postos de combustiveis',
      description: 'Descrição qualquer, etc',
    },
    { id: 3, name: 'Veterinario', description: 'Gastos com o Marley' },
  ];

  ngOnInit(): void {}
}
