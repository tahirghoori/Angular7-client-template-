import { FuseUtils } from "@fuse/utils";

export class Client {
    id: string;
    clientName: string;
    handle: string;
    clientPhoneNumber: number;
    clientEmail : string;
    clientSocial:string;
    clientLocation:string;
    clientWebUrl:string;
    clientCompany:string;
    clientAddress:string;
    clientImageUrl:string;
    clientTimeZone:string;
    clientAvailability:string;
    isActive:boolean;
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
        this.clientName = client.clientName || '';
        this.clientPhoneNumber = client.clientPhoneNumber || '';
        this.clientEmail = client.clientEmail || '';
        this.clientAddress = client.clientAddress || '';
        this.clientImageUrl = client.clientImageUrl || '';
        this.clientLocation = client.clientLocation || '';
        this.clientSocial = client.clientSocial || '';
        this.clientTimeZone = client.clientTimeZone || '';
        this.clientWebUrl = client.clientWebUrl || '';
        this.clientCompany = client.clientCompany || '';

        this.clientAvailability = client.clientAvailability || '';
        this.isActive = client.isActive || '';

        this.updatedAt = client.updatedAt || '';
        this.createdAt = client.createdAt || '';
    }
}
