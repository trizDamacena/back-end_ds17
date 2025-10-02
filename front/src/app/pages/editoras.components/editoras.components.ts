import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EditorasServices } from '../../services/editoras.services';
import { Editora } from '../../models/editora';
import { AuthService } from '../../services/auth.services';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './editoras.components.html',
  styleUrls: ['./editoras.components.css']
  
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
