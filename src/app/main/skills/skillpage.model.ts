import { Skill } from './skill.model';
export class SkillPage {
   
    content : Skill[];
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
     * @param SkillPage
     */
    constructor(skillPage?)
    {
      
        skillPage = skillPage || {};
        
        this.content = skillPage.content || [];
        this.totalPages = skillPage.totalPages || '';
        this.totalElements = skillPage.totalElements || '';
        this.last = skillPage.last || '';
        this.size = skillPage.size || '';
        this.first = skillPage.first || '';
        this.sort = skillPage.sort || '';
        this.number = skillPage.number || '';
    
        
    }



}
