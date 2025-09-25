import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.components';
import { AutoresComponent } from './pages/authors.components/authors.components';

export const routes: Routes = [
    {path: ``, component: HomeComponent},
    {path: `home`, component: HomeComponent},
    {path: `autores`, component: AutoresComponent}
];
