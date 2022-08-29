import { ICategoria } from 'src/app/modules/shared/entities/categoria.interface';
import { DataMode } from 'src/app/modules/shared/helpers/datamode.helper';
import { FormIsSubmiting } from 'src/app/modules/shared/helpers/form.helper';

interface CategoriaForm extends FormIsSubmiting {
  categoryName?: string;
  categoryDescription?: string;
}

interface CategoriaFormInput {
  mode: DataMode;
  categoriaId?: string;
}

interface CategoriaFormOutput {
  mode: DataMode;
  categoria?: ICategoria;
}


export { CategoriaFormInput, CategoriaFormOutput, CategoriaForm };
