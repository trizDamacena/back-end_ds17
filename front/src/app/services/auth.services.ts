import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environment/environments.prod';

type TokenPair = { access: string; refresh?: string }; //definindo que vai ter o token normal e de refresh

const storage = { //função para pegar, setar ou deletar coisas do localStorage
  get: (k: string) => (typeof localStorage !== 'undefined' ? localStorage.getItem(k) : null),
  set: (k: string, v: string) => { if (typeof localStorage !== 'undefined') localStorage.setItem(k, v); },
  del: (k: string) => { if (typeof localStorage !== 'undefined') localStorage.removeItem(k); },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _access = signal<string | null>(storage.get('access'));  //colocando coisas no localStorage, no caso o acess e refresh
  private _refresh = signal<string | null>(storage.get('refresh'));
  private base = environment.apiBase;

  constructor(private http: HttpClient) {}

  isAuthenticated = () => !!this._access(); //!! significa que irá retorna true ou false, no caso, se existe o token ou não

  token = () => this._access(); //pega o valor do token de acesso

  login(username: string, password: string): Observable<TokenPair> {
    //pipe e tap é a manipulação dos dados para serem adicionados no localStorage
    const AUTH_URL = `${this.base}api/token/`;return this.http.post<TokenPair>(AUTH_URL, { username, password }).pipe(
      tap(tokens => {
        if (tokens.access) { this._access.set(tokens.access); storage.set('access', tokens.access); }
        if (tokens.refresh) { this._refresh.set(tokens.refresh); storage.set('refresh', tokens.refresh); }
      })
      
    );
  }
  
  refresh(): Observable<{ access: string }> {
    const REFRESH_URL = `${this.base}api/refresh/`;
    const refresh = this._refresh();
    return this.http.post<{ access: string }>(REFRESH_URL, { refresh }).pipe(
      //a refresh gera um novo acess e a linha de baixo adiciona o novo valor no acces no localstorage 
      tap(t => { this._access.set(t.access); storage.set('access', t.access); })
    );
  }

  logout() {
    this._access.set(null); this._refresh.set(null);
    storage.del('access'); storage.del('refresh');
  }
}
