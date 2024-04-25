import {useDispatch} from "react-redux";
import {Button, ButtonStyleEnum} from "@freelbee/shared/ui-kit";
import {setFreelancerInvitationModalOpened} from "@company/entities";


export const InviteFreelancerButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      styleType={ButtonStyleEnum.GREEN}
      onClick={() => dispatch(setFreelancerInvitationModalOpened(true))}
      isFit>Add freelancer</Button>
  );
};

