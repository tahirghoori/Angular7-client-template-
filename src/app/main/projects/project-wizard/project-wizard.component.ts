import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../project.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProjectService } from '../project.service';
import { fuseAnimations } from '@fuse/animations';
import { Client } from 'app/main/clients/client.model';
import { MilestoneFormComponent } from 'app/main/milestones/milestone-form/milestone-form.component';
import { Milestone } from 'app/main/milestones/milestone.model';
import { MilestoneService } from 'app/main/milestones/milestone.service';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ProjectWizardComponent implements OnInit {

  clients: Client[];
  projectMilestonesList: Milestone[];

  dialogRef: any;
  project: Project;
    pageType: string;
    projectForm: FormGroup;
// Private
private _unsubscribeAll: Subject<any>;
    // // Private
    // private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProjectService} _projectService
     * @param {FormBuilder} _formBuilder
     * @param {MatDialog} _matDialog
     * @param {MilestoneService} _milestoneService
     */
    constructor(
        private _projectService: ProjectService,
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private _milestoneService: MilestoneService,
    )
    {
        // Set the default
        this.project = new Project();

        // Set the private defaults
        // this._unsubscribeAll = new Subject();
            // Set the private defaults
    // this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update project on changes
        // this._projectService.onProjectChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(project => {

                // if ( project )
                // {
                //     this.project = new Project(project);
                //     this.pageType = 'edit';
                // }
                // else
                // {
                    this.pageType = 'new';
                    this.project = new Project();
                // }

                this.projectForm = this.createProjectForm();
            // });


            this._projectService.getAllClients().subscribe(projectClient => {
              this.clients = projectClient.map((client) => new Client(client));
              // console.log(this.resourceDepartments);
        
            });
         
            this._milestoneService.milestones = this.project.projectMilestones;
        
      // this._milestoneService.onMilestonesChanged.next(this._milestoneService.milestones);

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next();
        // this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create project form
     *
     * @returns {FormGroup}
     */
    createProjectForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.project.id],
            name            : [this.project.name],
            handle          : [this.project.handle],
            description     : [''],
            categories      : [''],
            projectClient:[this.project.projectClient],
            projectDevelopmentDate : [''],
            projectStartDate : [''],
            tags            : [''],
            projectCost:[this.project.projectCost ,[Validators.required, Validators.minLength(2), Validators.maxLength(50)]], 
            projectTimeline:[this.project.projectTimeline,[Validators.required, Validators.minLength(3), Validators.maxLength(100)]], 
            projectPaymentMethod:[this.project.projectPaymentMethod,[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
             images          : [''],
            priceTaxExcl    : [''],
            priceTaxIncl    : [''],
            taxRate         : [''],
            comparedPrice   : [''],
            quantity        : [''],
            sku             : [''],
            width           : [''],
            height          : [''],
            depth           : [''],
            weight          : [''],
            extraShippingFee: [''],
            active          : ['']
        });
    }

    compareFn(c1: Client, c2: Client): boolean {
      return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    /**
     * Save project
     */
    saveProject(): void
    {
        const data = this.projectForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        // this._projectService.saveProject(data)
        //     .then(() => {

        //         // Trigger the subscription with new data
        //         this._projectService.onProjectChanged.next(data);

        //         // Show the success message
        //         this._matSnackBar.open('Project saved', 'OK', {
        //             verticalPosition: 'top',
        //             duration        : 2000
        //         });
        //     });
    }

    /**
     * Add project
     */
    addProject(): void
    {
        const data = this.projectForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        // this._projectService.addProject(data)
        //     .then(() => {

        //         // Trigger the subscription with new data
        //         this._projectService.onProjectChanged.next(data);

        //         // Show the success message
        //         this._matSnackBar.open('Project added', 'OK', {
        //             verticalPosition: 'top',
        //             duration        : 2000
        //         });

        //         // Change the location with new one
        //         this._location.go('apps/e-commerce/projects/' + this.project.id + '/' + this.project.handle);
        //     });
    }
    /**
     * New contact
     */
    newContact(): void
    {
        this.dialogRef = this._matDialog.open(MilestoneFormComponent, {
            panelClass: 'milestone-form-dialog',
            data      : {
                action: 'new',
               
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                this.projectMilestonesList= response.getRawValue();
      console.log(this.projectMilestonesList);


//       if(this.createProjectForm){
//         this._milestoneService.addItem(data)
//      .then(() => {

//   // Trigger the subscription with new data
//   this._milestoneService.onItemChanged.next(data);

//   // Show the success message
//   this._matSnackBar.open('Record added', 'OK', {
//     verticalPosition: 'top',
//     duration: 2000
//   });

//   // Change the location with new one

// });

//       }
   


                this._milestoneService.updateMilestone(response.getRawValue());
            });
    }
}
