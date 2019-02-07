import { FuseUtils } from "@fuse/utils";

export class Skill {
   
   
    id: string;
    skillName: string;
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
        if (skill.skillName !== ''){
            this.handle = FuseUtils.handleize(skill.skillName  + '');
        }
        this.id = skill.id || '';
        this.skillName = skill.skillName || '';
        this.updatedAt = skill.updatedAt || '';
        this.createdAt = skill.createdAt || '';
    }

}
