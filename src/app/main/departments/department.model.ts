import { FuseUtils } from "@fuse/utils";

export class Department {
    id: string;
    title: string;
    handle: string;
    hod:string;
    bench:number;
  
   
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
        this.hod= department.hod || '';
        this.bench= department.bench || '';
    
    }
}
