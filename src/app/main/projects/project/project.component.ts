import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ProjectService } from '../project.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
import { Client } from 'app/main/clients/client.model';
import { Feature } from 'app/main/features/feature.model';
import { Resource } from 'app/main/resources/resource.model';
import { Milestone } from 'app/main/milestones/milestone.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: fuseAnimations
})
export class ProjectComponent implements OnInit {
  clients :Client[];
  projectFeatures:Feature[];
  projectResources: Resource[];
  projectMilestones: Milestone[];
  project: Project;
  pageType: string;
  projectForm: FormGroup;
  resourceToppings = new FormControl();
  featureToppings = new FormControl();
  milestoneToppings = new FormControl();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  
  // myControl = new FormControl();
  package_id: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  
  /**
   * Constructor
   *
   * @param {ProjectService} _projectService
   * @param {FormBuilder} _formBuilder
   * @param {MatSnackBar} _matSnackBar,
   *
   */
  constructor(
    private _projectService: ProjectService,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {
    // Set the default
    this.project = new Project();
    // Set the private defaults
    this._unsubscribeAll = new Subject();


  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {

    // Subscribe to update product on changes
    this._projectService.onItemChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(project => {

        if (project) {
          this.project = new Project(project);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.project = new Project();
        }
        this.projectForm = this.createProjectForm();


      });


      this._projectService.getAllClients().subscribe(projectClient => {
        this.clients =  projectClient.map((client) => new Client(client));
    // console.log(this.resourceDepartments);

    });


    this._projectService.getAllFeatures().subscribe(projectFeature => {
      this.projectFeatures =  projectFeature.map((feature) => new Feature(feature));
  // console.log(this.resourceDepartments);

  });

  this._projectService.getAllResources().subscribe(projectResource => {
    this.projectResources =  projectResource.map((resource) => new Resource(resource));
// console.log(this.resourceDepartments);

});

this._projectService.getAllMilestones().subscribe(projectMilestone => {
  this.projectMilestones =  projectMilestone.map((milestone) => new Milestone(milestone));
// console.log(this.resourceDepartments);

});
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }



  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Create project form
   *
   * @returns {FormGroup}
   */
  createProjectForm(): FormGroup {
    
      return this._formBuilder.group({
        id: [this.project.id],
        name: [this.project.name],
        handle: [this.project.handle],
        projectClient:[this.project.projectClient],
        projectFeatures:[this.project.projectFeatures], 
        projectResources:[this.project.projectResources], 
        projectMilestones:[this.project.projectMilestones], 
        projectStartDate:[this.project.projectStartDate], 
        projectDevelopmentDate: [this.project.projectDevelopmentDate], 
        projectCost:[this.project.projectCost], 
        projectTimeline:[this.project.projectTimeline], 
        projectPaymentMethod:[this.project.projectPaymentMethod]
      });
   
  }

  /**
   * Save project
   */
  saveProject(): void {
    const data = this.projectForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);

    this._projectService.saveItem(data)
      .then(() => {

        // Trigger the subscription with new data
        this._projectService.onItemChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Record saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        this._router.navigate(['/projects']);
      });
  }

  /**
   * Add project
   */
  addProject(): void {
    const data = this.projectForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);
    data.projectFeatures=this.featureToppings.value;
    data.projectResources=this.resourceToppings.value;
    data.projectMilestones = this.milestoneToppings.value;

    this._projectService.addItem(data)
      .then(() => {

        // Trigger the subscription with new data
        this._projectService.onItemChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Record added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this._router.navigate(['/projects']);
      });
  }

  compareFn(c1: Project, c2: Project): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
   }


}