import { TaskStatus } from "./TaskStatus";

export interface TaskCounterpartyDataDto {
    id: number,
    taskId: number,
    title: string,
    status: TaskStatus,
    createdAt: string,
    deadlineAt: string,
    finishedAt: string | null,
    payedAt: string | null,
    description: string,
    customerId: number,
    executorId: number,
    contractId: number | null,
    customerEmail: string,
    executorEmail: string,
    workTypeId: number | null,
    price: number | null,
    customerCurrency: string,
    executorCurrency: string
}

// {
//     "id": 2,
//     "taskId": 3,
//     "title": "Develop website frontend",
//     "status": "NEW",
//     "createdAt": "2024-04-18T05:53:42.257115Z",
//     "deadlineAt": "2024-04-15T18:00:00Z",
//     "finishedAt": null,
//     "payedAt": null,
//     "description": "Create responsive frontend for a corporate website with HTML, CSS, and JavaScript",
//     "customerId": 1,
//     "executorId": 1,
//     "customerEmail": "ff@mail.com",
//     "executorEmail": "ff1@mail.com",
//     "workTypeId": null,
//     "price": null,
//     "customerCurrency": "1",
//     "executorCurrency": "USD"
// }

