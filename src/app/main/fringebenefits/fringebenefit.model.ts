import { FuseUtils } from "@fuse/utils";

export class Fringebenefit {
    id: string;
    benefitMonth : string;
    expenseName: string;
    expenseAmount:number;
    isOneTime : boolean;
    handle: string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Fringebenefit
     */
    constructor(fringebenefit?)
    {
      
        fringebenefit = fringebenefit || {};
        if (fringebenefit.fringebenefitName !== ''){
            this.handle = FuseUtils.handleize(fringebenefit.fringebenefitName  + '');
        }
        this.id = fringebenefit.id || '';
        this.benefitMonth = fringebenefit.benefitMonth || '';
        this.expenseName = fringebenefit.expenseName || '';
        this.expenseAmount = fringebenefit.expenseAmount || '';
        this.isOneTime = fringebenefit.isOneTime || '';
        this.updatedAt = fringebenefit.updatedAt || '';
        this.createdAt = fringebenefit.createdAt || '';
    }
}
