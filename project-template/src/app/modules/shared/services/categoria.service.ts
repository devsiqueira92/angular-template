import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { of } from 'rxjs';
import { ICategoria } from '../entities/categoria.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  protected basePath = 'http://localhost';
  public defaultHeaders = new HttpHeaders();

  constructor(protected httpClient: HttpClient) {}

  create(body: ICategoria) {
    return this.httpClient.post<ICategoria>(
      `${this.basePath}/api/rest/v1/changes`,
      body,
      { observe: 'response' }
    );
  }

  getById(id: string): Observable<ICategoria> {
    const categorias: ICategoria[] = [
      {
        id: '1',
        categoryName: 'Supermercado',
        categoryDescription: 'Compras gerais',
      },
      {
        id: '2',
        categoryName: 'Lazer',
        categoryDescription: 'Passeios em geral',
      },
    ];

    const category = categorias.find((object) => object.id === id);
    console.log(category);
    return of(category);
    // return this.httpClient.get<ICategoria>(
    //   `localhost:4000/api/categoria/${encodeURIComponent(String(id))}`,
    //   { observe: 'response' }
    // );
  }
}
