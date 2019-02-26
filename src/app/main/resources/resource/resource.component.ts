import { Component, OnInit } from '@angular/core';
import { Resource } from '../resource.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ResourceService } from '../resource.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
import { Department } from 'app/main/departments/department.model';
import { Skill } from 'app/main/skills/skill.model';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  animations: fuseAnimations
})
export class ResourceComponent implements OnInit {
  resourceDepartments:Department[];
  resourceReporters:Resource[];
  resourceSkills:Skill[];
  resource: Resource;
  pageType: string;
  resourceForm: FormGroup;
  
  // myControl = new FormControl();
  package_id: string;

  // Private
  private _unsubscribeAll: Subject<any>;
  toppings = new FormControl();

  //toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  
  /**
   * Constructor
   *
   * @param {ResourceService} _resourceService
   * @param {FormBuilder} _formBuilder
   * @param {MatSnackBar} _matSnackBar,
   *
   */
  constructor(
    private _resourceService: ResourceService,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {
    // Set the default
    this.resource = new Resource();
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
    this._resourceService.onItemChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(resource => {

        if (resource) {
          this.resource = new Resource(resource);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.resource = new Resource();
        }
        this.resourceForm = this.createResourceForm();


      });

      this._resourceService.getAll().subscribe(resourceDepartment => {
        this.resourceDepartments =  resourceDepartment.map((department) => new Department(department));
    // console.log(this.resourceDepartments);

    });

    this._resourceService.getReportingesource().subscribe(resourceReporter => {
      this.resourceReporters =  resourceReporter.map((resource) => new Resource(resource));
  // console.log(this.resourceReporters);

  });

  this._resourceService.getResourceSkills().subscribe(resourceSkills => {
    this.resourceSkills =  resourceSkills.map((skill) => new Skill(skill));
// console.log(this.resourceSkills);

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
   * Create resource form
   *
   * @returns {FormGroup}
   */
  createResourceForm(): FormGroup {
    
      return this._formBuilder.group({
        id: [this.resource.id],
        handle: [this.resource.handle],
        name : [this.resource.name],
        resourceCNIC : [this.resource.resourceCNIC],
        resourceDOB : [this.resource.resourceDOB],
        resourceEmail : [this.resource.resourceEmail],
        resourceAddress : [this.resource.resourceAddress],
        resourcePhone : [this.resource.resourcePhone],
        resourceReligion :[this.resource.resourceReligion],
        resourceBloodGroup :[this.resource.resourceBloodGroup], 
        resourceNationality :[this.resource.resourceNationality],
        resourceEmergencyContactNo : [this.resource.resourceEmergencyContactNo],
        resourceMaritalStatus : [this.resource.resourceMaritalStatus] ,
        resourceDesignation : [this.resource.resourceDesignation], 
        resourceReportingTo : [ this.resource.resourceReportingTo],
        resourceResume : [this.resource.resourceResume],
        resourceDateOfJoining :[this.resource.resourceDateOfJoining],
        resourceWorkingDays : [this.resource.resourceWorkingDays],
        resourceExperience :  [this.resource.resourceExperience],
        resourceSalaryPerMonth :[this.resource.resourceSalaryPerMonth],
        resourcePerHourRate : [this.resource.resourcePerHourRate],
        resourceShift: [this.resource.resourceShift],
        resourceBenefits : [this.resource.resourceBenefits],
        resourceContractType : [this.resource.resourceContractType],
        resourcePartTime : [ this.resource.resourcePartTime],
        resourceDepartment : [ this.resource.resourceDepartment],
        resourceSkills: [ this.resource.resourceSkills]

      
      });
   
  }

  /**
   * Save resource
   */
  saveResource(): void {
    const data = this.resourceForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);

    this._resourceService.saveItem(data)
      .then(() => {

        // Trigger the subscription with new data
        this._resourceService.onItemChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Record saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        this._router.navigate(['/resources']);
      });
  }

  /**
   * Add resource
   */
  addResource(): void {
    const data = this.resourceForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);
    data.resourceSkills = this.toppings.value;
    if(data.resourceReportingTo == ""){
      data.resourceReportingTo=null;
    }
    console.log(data);

    this._resourceService.addItem(data)
      .then(() => {

        // Trigger the subscription with new data
        this._resourceService.onItemChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Record added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
   //     this._resourceService.getItems();
       // console.log( this._resourceService.getItems())
        this._router.navigate(['/resources']);
      });
  }

  compareFn(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
   }
}