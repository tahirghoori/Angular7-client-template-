import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../project.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProjectService } from '../project.service';
import { fuseAnimations } from '@fuse/animations';
import { Client } from 'app/main/clients/client.model';
import { MilestoneFormComponent } from 'app/main/milestones/milestone-form/milestone-form.component';
import { Milestone } from 'app/main/milestones/milestone.model';
import { MilestoneService } from 'app/main/milestones/milestone.service';
import { PaymentService } from 'app/main/payments/payment.service';
import { PaymentDailogFormComponent } from 'app/main/payments/payment-dailog-form/payment-dailog-form.component';
import { Payment } from 'app/main/payments/payment.model';
import { ResourceDailogFormComponent } from 'app/main/resources/resource-dailog-form/resource-dailog-form.component';
import { Resource } from 'app/main/resources/resource.model';
import { ResourceService } from 'app/main/resources/resource.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { resource } from 'selenium-webdriver/http';
import { Feature } from 'app/main/features/feature.model';
import { FeatureService } from 'app/main/features/feature.service';

@Component({
    selector: 'app-project-wizard',
    templateUrl: './project-wizard.component.html',
    styleUrls: ['./project-wizard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProjectWizardComponent implements OnInit {

    clients: Client[];
    projectMilestonesList: Milestone[];
    projectPaymentList: Payment[];
    projectResourceList: Resource[];
    projectFeatureList: Feature[];


    // this is form get All Resources
    projectResourcesList: Resource[];


    dialogRef: any;
    project: Project;
    pageType: string;
    projectForm: FormGroup;
    // Private
    private _unsubscribeAll: Subject<any>;
    // // Private
    // private _unsubscribeAll: Subject<any>;


    resourceControl = new FormControl();
    featureControl = new FormControl();

    featureFilteredOptions: Observable<Feature[]>;
    resourceFilteredOptions: Observable<Resource[]>;

    /**
     * Constructor
     *
     * @param {ProjectService} _projectService
     * @param {FormBuilder} _formBuilder
     * @param {MatDialog} _matDialog
     * @param {MilestoneService} _milestoneService
     * @param {PaymentService} _paymentService
     * @param {FeatureService} _featureService
     * @param {MatSnackBar} _snackBar
     * @param {ResourceService} _resourceService
     */
    constructor(
        private _projectService: ProjectService,
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private _milestoneService: MilestoneService,
        private _paymentService: PaymentService,
        private _featureService: FeatureService,
        public _snackBar: MatSnackBar,
        private _resourceService: ResourceService
    ) {
        // Set the default
        this.project = new Project();

        // Set the private defaults
        // this._unsubscribeAll = new Subject();
        // Set the private defaults
        // this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to update project on changes
        // this._projectService.onProjectChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(project => {

        // if ( project )
        // {
        //     this.project = new Project(project);
        //     this.pageType = 'edit';
        // }
        // else
        // {
        this.pageType = 'new';
        this.project = new Project();
        // }

        this.projectForm = this.createProjectForm();
        // });


        this._projectService.getAllClients().subscribe(projectClient => {
            this.clients = projectClient.map((client) => new Client(client));
            // console.log(this.resourceDepartments);

        });

        this._projectService.getAllResources().subscribe(projectResource => {
            this.projectResourcesList = projectResource.map((resource) => new Resource(resource));

            this.resourceFilteredOptions = this.resourceControl.valueChanges
                .pipe(startWith<string | Resource>(''),
                    map(value => typeof value === 'string' ? value : value.name),
                    map(name => name ? this._filter(name) : this.projectResourcesList.slice()));

        });


        this._projectService.getAllFeatures().subscribe(projectFeature => {
            this.projectFeatureList = projectFeature.map((feature) => new Feature(feature));
            console.log(this.projectFeatureList);
            this.featureFilteredOptions = this.featureControl.valueChanges
            .pipe(startWith<string | Feature>(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this._filterFeature(name) : this.projectFeatureList.slice()));
          });


        this._milestoneService.milestones = this.project.projectMilestones;
        this._paymentService.payments = this.project.projectPayments;
        this._resourceService.resources = this.project.projectResources;
        this._featureService.features = this.project.projectFeatures;


    }

    private _filterFeature(name: string): Feature[] {
        const filterValue = name.toLowerCase();
        return this.projectFeatureList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
    displayFnFeature(item?: Feature): string | undefined {

        return item ? item.name : undefined;
    }
    private _filter(name: string): Resource[] {
        const filterValue = name.toLowerCase();
        return this.projectResourcesList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }

    displayFn(item?: Resource): string | undefined {

        return item ? item.name : undefined;
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next();
        // this._unsubscribeAll.complete();
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create project form
     *
     * @returns {FormGroup}
     */
    createProjectForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.project.id],
            name: [this.project.name],
            handle: [this.project.handle],
            description: [''],
            categories: [''],
            projectClient: [this.project.projectClient],
            projectDevelopmentDate: [''],
            projectStartDate: [''],
            tags: [''],
            projectCost: [this.project.projectCost, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            projectTimeline: [this.project.projectTimeline, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            projectPaymentMethod: [this.project.projectPaymentMethod, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            projectResources: [this.project.projectResources],
            images: [''],
            priceTaxExcl: [''],
            priceTaxIncl: [''],
            taxRate: [''],
            comparedPrice: [''],
            quantity: [''],
            sku: [''],
            width: [''],
            height: [''],
            depth: [''],
            weight: [''],
            extraShippingFee: [''],
            active: ['']
        });
    }

    compareFn(c1: Client, c2: Client): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }
    comparerResource(o1: Resource, o2: Resource): boolean {
        // if possible compare by object's name, and not by reference.
        return o1 && o2 ? o1.name === o2.name : o2 === o2;
    }
    /**
     * Save project
     */
    saveProject(): void {
        const data = this.projectForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        // this._projectService.saveProject(data)
        //     .then(() => {

        //         // Trigger the subscription with new data
        //         this._projectService.onProjectChanged.next(data);

        //         // Show the success message
        //         this._matSnackBar.open('Project saved', 'OK', {
        //             verticalPosition: 'top',
        //             duration        : 2000
        //         });
        //     });
    }

    /**
     * Add project
     */
    addProject(): void {
        const data = this.projectForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        // this._projectService.addProject(data)
        //     .then(() => {

        //         // Trigger the subscription with new data
        //         this._projectService.onProjectChanged.next(data);

        //         // Show the success message
        //         this._matSnackBar.open('Project added', 'OK', {
        //             verticalPosition: 'top',
        //             duration        : 2000
        //         });

        //         // Change the location with new one
        //         this._location.go('apps/e-commerce/projects/' + this.project.id + '/' + this.project.handle);
        //     });
    }
    /**
     * New contact
     */
    newMilestone(): void {
        this.dialogRef = this._matDialog.open(MilestoneFormComponent, {
            panelClass: 'milestone-form-dialog',
            data: {
                action: 'new',

            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this.projectMilestonesList = response.getRawValue();
                console.log(this.projectMilestonesList);


                this._milestoneService.updateMilestone(response.getRawValue());
            });
    }
    /**
    * New contact
    */
    newPayment(): void {
        this.dialogRef = this._matDialog.open(PaymentDailogFormComponent, {
            panelClass: 'milestone-form-dialog',
            data: {
                action: 'new',

            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this.projectPaymentList = response.getRawValue();
                console.log(this.projectPaymentList);


                this._paymentService.updatePayment(response.getRawValue());
            });
    }

    /**
* New contact
*/
    newResource(): void {
        if (this.resourceControl.value != '' && this.resourceControl.value != null) {
            this.dialogRef = this._matDialog.open(ResourceDailogFormComponent, {
                panelClass: 'milestone-form-dialog',
                data: {
                    resource: this.resourceControl.value,
                    action: 'new',

                }
            });
            this.resourceControl.setValue('');

            this.dialogRef.afterClosed()
                .subscribe((response: FormGroup) => {
                    if (!response) {
                        return;
                    }
                    this.projectResourceList = response.getRawValue();
                    console.log(this.projectResourceList);


                    this._resourceService.updateResource(response.getRawValue());
                });
        } else {
            this._snackBar.open('Please Select Resource', 'End now', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'top',
            });
        }
        // console.log();


    }

        /**
* New contact
*/
newFeature(): void {
    if (this.featureControl.value != '' && this.featureControl.value != null) {
    //     this.dialogRef = this._matDialog.open(ResourceDailogFormComponent, {
    //         panelClass: 'milestone-form-dialog',
    //         data: {
    //             resource: this.resourceControl.value,
    //             action: 'new',

    //         }
    //     });
        this._featureService.updateFeature(this.featureControl.value);
        this.featureControl.setValue('');

    //     this.dialogRef.afterClosed()
    //         .subscribe((response: FormGroup) => {
    //             if (!response) {
    //                 return;
    //             }
    //             this.projectResourceList = response.getRawValue();
    //             console.log(this.projectResourceList);


    //             this._resourceService.updateResource(response.getRawValue());
    //         });
    } else {
        this._snackBar.open('Please Select Feature', 'End now', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
    console.log(this.featureControl.value);


}
}
