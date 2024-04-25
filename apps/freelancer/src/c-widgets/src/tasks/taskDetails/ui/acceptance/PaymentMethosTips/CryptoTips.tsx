'use client';
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { Color, InfoWithIcon } from '@freelbee/shared/ui-kit';

export const CryptoTips = () => {
  return (
    <InfoWithIcon
        withPadding={false}
        Icon={AlertIcon}
        textColor={Color.BLUE}
        background={Color.TRANSPARENT}
        align="flex-start"
        font="body">
        You will receive payment in crypto
    </InfoWithIcon>
  )
}
