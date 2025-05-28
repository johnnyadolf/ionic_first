import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.page').then((m) => m.ContactPage),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'tasks-page',
    loadComponent: () =>
      import('./pages/tasks-page/tasks-page.page').then((m) => m.TasksPagePage),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
