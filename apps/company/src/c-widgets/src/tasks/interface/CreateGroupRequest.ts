import { Currency, FreelancerRole, SystemStatus } from './TaskGeneralInfoFormData';

export type TaskInGroupRequest = {
    description: string,
    name: string,
    endDate: string,
    isNda: boolean,
    isIntellectualProperty: boolean,

    freelancerTaskInfo: {
        type: FreelancerRole,
        userDetail: {
            email: string
        },
    },

    companyTaskInfo: {
        currency: Currency,
        price: string
    }
    attributeValues: Array<{
        name: string,
        attributeType: string,
        attributeId: number
    }>
};

export type TaskFreelancerData = {
    firstName: string,
    lastName: string,
    role: FreelancerRole,
    systemStatus: SystemStatus,
    email: string,
    price: number,
    currency: Currency,
};
