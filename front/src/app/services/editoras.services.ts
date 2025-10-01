import { inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editora } from '../models/editora';
import { environment } from '../../environment/environments';

@Injectable({providedIn: 'root'})
export class EditorasServices  {
  private http = inject(HttpClient)
  private base = environment.apiBase

  listar(): Observable<Editora[]>{
    const url = `${this.base}api/Editoras`
    return this.http.get<Editora[]>(url)
  }
}