import { PageContainer, PageTitle } from "@company/entities"
import { TaskDetailsModal, TaskTable, TasksCounter } from "@company/widgets"

export const TasksPage = () => {

  return (
    <>
      <PageContainer>
          <TasksCounter />
      </PageContainer>    
      <PageContainer style={{marginTop: '24px'}}>
        <PageTitle text='Tasks' />
        <TaskTable />

        <TaskDetailsModal />
    </PageContainer>
    </>
  )
}
