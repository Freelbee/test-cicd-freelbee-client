import { PageContainer, PageTitle } from "@company/entities"
import {
  TaskTable,
  TasksCounter,
  TaskCreationModal,
  TaskDetailsModal,
  FreelancerInvitationModal
} from "@company/widgets";
import React from "react";

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
      <TaskDetailsModal />
      <FreelancerInvitationModal />
    </>
  )
}
