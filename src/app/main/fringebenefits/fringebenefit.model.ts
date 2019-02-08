import { FuseUtils } from "@fuse/utils";

export class Fringebenefit {
    id: string;
    title: string;
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
        this.title = fringebenefit.title || '';
        this.updatedAt = fringebenefit.updatedAt || '';
        this.createdAt = fringebenefit.createdAt || '';
    }
}
