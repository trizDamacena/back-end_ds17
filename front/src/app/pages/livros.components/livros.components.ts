import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LivrosServices } from '../../services/livro.services';
import { Livro } from '../../models/livro';
import { AuthService } from '../../services/auth.services';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './livros.components.html',
  styleUrls: ['./livros.components.css']
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