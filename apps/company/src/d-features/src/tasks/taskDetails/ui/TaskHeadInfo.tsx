'use client';

import { TaskCounterpartyDataDto } from "@freelbee/entities";
import { Text } from "@freelbee/shared/ui-kit";
import { FormRowGrid } from "./FormGrid";
import { DateUtil } from "@freelbee/shared/helpers";

interface Props {
    task: TaskCounterpartyDataDto | null;
}

export default function TaskHeadInfo ({task}: Props) {

    return (
        <FormRowGrid>
            <Text font='bodyMedium'>
                Freelancer: <Text font='body'>{task?.executorEmail}</Text>
            </Text>
            <Text font='bodyMedium'>
                Amount to receive: <Text font='body'>{task?.price} {task?.customerCurrency}</Text>
            </Text>
            <Text font='bodyMedium'>
                Deadline:
                <Text font='body'>
                    {` ${DateUtil.getFormatDate(task?.deadlineAt) ?? '--  --'}`}
                </Text>
            </Text>
        </FormRowGrid>
    );
}