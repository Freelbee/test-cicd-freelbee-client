'use client';
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { Color, InfoWithIcon } from '@freelbee/shared/ui-kit';

export const BancAccountTips = () => {
  return (
    <InfoWithIcon
        Icon={AlertIcon}
        textColor={Color.BLUE}
        align="flex-start"
        font="body">
        Countries where transfers can be made: Angola; Armenia; Austria; Azerbaijan; Bahrain; Belgium; Benin; Bhutan; Botswana; Brazil; Brunei Darussalam; Bulgaria; Burkina Faso; Cambodia; Cameroon; Cape Verde; chad; Chile; Colombia; Comoros; Costa Rica; Croatia; Cyprus; Czech Republic; Denmark; Djibouti; Ecuador; El Salvador; Equatorial Guinea; Eritrea; Estonia; Eswatini; Ethiopia; Finland; France; Gabon; Gambia; Georgia; Germany; Ghana; Greece; Guinea; Guinea-Bissau; Hungary; Iceland; Israel; Italy; Japan; Kazakhstan; Kenya; Kyrgyzstan; Latvia; Lebanon; Lesotho; Liberia; Liechtenstein; Lithuania; Luxembourg; Madagascar; Malaysia; Malta; Mauritania; Mauritius; Mexico; Mongolia; Mozambique; Netherlands; Nicaragua; Norway; Panama; Paraguay; Peru; Philippines; Poland; Portugal; Dominican Republic; Republic of Ireland; Romania; Sao Tome and Principe; Saudi Arabia; Seychelles; Sierra Leone; Singapore; Slovakia; Slovenia; South Africa; South Korea; Spain; Sweden; Taiwan; Tajikistan; Thailand; Republic of Türkiye; Ukraine; United Arab Emirates; United Kingdom; Uruguay; Vietnam; Yemen Arab Republic; Zambia
    </InfoWithIcon>
  )
}
