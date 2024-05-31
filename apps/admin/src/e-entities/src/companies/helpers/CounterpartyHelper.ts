import {
  CounterpartyDocumentLinkDto,
  CounterpartyDocumentType,
  CounterpartyDto,
  CounterpartyDtoModified
} from '@freelbee/entities';
import { PropsHelper } from '@freelbee/shared/helpers';
import { PageResponse } from '@freelbee/shared';

export class CounterpartyHelper {
  static ModifyCounterpartyDto(counterpartyDto: CounterpartyDto): CounterpartyDtoModified {
    const mappedCounterpartyDetailProps = PropsHelper.MapPropsToFields(counterpartyDto.counterpartyDetail.props);
    const mappedUserDataProps = PropsHelper.MapPropsToFields(counterpartyDto.user.userData.props);
    return {
      ...counterpartyDto,
      counterpartyDetail: { ...counterpartyDto.counterpartyDetail, props: mappedCounterpartyDetailProps },
      user: { ...counterpartyDto.user, userData: { ...counterpartyDto.user.userData, props: mappedUserDataProps } }
    };
  }

  static ModifyPageOfCounterpartyDto(pageOfCounterpartyDto: PageResponse<CounterpartyDto>): PageResponse<CounterpartyDtoModified> {
    const contentModified = pageOfCounterpartyDto.content.map((counterpartyDto: CounterpartyDto) => {
      return CounterpartyHelper.ModifyCounterpartyDto(counterpartyDto)
    });
    return { ...pageOfCounterpartyDto, content: contentModified };
  }

  static MapCounterpartyDocumentLinks(props: CounterpartyDocumentLinkDto[]): Record<CounterpartyDocumentType, string> {
    const links = {} as Record<CounterpartyDocumentType, string>;
    props.forEach(({documentType, documentLink}) => {
      links[documentType] = documentLink;
    })
    return links;
  }
}
