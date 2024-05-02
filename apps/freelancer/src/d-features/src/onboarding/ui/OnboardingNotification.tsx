'use client';

import { setOnboardingOpened } from "@freelancer/entities";
import { InfoBadge } from "@freelbee/entities";
import { ButtonStyleEnum, Color } from "@freelbee/shared/ui-kit";
import { useDispatch } from "react-redux";
import image from '@freelbee/assets/images/notification/notification_image.png';

export const OnboardingNotification = () => {
    const dispatch = useDispatch();

  return (
    <InfoBadge 
        header='Hello!'
        message='You must confirm your profile to get full access to the service functionality' 
        background={Color.BLUE}
        textColor={Color.WHITE}
        action={() => dispatch(setOnboardingOpened(true))}
        buttonText="Confirm"
        buttonType={ButtonStyleEnum.STROKE_WHITE}
        imageSrc={image}
    />
  )
}
