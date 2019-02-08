import { FuseUtils } from "@fuse/utils";

export class Milestone {

    id: string;
    title: string;
    handle: string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Milestone
     */
    constructor(milestone?)
    {
      
        milestone = milestone || {};
        if (milestone.milestoneName !== ''){
            this.handle = FuseUtils.handleize(milestone.milestoneName  + '');
        }
        this.id = milestone.id || '';
        this.title = milestone.title || '';
        this.updatedAt = milestone.updatedAt || '';
        this.createdAt = milestone.createdAt || '';
    }
}
