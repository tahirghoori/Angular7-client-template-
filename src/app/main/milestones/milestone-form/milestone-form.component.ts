import { Component, OnInit, Inject, Injectable, NgModule, Input } from '@angular/core';
import { Milestone } from '../milestone.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef, MatDialog, MatDialogModule } from '@angular/material';
import { MilestoneService } from '../milestone.service';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-milestone-form',
  templateUrl: './milestone-form.component.html',
  styleUrls: ['./milestone-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MilestoneFormComponent{
  dialogRef: any;
  action: string;
  milestone: Milestone;
  milestoneForm: FormGroup;
  dialogTitle: string;

  /**
   * Constructor
   *
   * @param {MatDialog} _matDialog
   
   * @param {MilestoneService} _milestone_Service
   * @param {FormBuilder} _formBuilder
   * 
   */
  constructor(
    private _matDialog: MatDialog,
    //  public matDialogRef: MatDialogRef<MilestoneFormComponent>,
    //  @Inject(MAT_DIALOG_DATA) private _data: any,
      private _milestone_Service : MilestoneService,
      private _formBuilder: FormBuilder,
      private _router: Router
      
  )
  {
      // Set the defaults
    //   this.action = _data.action;

    //   if ( this.action === 'edit' )
    //   {
    //       this.dialogTitle = 'Edit Milestone';
    //       this.milestone = _data.milestone;
    //   }
    //   else
    //   {
    //       this.dialogTitle = 'New Milestone';
    //       this.milestone = new Milestone({});
    //   }

      this.milestoneForm = this.createMilestoneForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
  createMilestoneForm(): FormGroup
  {
      return this._formBuilder.group({
        // id: [this.milestone.id],
        // name: [this.milestone.name],
        // handle: [this.milestone.handle],
        // milestoneStartDate: [this.milestone.milestoneStartDate],
        // milestoneDelieveryDate: [this.milestone.milestoneDelieveryDate],
        // milestoneDevelopmentDate: [this.milestone.milestoneDevelopmentDate],
        // milestoneExpectedPayment: [this.milestone.milestoneExpectedPayment],
        // milestonePaymentAmount: [this.milestone.milestonePaymentAmount],
        // milestoneCost: [this.milestone.milestoneCost],
        // milestonePaymentMethod: [this.milestone.milestonePaymentMethod],
        // project: [this.milestone.project]
      });
  }

      /**
     * New contact
     */
    // newMilestone(): void
    // {
    //     this.dialogRef = this._matDialog.open(MilestoneFormComponent, {
    //         panelClass: 'milestone-form-dialog',
    //         data      : {
    //             action: 'new'
    //         }
    //     });

    //     this.dialogRef.afterClosed()
    //         .subscribe((response: FormGroup) => {
    //             if ( !response )
    //             {
    //                 return;
    //             }

    //             this._milestone_Service.addItem(response.getRawValue());
    //         });
    // }

  


}
