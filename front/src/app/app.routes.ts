import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.components';
import { AutoresComponent } from './pages/authors.components/authors.components';
import { EditorasComponents } from './pages/editoras.components/editoras.components';
import { LivrosComponent } from './pages/livros.components/livros.components';
import { LoginComponents } from './pages/login.components/login.components';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponents},
    {path: 'home', component: HomeComponent},
    {path: 'autores', component: AutoresComponent, canActivate: [authGuard]},
    {path: 'editoras', component: EditorasComponents, canActivate: [authGuard]},
    {path: 'livros', component: LivrosComponent, canActivate: [authGuard]},
    {path: 'pesquisas', component: LivrosComponent, canActivate: [authGuard]}
];
