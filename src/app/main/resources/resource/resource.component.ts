import { Component, OnInit } from '@angular/core';
import { Resource } from '../resource.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ResourceService } from '../resource.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  animations: fuseAnimations
})
export class ResourceComponent implements OnInit {
  resource: Resource;
  pageType: string;
  resourceForm: FormGroup;
  
  // myControl = new FormControl();
  package_id: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  
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
        title: [this.resource.title],
        handle: [this.resource.handle]
      });
   
  }

  /**
   * Save resource
   */
  saveResource(): void {
    const data = this.resourceForm.getRawValue();
    data.handle = FuseUtils.handleize(data.title);

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
    data.handle = FuseUtils.handleize(data.title);

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
        this._router.navigate(['/resources']);
      });
  }

}