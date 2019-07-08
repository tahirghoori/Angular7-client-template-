import { FuseUtils } from "@fuse/utils";
import { MatChipInputEvent } from "@angular/material";

export class Permission {
    id: string;
    name: string ;
    description: string ;
    parent: string ;
    handle: string;
    updatedAt: string;
    createdAt: string;
    children: Permission[];
    tags: String[];
    isSelected: Boolean;
   
    /**
     * Constructor
     *
     * @param Permission
     */
    constructor(permission?)
    {
      
        permission = permission || {};
        if (permission.name !== ''){
            this.handle = FuseUtils.handleize(permission.name  + '');
        }
        this.id = permission.id || '';
        this.parent = permission.parent || '';
        this.children = permission.children || [];
        this.tags = permission.tags || [];
        this.name = permission.name || '';
        this.description = permission.description || '';
        this.updatedAt = permission.updatedAt || '';
        this.createdAt = permission.createdAt || '';
        this.isSelected = permission.isSelected || false;
    }


   /**
     * Add tag
     *
     * @param {MatChipInputEvent} event
     */
    addTag(event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ( value )
        {
            this.tags.push(value);
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    /**
     * Remove tag
     *
     * @param tag
     */
    removeTag(tag): void
    {
        const index = this.tags.indexOf(tag);

        if ( index >= 0 )
        {
            this.tags.splice(index, 1);
        }
    }


}