import { FuseUtils } from "@fuse/utils";

export class Skill {
   
   
    id: string;
    name: string ;
    handle: string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Skill
     */
    constructor(skill?)
    {
      
        skill = skill || {};
        if (skill.name !== ''){
            this.handle = FuseUtils.handleize(skill.name  + '');
        }
        this.id = skill.id || '';
        this.name = skill.name || '';
        this.updatedAt = skill.updatedAt || '';
        this.createdAt = skill.createdAt || '';
    }

}
