import { FuseUtils } from "@fuse/utils";

export class Role {
    id: string;
    name: string ;
    permission: string ;
    handle: string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Role
     */
    constructor(role?)
    {
      
        role = role || {};
        if (role.name !== ''){
            this.handle = FuseUtils.handleize(role.name  + '');
        }
        this.id = role.id || '';
        this.name = role.name || '';
        this.permission = role.permission || '';
        this.updatedAt = role.updatedAt || '';
        this.createdAt = role.createdAt || '';
    }

}
