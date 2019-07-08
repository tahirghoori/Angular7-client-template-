import { Role } from './role.model';
export class RolePage {
   
    content : Role[];
    totalPages : number;
    totalElements : number;
    last : string;
    size : number ;
    first : string ;
    sort : string ;
    number : number ;
    next : string ;
    


 
    /**
     * Constructor
     *
     * @param RolePage
     */
    constructor(rolePage?)
    {
      
        rolePage = rolePage || {};
        
        this.content = rolePage.content || [];
        this.totalPages = rolePage.totalPages || '';
        this.totalElements = rolePage.totalElements || '';
        this.last = rolePage.last || '';
        this.size = rolePage.size || '';
        this.first = rolePage.first || '';
        this.sort = rolePage.sort || '';
        this.number = rolePage.number || '';
    
        
    }



}
