import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Livro } from "../models/livro";
import { environment } from "../../environment/environments";

@Injectable({providedIn: 'root'})
export class LivrosServices {
  private http = inject(HttpClient)
  private base = environment.apiBase

  listar(): Observable<Livro[]>{
    const url = `${this.base}api/Livros`
    return this.http.get<Livro[]>(url)
  }
}