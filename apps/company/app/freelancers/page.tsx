import { PageContainer, PageTitle } from "@company/entities";
import { CompanyFreelancers } from "@company/widgets";

export default function Index() {
  return (
    <PageContainer>
      <PageTitle text='Freelancers' />
      <CompanyFreelancers />
    </PageContainer>
  );
}
