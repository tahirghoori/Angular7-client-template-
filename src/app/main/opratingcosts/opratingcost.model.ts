import { FuseUtils } from "@fuse/utils";

export class Opratingcost {


    id: string;
    title: string;
    handle: string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Opratingcost
     */
    constructor(opratingcost?)
    {
      
        opratingcost = opratingcost || {};
        if (opratingcost.opratingcostName !== ''){
            this.handle = FuseUtils.handleize(opratingcost.opratingcostName  + '');
        }
        this.id = opratingcost.id || '';
        this.title = opratingcost.title || '';
        this.updatedAt = opratingcost.updatedAt || '';
        this.createdAt = opratingcost.createdAt || '';
    }
}
