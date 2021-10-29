import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        // loadChildren: './pages/examples/dashboard/dashboard.module#DashboardModule'
        loadChildren: () => import('./pages/examples/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'components',
        loadChildren: () => import('./pages/examples/components/components.module').then((m) => m.ComponentsPageModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./pages/examples/forms/forms.module').then((m) => m.Forms)
      },
      {
        path: 'tables',
        loadChildren: () => import('./pages/examples/tables/tables.module').then((m) => m.TablesModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./pages/examples/maps/maps.module').then((m) => m.MapsModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./pages/examples/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./pages/examples/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./pages/examples/calendar/calendar.module').then((m) => m.CalendarModulee)
      },
      {
        path: '',
        loadChildren: () => import('./pages/examples/pages/user/user-profile.module').then((m) => m.UserModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/examples/pages/timeline/timeline.module').then((m) => m.TimelineModule)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'pages',
        loadChildren: () => import('./pages/examples/pages/pages.module').then((m) => m.PagesModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
