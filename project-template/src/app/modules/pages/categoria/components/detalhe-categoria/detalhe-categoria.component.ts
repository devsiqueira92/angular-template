import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategoria } from 'src/app/modules/shared/entities/categoria.interface';
import { executeAndCatch } from 'src/app/modules/shared/helpers/angular.helper';
import { DataMode } from 'src/app/modules/shared/helpers/datamode.helper';
import { FormIsSubmiting } from 'src/app/modules/shared/helpers/form.helper';
import { CategoriaService } from 'src/app/modules/shared/services/categoria.service';
import {
  CategoriaForm,
  CategoriaFormOutput,
} from '../../entities/categoria-form.interface';

@Component({
  templateUrl: './detalhe-categoria.component.html',
  styleUrls: ['./detalhe-categoria.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalheCategoriaComponent implements OnInit {
  DataMode = DataMode;
  routerData$ = this.route.data;
  formGroup: FormGroupTyped<CategoriaForm>;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    const mode = this.route.snapshot.data.mode;
    debugger;
    this.initForm();
    console.log(this.route);
  }

  private static buildFormGroup(disabled: boolean): {
    [K in keyof Partial<ICategoria & FormIsSubmiting>]: any;
  } {
    return {
      isSubmitting: new FormControl(false),
      categoryName: new FormControl({ disabled, value: null }, [
        Validators.required,
        Validators.minLength(5),
      ]),
      categoryDescription: new FormControl({ disabled, value: null }),
      id: new FormControl({ disabled: true, value: null }),
    };
  }

  private initForm() {
    const formData = this.route.snapshot.data.formData as CategoriaFormOutput;

    this.formGroup = this.fb.group(
      DetalheCategoriaComponent.buildFormGroup(formData.mode === DataMode.view)
    ) as FormGroupTyped<CategoriaForm & FormIsSubmiting>;

    if (formData.mode === DataMode.view || formData.mode === DataMode.edit) {
      const categoria = {
        ...formData.categoria,
      };

      this.formGroup.patchValue({
        ...categoria,
      } as ICategoria);
    }
  }

  submit() {
    debugger;
    this.formGroup.patchValue({ isSubmitting: true });
    const categoria = this.formGroup.getRawValue();

    executeAndCatch(this.categoriaService.create(categoria as ICategoria), () =>
      this.formGroup.patchValue({ isSubmitting: false })
    );
  }
}
