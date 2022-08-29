import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first } from 'rxjs/operators';
import { DataMode } from 'src/app/modules/shared/helpers/datamode.helper';
import { CategoriaFormOutput } from '../entities/categoria-form.interface';
import { CategoriaFormService } from '../services/categoria-form.service';

@Injectable()
export class CategoriaFormResolver implements Resolve<CategoriaFormOutput> {
  constructor(private instrumentsFormService: CategoriaFormService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const mode = route.data.mode as DataMode;
    if (mode === DataMode.edit || mode === DataMode.view) {
      return this.instrumentsFormService
        .buildForm({
          categoriaId: route.paramMap.get('id') as string,
          mode,
        })
        .pipe(first());
    }

    return this.instrumentsFormService.buildForm({ mode }).pipe(first());
  }
}
