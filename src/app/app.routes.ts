import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        pathMatch: 'full',
        loadComponent: () => import('./components/character-list/character-list.component').then(m => m.CharacterListComponent)
    }
];
