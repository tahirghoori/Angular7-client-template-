import { FuseUtils } from "@fuse/utils";

export class Department {
    id: string;
    departmentName: string;
    handle: string;
    departmentHod:string;
    departmentBench:number;
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
        this.departmentName = department.departmentName || '';
        this.departmentHod= department.departmentHod || '';
        this.departmentBench= department.departmentBench || '';
        this.updatedAt = department.updatedAt || '';
        this.createdAt = department.createdAt || '';
    
    }
}
