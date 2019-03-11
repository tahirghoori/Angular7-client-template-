import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../project.model';
import { Client } from 'app/main/clients/client.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-create-dailog',
  templateUrl: './project-create-dailog.component.html',
  styleUrls: ['./project-create-dailog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ProjectCreateDailogComponent  {


  action: string;
  project: Project;
  projectForm: FormGroup;
  dialogTitle: string;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  clients: Client[];
  

  /**
   * Constructor
   *
   * @param {MatDialogRef<ProjectDailogFormComponent>} matDialogRef
   * @param {ProjectService} _projectService
   * @param _data 
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      public matDialogRef: MatDialogRef<ProjectCreateDailogComponent>,
      @Inject(MAT_DIALOG_DATA) 
      private _data: any,
    private _projectService: ProjectService,
      private _formBuilder: FormBuilder
  )
  {
      // Set the defaults
      this.action = _data.action;

      // console.log(this.action);
      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Edit Project';
          this.project = _data.project;
      }
      else
      {
          this.dialogTitle = 'New Project';
          this.project = new Project({});
      }
      this._projectService.getAllClients().subscribe(projectClient => {
        this.clients = projectClient.map((client) => new Client(client));
        // console.log(this.resourceDepartments);
  
      });

      this.projectForm = this.createContactForm();
  }


  compareFn(c1: Project, c2: Project): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create project form
   *
   * @returns {FormGroup}
   */
  createContactForm(): FormGroup
  {
      return this._formBuilder.group({
        id: [this.project.id],
        handle: [this.project.handle],
        name: [this.project.name,[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        projectClient:[this.project.projectClient],
        projectStartDate:[this.project.projectStartDate], 
        projectDevelopmentDate: [this.project.projectDevelopmentDate], 
        projectCost:[this.project.projectCost ,[Validators.required, Validators.minLength(2), Validators.maxLength(50)]], 
        projectTimeline:[this.project.projectTimeline,[Validators.required, Validators.minLength(3), Validators.maxLength(100)]], 
        projectPaymentMethod:[this.project.projectPaymentMethod,[Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
   
      });
  }
}
