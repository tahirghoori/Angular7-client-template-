import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialogRef, MatPaginator, MatSort, MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { RoleService } from '../roles.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Role } from '../role.model';

export interface rolesSort {
   name: string;
}


@Component({
  selector: 'role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class RoleListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'active'];
    dataSource: MatTableDataSource<Role>;

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  limit:number = 20;
  skip:number = 0;
  totalLength:number = 0;
  pageIndex : number = 0;
  pageLimit:number[] = [5, 10, 25, 100] ; 

  // Private
  private _unsubscribeAll: Subject<any>;
 /**
   * Constructor
   *
   * @param {RoleService} _roleService
   * @param {MatDialog} _matDialog
   * @param {MatSnackBar} _matSnackBar
   */
  constructor(
      private _roleService: RoleService,
      public _matDialog: MatDialog,
      private _matSnackBar: MatSnackBar


  ) {
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

        // Subscribe to update Items on changes
    this._roleService.onPageItemChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(rolePage => {

         // Assign the data to the data source for the table to render
         this.dataSource = new MatTableDataSource(this._roleService.pageItem.content);
         this.totalLength =  this._roleService.pageItem.totalElements;
         this.limit = this._roleService.pageItem.size;
         this.pageIndex = this._roleService.pageItem.number;
         this.dataSource.sort = this.sort;

    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changePage(event){
    console.log('event',event)
          this._roleService.getPageItem(event.pageIndex,event.pageSize);

  }

  /**
 * Delete Contact
 */
  deleteRole(role): void {
      console.log(role);
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if (result) {

              this._roleService.deleteItemById(role.id).subscribe((response: any)  => {
                  // Show the success message
                  this._matSnackBar.open('Record Deleted', 'OK', {
                      verticalPosition: 'top',
                      duration: 3000
                  });
                  this._roleService.getItems();
              });
          }
          this.confirmDialogRef = null;
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

}