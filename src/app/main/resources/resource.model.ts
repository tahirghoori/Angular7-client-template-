import { FuseUtils } from "@fuse/utils";

export class Resource {

    id: string;
    resourceName :string;
    resourceCNIC : string;
    resourceDOB : string;
    resourceEmail : string;
    resourceAddress : string;
    resourcePhone : string;
    resourceReligion : string;
    resourceBloodGroup : string;
    resourceNationality : string;
    resourceEmergencyContactNo : string;
    resourceMaritalStatus : string;
    resourceDesignation : string;
    resourceReportingTo : string;
    resourceResume : string;
    resourceDateOfJoining : Date;
    resourceWorkingDays: number;
    resourceExperience : number;
    resourceSalaryPerMonth: number;
    resourcePerHourRate :number;
    resourceShift : string;
    resourceBenefits: string;
    resourceContractType : number;     //isIntern, isPartTime , isFullTime
    resourcePartTime : boolean;
    handle: string;
    updatedAt: string;
    createdAt: string;

   
    /**
     * Constructor
     *
     * @param Resource
     */
    constructor(resource?)
    {
      
        resource = resource || {};
        if (resource.resourceName !== ''){
            this.handle = FuseUtils.handleize(resource.resourceName  + '');
        }
        this.id = resource.id || '';
        this.resourceName = resource.resourceName || '';
        this.resourceCNIC = resource.resourceCNIC || '';
        this.resourceDOB = resource.resourceDOB || '';
        this.resourceEmail = resource.resourceEmail || '';
        this.resourceAddress = resource.resourceAddress || '';
        this.resourcePhone = resource.resourcePhone || '';
        this.resourceReligion = resource.resourceReligion || '';
        this.resourceBloodGroup = resource.resourceBloodGroup || '';
        this.resourceNationality = resource.resourceNationality || '';
        this.resourceEmergencyContactNo = resource.resourceEmergencyContactNo || '';
        this.resourceMaritalStatus = resource.resourceMaritalStatus || '';
        this.resourceDesignation = resource.resourceDesignation || '';
        this.resourceReportingTo = resource.resourceReportingTo || '';
        this.resourceResume = resource.resourceResume || '';
        this.resourceDateOfJoining = resource.resourceDateOfJoining || '';
        this.resourceWorkingDays = resource.resourceWorkingDays || '';
        this.resourceExperience = resource.resourceExperience || '';
        this.resourceSalaryPerMonth = resource.resourceSalaryPerMonth || '';
        this.resourcePerHourRate = resource.resourcePerHourRate || '';
        this.resourceShift = resource.resourceShift || '';
        this.resourceBenefits = resource.resourceBenefits || '';
        this.resourceContractType = resource.resourceContractType || '';
        this.resourcePartTime = resource.resourcePartTime || '';
        this.updatedAt = resource.updatedAt || '';
        this.createdAt = resource.createdAt || '';
    }
}
