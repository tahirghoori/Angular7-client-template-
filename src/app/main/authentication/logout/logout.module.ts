import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


const routes = [
  {
      path     : 'logout',
      component: LogoutComponent
  }
];



@NgModule({
  declarations: [LogoutComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class LogoutModule { }
