import { FuseUtils } from "@fuse/utils";

export class Feature {

    id: string;
    title: string;
    handle: string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Feature
     */
    constructor(feature?)
    {
      
        feature = feature || {};
        if (feature.featureName !== ''){
            this.handle = FuseUtils.handleize(feature.featureName  + '');
        }
        this.id = feature.id || '';
        this.title = feature.title || '';
        this.updatedAt = feature.updatedAt || '';
        this.createdAt = feature.createdAt || '';
    }
}
