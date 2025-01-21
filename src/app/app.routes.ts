import { Routes } from '@angular/router';

import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';

import { UsuarioAdminPlistRoutedComponent } from './component/usuario/usuario.admin.plist.routed/usuario.admin.plist.routed.component';
import { UsuarioAdminEditRoutedComponent } from './component/usuario/usuario.admin.edit.routed/usuario.admin.edit.routed.component';
import { UsuarioAdminViewRoutedComponent } from './component/usuario/usuario.admin.view.routed/usuario.admin.view.routed.component';
import { UsuarioAdminCreateRoutedComponent } from './component/usuario/usuario.admin.create.routed/usuario.admin.create.routed.component';
import { UsuarioAdminDeleteRoutedComponent } from './component/usuario/usuario.admin.delete.routed/usuario.admin.delete.component';
import { TipousuarioAdminCreateRoutedComponent } from './component/tipousuario/tipousuario.admin.create.routed/tipousuario.admin.create.routed.component';
import { TipousuarioAdminDeleteRoutedComponent } from './component/tipousuario/tipousuario.admin.delete.routed/tipousuario.admin.delete.component';
import { TipousuarioAdminEditRoutedComponent } from './component/tipousuario/tipousuario.admin.edit.routed/tipousuario.admin.edit.routed.component';
import { TipousuarioAdminPlistRoutedComponent } from './component/tipousuario/tipousuario.admin.plist.routed/tipousuario.admin.plist.routed.component';
import { TipousuarioAdminViewRoutedComponent } from './component/tipousuario/tipousuario.admin.view.routed/tipousuario.admin.view.routed.component';
import { LoginComponent } from './component/login/login.component';


export const routes: Routes = [
  { path: '', component: SharedHomeRoutedComponent },
  { path: 'home', component: SharedHomeRoutedComponent },

  { path: 'admin/usuario/plist', component: UsuarioAdminPlistRoutedComponent },
  {
    path: 'admin/usuario/edit/:id',
    component: UsuarioAdminEditRoutedComponent,
  },
  {
    path: 'admin/usuario/view/:id',
    component: UsuarioAdminViewRoutedComponent,
  },
  {
    path: 'admin/usuario/create',
    component: UsuarioAdminCreateRoutedComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin/usuario/delete/:id',
    component: UsuarioAdminDeleteRoutedComponent,
  },

  {
    path: 'admin/tipousuario/edit/:id',
    component: TipousuarioAdminEditRoutedComponent,
  },
  {
    path: 'admin/tipousuario/view/:id',
    component: TipousuarioAdminViewRoutedComponent,
  },
  {
    path: 'admin/usuario/create',
    component: UsuarioAdminCreateRoutedComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin/usuario/delete/:id',
    component: UsuarioAdminDeleteRoutedComponent,
  },

  {
    path: 'admin/Tipousuario/create',
    component: TipousuarioAdminCreateRoutedComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin/Tipousuario/delete/:id',
    component: TipousuarioAdminDeleteRoutedComponent,
  },
  {
    path: 'admin/Tipousuario/edit/:id',
    component: TipousuarioAdminEditRoutedComponent,
  },
  {
    path: 'admin/Tipousuario/plist',
    component: TipousuarioAdminPlistRoutedComponent,
  },
  {
    path: 'admin/Tipousuario/view/:id',
    component: TipousuarioAdminViewRoutedComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
