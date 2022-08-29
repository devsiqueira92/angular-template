/* eslint-disable max-lines-per-function */
import { Inject, Injectable } from '@angular/core';

import { of } from 'rxjs';
import { filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { DataMode } from 'src/app/modules/shared/helpers/datamode.helper';
import { CategoriaService } from 'src/app/modules/shared/services/categoria.service';
import {
  CategoriaFormInput,
  CategoriaFormOutput,
} from '../entities/categoria-form.interface';

@Injectable()
export class CategoriaFormService {
  constructor(private categoriaService: CategoriaService) {}

  buildForm(params: CategoriaFormInput): Observable<CategoriaFormOutput> {
    const { mode, categoriaId } = params;

    let result: Observable<CategoriaFormOutput>;

    switch (mode) {
      case DataMode.create:
        result = of({ mode });
        break;
      case DataMode.edit:
      case DataMode.view:
        result = this.buildEditForm(mode, categoriaId as string);
        break;

      default:
        throw new Error(`Data mode is not recognized: ${mode}`);
    }

    return result;
  }

  buildEditForm(
    mode: DataMode,
    categoriaId: string
  ): Observable<CategoriaFormOutput> {
    return this.categoriaService.getById(categoriaId).pipe(
      take(1),
      map((categoria) => ({ categoria, mode }))
    );
  }
}
