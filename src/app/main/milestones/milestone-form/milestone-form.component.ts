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
  action: string;
    milestone: Milestone;
    milestoneForm: FormGroup;
    dialogTitle: string;
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    

    /**
     * Constructor
     *
     * @param {MatDialogRef<MilestoneFormComponent>} matDialogRef
     * @param _data 
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<MilestoneFormComponent>,
        @Inject(MAT_DIALOG_DATA) 
        private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        console.log(this.action);
        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Milestone';
            this.milestone = _data.milestone;
        }
        else
        {
            this.dialogTitle = 'New Milestone';
            this.milestone = new Milestone({});
        }

        this.milestoneForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create milestone form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup
    {
        return this._formBuilder.group({
          id: [this.milestone.id],
          name: [this.milestone.name],
          handle: [this.milestone.handle],
          milestoneStartDate: [this.milestone.milestoneStartDate],
          milestoneDelieveryDate: [this.milestone.milestoneDelieveryDate],
          milestoneDevelopmentDate: [this.milestone.milestoneDevelopmentDate],
          milestoneExpectedPayment: [this.milestone.milestoneExpectedPayment],
          milestonePaymentAmount: [this.milestone.milestonePaymentAmount],
          milestoneCost: [this.milestone.milestoneCost],
          milestonePaymentMethod: [this.milestone.milestonePaymentMethod],
        });
    }

}
