import { Injectable } from '@angular/core';
import { Payment } from './payment.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  onMilestonesChanged: BehaviorSubject<any>;
  onSelectedMilestonesChanged: BehaviorSubject<any>;
  payments: Payment[];

 /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
  ) {
    // Set the defaults
    this.onMilestonesChanged = new BehaviorSubject([]);
    this.onSelectedMilestonesChanged = new BehaviorSubject([]);
  }

  


  paymentIndex:any;

  

    /**
     * Update payment
     *
     * @param payment
     * @returns {Promise<any>}
     */
    updatePayment(payment): Promise<any>
    {
     
        return new Promise((resolve, reject) => {
          if(payment.id != ''){
           
        this.paymentIndex = this.payments.indexOf(payment);
            this.payments.splice(this.paymentIndex, 1);
          }
          this.payments.push(payment);
          this.onMilestonesChanged.next(this.payments);

            // this._httpClient.post('api/payments-payments/' + payment.id, {...payment})
            //     .subscribe(response => {
            //         this.getMilestones();
                    resolve(payment);
            //     });
        });
    }

    

    /**
     * Delete payment
     *
     * @param payment
     */
    deleteMilestone(payment): void
    {
        const paymentIndex = this.payments.indexOf(payment);
        this.payments.splice(paymentIndex, 1);
        this.onMilestonesChanged.next(this.payments);
    }






}
