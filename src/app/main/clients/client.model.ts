import { FuseUtils } from "@fuse/utils";

export class Client {
    id: string;
    title: string;
    handle: string;
    phoneNumber: number;
    email : string;
    location:string;
    company:string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Client
     */
    constructor(client?)
    {
      
        client = client || {};
        if (client.clientName !== ''){
            this.handle = FuseUtils.handleize(client.clientName  + '');
        }
        this.id = client.id || '';
        this.title = client.title || '';
        this.phoneNumber = client.phoneNumber || '';
        this.email = client.email || '';
        this.location = client.location || '';
        this.company = client.company || '';
        this.updatedAt = client.updatedAt || '';
        this.createdAt = client.createdAt || '';
    }
}
