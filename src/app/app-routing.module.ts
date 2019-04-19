import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { AppAuthGuard } from './app.authguard';
import { Role } from './main/roles/role.enum';

const appRoutes: Routes = [
    
  {
      path        : '',
      loadChildren: './main/skills/skills.module#SkillsModule',
      canActivate: [AppAuthGuard],
      data: { roles: [Role.Admin] } 

  },
  {
    path        : '',
    loadChildren: './main/roles/roles.module#RolesModule',
    canActivate: [AppAuthGuard],
    data: { roles: [Role.Admin] } 

},
      // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule {}
