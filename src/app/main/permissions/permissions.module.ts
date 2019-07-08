import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatAutocompleteModule, MatMenuModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
import { FuseConfirmDialogModule, FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { PermissionService } from './permission.service';
import { PermissionComponent } from './permission/permission.component';
import { PermissionViewDailogComponent } from './permission-view-dailog/permission-view-dailog.component';

const routes: Routes = [
  {
      path     : 'permissions',
      component: PermissionListComponent,
      resolve  : {
          data: PermissionService
      }
  },
  {
      path     : 'permissions/:id',
      component: PermissionComponent,
      resolve  : {
          data: PermissionService
      }
      
  },
  {
      path     : 'permissions/:id/:handle',
      component: PermissionComponent,
      resolve  : {
          data: PermissionService
      }
     
  }
];


@NgModule({
  declarations: [PermissionListComponent, PermissionComponent, PermissionViewDailogComponent],
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
  ],
  entryComponents: [
    PermissionViewDailogComponent
]
})export class PermissionsModule { }