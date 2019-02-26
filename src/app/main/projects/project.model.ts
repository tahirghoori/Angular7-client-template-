import { FuseUtils } from "@fuse/utils";
import { CdkCellOutletMultiRowContext } from "@angular/cdk/table";
import { Client } from "../clients/client.model";

export class Project {


    id: string;
    name: string;
    projectClient:Client;
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
        this.projectClient =project.projectClient || null;
        this.updatedAt = project.updatedAt || '';
        this.createdAt = project.createdAt || '';
    }
}
