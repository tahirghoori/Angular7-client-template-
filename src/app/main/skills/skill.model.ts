import { FuseUtils } from "@fuse/utils";
import { Resource } from "../resources/resource.model";

export class Skill {
   
   
    id: string;
    skillName: string;
    handle: string;
    skillResources:Resource[];
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
        this.skillResources = skill.skillResources || null;
        this.updatedAt = skill.updatedAt || '';
        this.createdAt = skill.createdAt || '';
    }

}
