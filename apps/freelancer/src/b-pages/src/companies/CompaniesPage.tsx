import { PageContainer, PageTitle } from "@freelancer/entities"
import { FreelancerCompanies } from "@freelancer/widgets"

export const CompaniesPage = () => {
  return (
    <PageContainer>
        <PageTitle text='Companies' />
        <FreelancerCompanies />
    </PageContainer>
  )
}
