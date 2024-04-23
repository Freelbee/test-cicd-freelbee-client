import { PageContainer, PageTitle } from "@freelancer/entities"
import { TaskTable } from "@freelancer/widgets"

export const TasksPage = () => {

  return (
    <PageContainer>
        <PageTitle text='Tasks' />
        <TaskTable />
    </PageContainer>
  )
}
