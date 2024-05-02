import { PageContainer, PageTitle } from "@freelancer/entities"
import { TaskDetailsModal, TaskTable } from "@freelancer/widgets"

export const TasksPage = () => {

  return (
    <PageContainer>
        <PageTitle text='Tasks' />
        <TaskTable />
        <TaskDetailsModal />
    </PageContainer>
  )
}
