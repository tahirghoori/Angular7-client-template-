import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ProjectService } from './project.service';
import { MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTabsModule, MatTableModule, MatAutocompleteModule, MatMenuModule, MatDialogModule, MatDatepickerModule } from '@angular/material';
import { FuseConfirmDialogModule, FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';


const routes: Routes = [
  {
      path     : 'projects',
      component: ProjectListComponent,
      resolve  : {
          data: ProjectService
      }
  },
  {
      path     : 'projects/:id',
      component: ProjectComponent,
      resolve  : {
          data: ProjectService
      }
      
  },
  {
      path     : 'projects/:id/:handle',
      component: ProjectComponent,
      resolve  : {
          data: ProjectService
      }
     
  }
];


@NgModule({
  declarations: [ProjectComponent, ProjectListComponent],
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
    MatDatepickerModule,


    FuseConfirmDialogModule,
    FuseSharedModule,
    FuseWidgetModule
  ]
})
export class ProjectsModule { }
