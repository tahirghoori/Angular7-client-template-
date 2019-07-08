import { Component, OnInit } from '@angular/core';
import { Role } from '../role.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar, MatListOption } from '@angular/material';
import { Router } from '@angular/router';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
import { RoleService } from '../roles.service';
import { Permission } from 'app/main/permissions/permission.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  animations: fuseAnimations
})
export class RoleComponent implements OnInit {
  role: Role;
  pageType: string;
  roleForm: FormGroup;
  ReadOnly: string;
  // myControl = new FormControl();
  package_id: string;
  permissions: Permission[];
  
  // Private
  private _unsubscribeAll: Subject<any>;
  toppings = new FormControl();
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  selectedOptions: Permission[] ;


  /**
   * Constructor
   *
   * @param {RoleService} _roleService
   * @param {FormBuilder} _formBuilder
   * @param {MatSnackBar} _matSnackBar,
   *
   */
  constructor(
    private _roleService: RoleService,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {
    // Set the default
    this.role = new Role();
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
    this._roleService.onItemChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(role => {

        if (role) {
          this.role = new Role(role);
          this.pageType = 'edit';
          this.ReadOnly = 'true';
        
         
        
        }
        else {
          this.pageType = 'new';
          this.role = new Role();
          this.ReadOnly = 'false';


        }
        this.roleForm = this.createRoleForm();


      });


     

      this._roleService.getAllPermissions().subscribe(permission => {
        this.permissions = permission.map((permis) => new Permission(permis));
        if(this.pageType=='edit'){

          this.permissions.forEach(objparent => {
            objparent.children.forEach(obj => {
              if (this.role.permission.includes(obj.name)) { 
                // Found world
                obj.isSelected = true;
              }
             })
           })

          
        }
        // console.log(this.permissions);
  
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

  
  selectAllModule(permission) {
    if(permission.isSelected){
      permission.isSelected = false;
    }else{
      permission.isSelected = true;
    }
    for (var i = 0; i < permission.children.length; i++) {
      if(permission.isSelected){
        permission.children[i].isSelected = true;
      }else{
      permission.children[i].isSelected = false;
      }
      
    }
   
  }

  selectSingle(child) {
    console.log('on ng model change', child);
    if(child.isSelected){
      child.isSelected = false;
      
    }else{
      child.isSelected = true;
    }
   
  }
  selectionChange(option: MatListOption) {
    // console.log(option.selected);
    // console.log(option.value);
    // console.log(option.checkboxPosition);

    this.permissions.forEach(objparent => {
      objparent.children.forEach(obj => {
        if (option.value.includes(obj.name)) { 
          // Found world
          if(option.selected){
            obj.isSelected = true;
            console.log(option.selected);
            console.log(option.value);
          }else{
            obj.isSelected = false;
            console.log(option.selected);
            console.log(option.value);

          }
        }
       })
     })
    
    
 }
  

  

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Create role form
   *
   * @returns {FormGroup}
   */
  createRoleForm(): FormGroup {
    
      return this._formBuilder.group({
        id: [this.role.id],
        name: [this.role.name,[
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(45),
          Validators.pattern('[a-zA-Z]+(\s+[a-zA-Z]+)*')
        ]],
        handle: [this.role.handle],
        permission: [this.role.permission],
        
      });
   
  }

  /**
   * Save role
   */
  saveRole(): void {
    const data = this.roleForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);

    

    let appendedPermission:String = '';

    console.log(this.permissions);
    this.permissions.forEach(objparent => {
      objparent.children.forEach(obj => {
        if(obj.isSelected){
          appendedPermission = this.append(appendedPermission,obj.name)
        }
       })
     })
     data.permission = appendedPermission;

    this._roleService.saveItem(data)
      .then(() => {

        // Trigger the subscription with new data
        this._roleService.onItemChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Record saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        this._router.navigate(['/roles']);
      });
  }

  /**
   * Add role
   */
  addRole(): void {
    const data = this.roleForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);
    let appendedPermission:String  = '';
    this.permissions.forEach(obj => {
      obj.children.forEach(obj => {
        if(obj.isSelected){
          appendedPermission = this.append(appendedPermission,obj.name)
        }
       })
     })
     data.permission = appendedPermission;

    this._roleService.addListItem(data)
      .then(() => {

        // Trigger the subscription with new data
        this._roleService.onItemChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Record added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this._router.navigate(['/roles']);
      });
  }

  append(str1, str2): String {

    var res = str2 + ' ' + str1;

    return res;

}

}