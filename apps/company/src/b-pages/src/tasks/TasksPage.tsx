import { PageContainer, PageTitle } from "@company/entities"
import {
  TaskTable,
  TasksCounter,
  TaskCreationModal,
  TaskDetailsModal,
  FreelancerInvitationModal
} from "@company/widgets";
import React, { useEffect } from 'react';

export const TasksPage = () => {

  useEffect(() => {
    // replace character on * on middle of the string
    const str = process.env.NEXT_PUBLIC_TRANSAK_API_KEY ?? '';
    const newStr = str.substring(0, 5) + '*' + str.substring(6);
    console.log(newStr);
  }, []);

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
