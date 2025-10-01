import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LivrosServices } from '../../services/livro.services';
import { Livro } from '../../models/livro';
import { AuthService } from '../../services/auth.services';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section style="max-width:900px;margin:2rem auto;padding:0 1rem">
      <h1>Livros</h1>

      @if (carregando()) {
        <p>Carregando…</p>
      } @else if (erro()) {
        <p style="color:#c62828">{{ erro() }}</p>
      } @else {
        <ul style="padding-left:1.25rem">
          @for (a of livros(); track a.id) {
            <li style="margin:.25rem 0">
              <strong>{{ a.titulo }} {{ a.subtitulo }}</strong>
              <em> - {{a.autor}}</em>
              <em> - {{a.isbn}}</em>
              <em> - {{a.descricao}}</em>
              <em> - {{a.idioma}}</em>
              <em> - {{a.ano_publicacao}}</em>
              <em> - {{a.paginas}}</em>
              <em> - {{a.preco}}</em>
              <em> - {{a.estoque}}</em>
              <em> - {{a.desconto}}</em>
              <em> - {{a.disponivel}}</em>
              <em> - {{a.dimensoes}}</em>
              <em> - {{a.peso}}</em>
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

export class LivrosComponent {
  private svc = inject(LivrosServices)
  private auth = inject(AuthService)
  livros = signal<Livro[]>([])
  carregando = signal(true)
  erro = signal<string | null>(null)

  constructor() {
    console.log("Token de acesso: ", this.auth.token());
    
    this.svc.listar().subscribe({
      next: (data) => { this.livros.set(data); this.carregando.set(false); },
      error: () => { this.erro.set('Falha ao carregar autores'); this.carregando.set(false); }
    });
  }
}