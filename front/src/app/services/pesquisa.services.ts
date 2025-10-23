import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class PesquisaServices {
  private http = inject(HttpClient)
  private base = environment.apiBase + 'api/Livros'

  buscarLivro(termo: string): Observable<any[]>{
    const params = new HttpParams().set('titulo', termo)
    return this.http.get<any[]>(this.base, {params});
  }
}
