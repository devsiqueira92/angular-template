import { BaseEntity } from 'src/app/modules/shared/entities/base-entity.interface';

interface Categoria extends BaseEntity {
  nome?: string;
  descricao?: string;
}

export { Categoria };
