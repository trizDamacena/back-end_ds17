import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.components';
import { AutoresComponent } from './pages/authors.components/authors.components';
import { EditorasComponents } from './pages/editoras.components/editoras.components';
import { LivrosComponent } from './pages/livros.components/livros.components';

export const routes: Routes = [
    {path: ``, component: HomeComponent},
    {path: `home`, component: HomeComponent},
    {path: `autores`, component: AutoresComponent},
    {path: `editoras`, component: EditorasComponents},
    {path: `livros`, component: LivrosComponent}
];
