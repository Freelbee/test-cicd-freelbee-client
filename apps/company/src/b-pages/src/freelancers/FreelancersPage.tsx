import { PageContainer, PageTitle } from "@company/entities";
import { CompanyFreelancers } from "@company/widgets";

export const FreelancersPage = () => {
  return (
    <PageContainer>
        <PageTitle text='Freelancers' />
        <CompanyFreelancers />
    </PageContainer>
  )
}
