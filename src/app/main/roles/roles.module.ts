
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './role-list/role-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatAutocompleteModule, MatMenuModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
import { FuseConfirmDialogModule, FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { RoleService } from './roles.service';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
      path     : 'roles',
      component: RoleListComponent,
      resolve  : {
          data: RoleService
      }
  },
  {
      path     : 'roles/:id',
      component: RoleComponent,
      resolve  : {
          data: RoleService
      }
      
  },
  {
      path     : 'roles/:id/:handle',
      component: RoleComponent,
      resolve  : {
          data: RoleService
      }
     
  }
];


@NgModule({
  declarations: [RoleListComponent, RoleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatDialogModule,
    FuseConfirmDialogModule,
    FuseSharedModule,
    FuseWidgetModule
  ]
})export class RolesModule { }
