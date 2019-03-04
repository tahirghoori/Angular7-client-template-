import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;


    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param {ActivatedRoute} _route
     * @param {Router} _router
     * @param {AuthenticationService} _authenticationService
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _matSnackBar: MatSnackBar

    )
    {
         // redirect to home if already logged in
         if (this._authenticationService.currentUserValue) { 
            this._router.navigate(['/']);
        }
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            // username   : ['', [Validators.required]],
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
          // get return url from route parameters or default to '/'
          this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }

      // convenience getter for easy access to form fields
      // tslint:disable-next-line:typedef
      get f() { return this.loginForm.controls; }

      // tslint:disable-next-line:typedef
      onSubmit() {
          this.submitted = true;
  
          // stop here if form is invalid
          if (this.loginForm.invalid) {
              return;
          }
  
          this.loading = true;
          this._authenticationService.login(this.f.email.value, this.f.password.value)
              .pipe(first())
              .subscribe(
                  data => {
                      this._router.navigate([this.returnUrl]);
                  },
                  error => {
                    //   this.alertService.error(error);
                            // Show the success message
                this._matSnackBar.open(error, 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
                      this.loading = false;
                  });
      }
}
