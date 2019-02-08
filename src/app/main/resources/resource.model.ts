import { FuseUtils } from "@fuse/utils";

export class Resource {

    id: string;
    title: string;
    handle: string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Resource
     */
    constructor(resource?)
    {
      
        resource = resource || {};
        if (resource.resourceName !== ''){
            this.handle = FuseUtils.handleize(resource.resourceName  + '');
        }
        this.id = resource.id || '';
        this.title = resource.title || '';
        this.updatedAt = resource.updatedAt || '';
        this.createdAt = resource.createdAt || '';
    }
}
