'use client';

import {useDispatch} from "react-redux";
import {Breakpoint, Button, ButtonStyleEnum} from "@freelbee/shared/ui-kit";
import {setFreelancerInvitationModalOpened, useGetCompanyCounterpartyQuery} from "@company/entities";
import {css} from "styled-components";
import {CounterpartyDetailsStatus} from "@freelbee/entities";

export const InviteFreelancerButton = () => {
  const dispatch = useDispatch();
  const {data: company} = useGetCompanyCounterpartyQuery();

  return (
    <Button
      disabled={!company || company.counterpartyDetail.status !== CounterpartyDetailsStatus.APPROVED}
      styleType={ButtonStyleEnum.GREEN}
      onClick={() => dispatch(setFreelancerInvitationModalOpened(true))}
      isFit
      styles={btnStyles}
      wideOnBreakPoint={Breakpoint.xMobile}
    >Add freelancer</Button>
  );
};

const btnStyles = css`
    align-self: flex-start;
   // margin-left: auto;
`

