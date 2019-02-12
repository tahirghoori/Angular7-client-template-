import { Component, OnInit } from '@angular/core';
import { Client } from '../client.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ClientService } from '../client.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations: fuseAnimations
})
export class ClientComponent implements OnInit {
  client: Client;
  pageType: string;
  clientForm: FormGroup;
  
  // myControl = new FormControl();
  package_id: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  
  /**
   * Constructor
   *
   * @param {ClientService} _clientService
   * @param {FormBuilder} _formBuilder
   * @param {MatSnackBar} _matSnackBar,
   *
   */
  constructor(
    private _clientService: ClientService,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {
    // Set the default
    this.client = new Client();
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
    this._clientService.onItemChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(client => {

        if (client) {
          this.client = new Client(client);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.client = new Client();
        }
        this.clientForm = this.createClientForm();


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
   * Create client form
   *
   * @returns {FormGroup}
   */
  createClientForm(): FormGroup {
    
      return this._formBuilder.group({
        id: [this.client.id],
        title: [this.client.title],
        handle: [this.client.handle],
        phoneNumber:[this.client.phoneNumber],
        email: [this.client.email],
        location: [this.client.location],
        company: [this.client.company]
      });
   
  }

  /**
   * Save client
   */
  saveClient(): void {
    const data = this.clientForm.getRawValue();
    data.handle = FuseUtils.handleize(data.title);

    this._clientService.saveItem(data)
      .then(() => {

        // Trigger the subscription with new data
        this._clientService.onItemChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Record saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        this._router.navigate(['/clients']);
      });
  }

  /**
   * Add client
   */
  addClient(): void {
    const data = this.clientForm.getRawValue();
    data.handle = FuseUtils.handleize(data.title);

    this._clientService.addItem(data)
      .then(() => {

        // Trigger the subscription with new data
        this._clientService.onItemChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Record added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this._router.navigate(['/clients']);
      });
  }

}