import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EditorasServices } from '../../services/editoras.services';
import { Editora } from '../../models/editora';
import { AuthService } from '../../services/auth.services';

@Component({
  standalone: true,
  imports: [RouterLink],
  template:`
  <section style="max-width:900px;margin:2rem auto;padding:0 1rem">
      <h1>Editora</h1>

      @if (carregando()) {
        <p>Carregando…</p>
      } @else if (erro()) {
        <p style="color:#c62828">{{ erro() }}</p>
      } @else {
        <ul style="padding-left:1.25rem">
          @for (a of editoras(); track a.id) {
            <li style="margin:.25rem 0">
              <strong>{{ a.editora }}</strong>
              <em> - {{a.cnpj}}</em>
              <em> - {{a.endereco}}</em>
              <em> - {{a.telefone}}</em>
              <em> - {{a.email}}</em>
              <em> - {{a.site}}</em>
            </li>
          }
        </ul>
      }

      <nav style="margin-top:1rem">
        <a routerLink="/">Voltar ao início</a>
      </nav>
    </section>
  `
  
})
export class EditorasComponents {
  private svc = inject(EditorasServices)
  private auth = inject(AuthService);   //Ver o token
  editoras = signal<Editora[]>([])
  carregando = signal(true)
  erro = signal<string | null>(null)

  constructor() {
    console.log("Token de acesso: ", this.auth.token());

    this.svc.listar().subscribe({
      next: (data) => {this.editoras.set(data); this.carregando.set(false); },
      error: () => {this.erro.set('Falha ao buscar editoras'); this.carregando.set(false)}
    })
  }
}
