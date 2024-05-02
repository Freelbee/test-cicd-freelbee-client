import {PageContainer} from "@company/entities";
import {CompanyFreelancers, FreelancerInvitationModal, FreelancersHeading} from "@company/widgets";
import React from "react";

export const FreelancersPage = () => {
  return (
    <PageContainer>
        <FreelancersHeading />
        <CompanyFreelancers />
        <FreelancerInvitationModal />
    </PageContainer>
  )
}
