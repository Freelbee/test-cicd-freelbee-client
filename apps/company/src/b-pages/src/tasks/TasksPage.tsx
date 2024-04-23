import { PageContainer, PageTitle } from "@company/entities"
import { TaskTable, TasksCounter, TaskCreationModal } from "@company/widgets";

export const TasksPage = () => {

  return (
    <>
      <PageContainer>
          <TasksCounter />
      </PageContainer>
      <PageContainer style={{marginTop: '24px'}}>
        <PageTitle text='Tasks' />
        <TaskTable />
      </PageContainer>
      <TaskCreationModal />
    </>
  )
}
