import {PageContainer} from "@company/entities";
import {CompanyFreelancers, FreelancersHeading} from "@company/widgets";
import React from "react";
import {FreelancerInvitationModal} from "../../../c-widgets/src/freelancer/FreelancerInvitation";

export const FreelancersPage = () => {
  return (
    <PageContainer>
        <FreelancersHeading />
        <CompanyFreelancers />
        <FreelancerInvitationModal />
    </PageContainer>
  )
}
