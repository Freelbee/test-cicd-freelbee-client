'use client';

import { css } from 'styled-components';
import { TableHead, useGetAllConfirmationCodesQuery } from '@admin/entities';
import { Breakpoint, Color, Text, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import { ConfirmationCodesRow } from './ui/ConfirmationCodesRow';

export const ConfirmationCodesTable = () => {
  const { data: confirmationCodes } = useGetAllConfirmationCodesQuery();

  return (
    <>
      <TableHead styles={headRow}>
        <Text font="body" color={Color.GRAY_700}>Contact Method</Text>
        <Text font="body" color={Color.GRAY_700}>Contact</Text>
        <Text font="body" color={Color.GRAY_700}>Purpose</Text>
        <Text font="body" color={Color.GRAY_700}>Code</Text>
      </TableHead>
      {confirmationCodes && [...confirmationCodes]
        .sort((a, b) => b.id.localeCompare(a.id))
        .map(confirmationCode => (
          <ConfirmationCodesRow key={confirmationCode.id} confirmationCode={confirmationCode} />
        ))}
    </>
  );
};

const headRow = css`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr 0.8fr 0.5fr;
  gap: 16px;

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    display: none;
  }
`;
