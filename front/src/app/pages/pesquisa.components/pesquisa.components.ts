import { inject, Component, OnInit } from '@angular/core';
import { PesquisaServices } from '../../services/pesquisa.services';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-pesquisa.components',
  imports: [],
  templateUrl: './pesquisa.components.html',
  styleUrl: './pesquisa.components.css'
})
export class PesquisaComponents implements OnInit{
  livros: any[] = [];
  termoBusca: string = '';
  pesquisaServices = inject(PesquisaServices)
  private termoBuscaSubject = new Subject<string>();

  ngOnInit(): void {
        this.termoBuscaSubject.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(termo => {
            if (termo.length >= 3 || termo.length === 0) {
                this.buscar(termo);
            }
        });
    }
  
  onDigitado(): void {
        this.termoBuscaSubject.next(this.termoBusca);
    }

  buscar(termo: string): void {
      this.pesquisaServices.buscarLivro(termo).subscribe(data => {
          this.livros = data;
      });
  }

}
