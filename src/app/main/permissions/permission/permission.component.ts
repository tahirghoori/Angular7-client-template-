import { Component, OnInit } from '@angular/core';
import { Permission } from '../permission.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { PermissionService } from '../permission.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
  animations: fuseAnimations
})
export class PermissionComponent implements OnInit {
  permission: Permission;
  pageType: string;
  permissionForm: FormGroup;
  // myControl = new FormControl();
  package_id: string;
  // Private
  private _unsubscribeAll: Subject<any>;
  toppings = new FormControl();
  /**
   * Constructor
   *
   * @param {PermissionService} _permissionService
   * @param {FormBuilder} _formBuilder
   * @param {MatSnackBar} _matSnackBar,
   *
   */
  constructor(private _permissionService: PermissionService, private _formBuilder: FormBuilder, private _matSnackBar: MatSnackBar, private _router: Router) {
    // Set the default
    this.permission = new Permission();
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
    this._permissionService.onItemChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(permission => {
        if (permission) {
          this.permission = new Permission(permission);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.permission = new Permission();
        }
        this.permissionForm = this.createPermissionForm();
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
   * Create permission form
   *
   * @returns {FormGroup}
   */
  createPermissionForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.permission.id],
      name: [this.permission.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [this.permission.description],
      tags            : [this.permission.tags],
      handle: [this.permission.handle]
    });
  }
  /**
   * Save permission
   */
  addPermission(): void {
    const data = this.permissionForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);

    let itemList: Permission[] = [];
    let splitted = data.tags;
    console.log(splitted);
    for (let key in splitted) {
      let value = splitted[key];
      // Use `key` and `value`
      if (value != '') {
        itemList.push(new Permission({
          id: '',
          name: data.handle+'-'+value,
          handle: '',
          parent: {},
          description: value,
          children: [],
          tags: [],
          isSelected: false,
          updatedAt: '',
          createdAt: ''
        }));
      }
    }
    data.children = itemList;


    this._permissionService.addItem(data)
      .then(() => {
        // Trigger the subscription with new data
        this._permissionService.onItemChanged.next(data);
        // Show the success message
        this._matSnackBar.open('Record saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        this._router.navigate(['/permissions']);
      });
  }
  /**
   * Add permission
   */
  // addPermission(): void {
  //   const data = this.permissionForm.getRawValue();
  //   data.handle = FuseUtils.handleize(data.name);
  //   let itemList: Permission[] = [];
  //   let splitted = data.name.split(",");
  //   console.log(splitted);
  //   for (let key in splitted) {
  //     let value = splitted[key];
  //     // Use `key` and `value`
  //     if (value != '') {
  //       itemList.push(new Permission({
  //         id: '',
  //         name: value,
  //         handle: '',
  //         permissionResources: [],
  //         updatedAt: '',
  //         createdAt: ''
  //       }));
  //     }
  //   }
  //   this._permissionService.saveItem(itemList)
  //     .then(() => {
  //       // Trigger the subscription with new data
  //       this._permissionService.onItemChanged.next(data);
  //       // Show the success message
  //       this._matSnackBar.open('Record added', 'OK', {
  //         verticalPosition: 'top',
  //         duration: 2000
  //       });
  //       // Change the location with new one
  //       this._router.navigate(['/permissions']);
  //     });
  // }
}