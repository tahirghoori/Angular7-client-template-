import { FuseUtils } from "@fuse/utils";

export class Project {


    id: string;
    name: string;
    handle: string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Project
     */
    constructor(project?)
    {
      
        project = project || {};
        if (project.projectName !== ''){
            this.handle = FuseUtils.handleize(project.projectName  + '');
        }
        this.id = project.id || '';
        this.name = project.name || '';
        this.updatedAt = project.updatedAt || '';
        this.createdAt = project.createdAt || '';
    }
}
