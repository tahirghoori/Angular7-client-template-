import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialogRef, MatPaginator, MatSort, MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Subject, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { SkillService } from '../skill.service';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Skill } from '../skill.model';

export interface skillsSort {
   name: string;
}


@Component({
  selector: 'skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class SkillListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'active'];
    dataSource: MatTableDataSource<Skill>;

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
   * @param {SkillService} _skillService
   * @param {MatDialog} _matDialog
   * @param {MatSnackBar} _matSnackBar
   */
  constructor(
      private _skillService: SkillService,
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
    this._skillService.onPageItemChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(skillPage => {

         // Assign the data to the data source for the table to render
         this.dataSource = new MatTableDataSource(this._skillService.pageItem.content);
         this.totalLength =  this._skillService.pageItem.totalElements;
         this.limit = this._skillService.pageItem.size;
         this.pageIndex = this._skillService.pageItem.number;
         this.dataSource.sort = this.sort;

    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changePage(event){
    console.log('event',event)
          this._skillService.getPageItem(event.pageIndex,event.pageSize);

  }

  /**
 * Delete Contact
 */
  deleteSkill(skill): void {
      console.log(skill);
      this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
          if (result) {

              this._skillService.deleteItemById(skill.id).subscribe((response: any)  => {
                  // Show the success message
                  this._matSnackBar.open('Record Deleted', 'OK', {
                      verticalPosition: 'top',
                      duration: 3000
                  });
                  this._skillService.getItems();
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