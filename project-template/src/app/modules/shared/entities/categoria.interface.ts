import { BaseEntity } from './base-entity.interface';

interface ICategoria extends BaseEntity {
  categoryName?: string;
  categoryDescription?: string;
}

export { ICategoria };
