export enum FreelancerRole {
    DEFAULT = 'default',
    INDIVIDUAL_ENTREPRENEUR = 'individual_entrepreneur',
    SELF_EMPLOYED = 'self_employed',
    SELF_INDIVIDUAL = 'self_individual',
    PERSONAL = 'personal',
}

export enum FreelancerStatus {
    WAIT_FOR_APPROVAL = 'wait_for_approval',
    APPROVED = 'approved',
    DISABLED = 'disabled',
    FAILED = 'failed',
}

type FreelancerModel = {
    id: number,
    userId: number,
    type: FreelancerRole
    status: FreelancerStatus
};

export default FreelancerModel;
