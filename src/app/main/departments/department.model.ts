import { FuseUtils } from "@fuse/utils";

export class Department {
    id: string;
    title: string;
    handle: string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Department
     */
    constructor(department?)
    {
      
        department = department || {};
        if (department.departmentName !== ''){
            this.handle = FuseUtils.handleize(department.departmentName  + '');
        }
        this.id = department.id || '';
        this.title = department.title || '';
        this.updatedAt = department.updatedAt || '';
        this.createdAt = department.createdAt || '';
    }
}
