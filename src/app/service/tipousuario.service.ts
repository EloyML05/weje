import { Injectable } from '@angular/core';
import { ITipousuario } from '../model/tipousuario.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TipousuarioService {
  serverURL: string = serverURL + '/Tipousuario';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<ITipousuario>> {
    let URL: string = '';
    URL += this.serverURL;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    if (field) {
      URL += '&sort=' + field;
      if (dir === 'asc') {
        URL += ',asc';
      } else {
        URL += ',desc';
      }
    }
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<ITipousuario>>(URL, httpOptions);
  }

  get(id: number): Observable<ITipousuario> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITipousuario>(URL);
  }

  create(oTipousuario: ITipousuario): Observable<ITipousuario> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITipousuario>(URL, oTipousuario);
  }

  update(oTipousuario: ITipousuario): Observable<ITipousuario> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITipousuario>(URL, oTipousuario);
  }

  getOne(id: number): Observable<ITipousuario> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITipousuario>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

  getAll(): Observable<ITipousuario[]> {
    let URL = '';
    URL += this.serverURL;
    URL += '/getAllList';
    return this.oHttp.get<ITipousuario[]>(URL);
  }


}
