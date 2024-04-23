import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { Breakpoint, Color, mediaBreakpointDown, Text, typography } from '@freelbee/shared/ui-kit';
import moment from 'moment';
import { useOnClickOutside } from '@freelbee/shared/hooks';
import { calendarLogic } from './calendarLogic';
import DateUtil from '../../../utils/date/DateUtil';
import ArrowY from './ArrowY';
import ArrowX from './ArrowX';
import { MonthYearSwitcher } from './MonthYearSwitcher';
import { Dates } from './Dates';

export enum PopupPosition {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

interface Props {
  startDate?: Date;
  endDate?: Date;
  // setDate: (dates: {startDate: Date | null, endDate: Date | null}) => void;
  onSelectFirst: (date: Date | null) => void,
  onSelectSecond: (date: Date | null) => void,
  minYear?: number,
  maxYear?: number,
  minDate?: Date,
  maxDate?: Date,
  additionalButton?: React.ReactNode,
  canClear?: boolean,
  popupPosition?: PopupPosition;
  popupPositionMobile?: PopupPosition;
}

export function CalendarInterval(props: Props) {
  const {
    startDate,
    endDate,
    onSelectFirst,
    onSelectSecond,
    canClear = false,
    minDate,
    maxDate,
    additionalButton,
    popupPosition = PopupPosition.LEFT,
    popupPositionMobile
  } = props;

  const [pickerDate, setPickerDate] = useState<Date>(endDate ?? new Date());

  const [monthsIsOpen, setMonthsIsOpen] = useState<boolean>(false);
  const [monthsYearsIsOpen, setMonthsYearsIsOpen] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const refPopup = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(refPopup, () => {
    setIsOpen(false);
  }, buttonRef);

  const months = [
    `${calendarLogic.january['en']}`,
    `${calendarLogic.february['en']}`,
    `${calendarLogic.march['en']}`,
    `${calendarLogic.april['en']}`,
    `${calendarLogic.may['en']}`,
    `${calendarLogic.june['en']}`,
    `${calendarLogic.july['en']}`,
    `${calendarLogic.august['en']}`,
    `${calendarLogic.september['en']}`,
    `${calendarLogic.october['en']}`,
    `${calendarLogic.november['en']}`,
    `${calendarLogic.december['en']}`
  ];

  return (
    <Container ref={refPopup}>
      <Content ref={buttonRef} onClick={() => setIsOpen(true)}>
        <Text font="bodySmall" styles={css`margin: 12px 0 12px 12px;`}>
          {startDate && moment(startDate).format('DD.MM.YY')} - {endDate && moment(endDate).format('DD.MM.YY')}
        </Text>
        <CalendarIconContainer>
          <Image
            src={'/icons/baseUI/calendar/calendar.svg'}
            width={20}
            height={20}
            alt="partner image"
          />
        </CalendarIconContainer>
      </Content>
      <PopupContainer
        isOpen={isOpen}
        popupPosition={popupPosition}
        popupPositionMobile={popupPositionMobile}>
        <SelectedDatesContainer>
          <SelectedDateContent>
            {startDate ? moment(startDate).format(DateUtil.EUROPEAN_DATE_FORMAT) : ''}
          </SelectedDateContent>
          <ArrowY startPosition={1} />
          <SelectedDateContent>
            {endDate ? moment(endDate).format(DateUtil.EUROPEAN_DATE_FORMAT) : ''}
          </SelectedDateContent>
        </SelectedDatesContainer>
        <MonthYearSelectorContainer>
          <Text
            font="bodySmall"
            color={Color.BLUE}
            styles={css`cursor: pointer;`}
            onClick={() => {
              setMonthsYearsIsOpen(false);
              const datBeck = moment(pickerDate).subtract(1, 'month').toDate();
              setPickerDate(datBeck);
            }}
          >{calendarLogic.back['en']}</Text>
          <MonthYearDate onClick={() => setMonthsYearsIsOpen(prev => !prev)}>
            {months[moment(pickerDate).get('month')]} {moment(pickerDate).format('YYYY')} <ArrowX isOpen={monthsIsOpen}
                                                                                                  startPosition={1} />
          </MonthYearDate>
          <Text
            font="bodySmall"
            color={Color.BLUE}
            styles={css`cursor: pointer;`}
            onClick={() => {
              setMonthsYearsIsOpen(false);
              const datNext = moment(pickerDate).add(1, 'month').toDate();
              setPickerDate(datNext);
            }}
          >
            {calendarLogic.next['en']}</Text>
        </MonthYearSelectorContainer>
        <Line />

        {
          !monthsYearsIsOpen && <Dates
            minDate={minDate}
            maxDate={maxDate}
            pickerDate={pickerDate}
            setPickerDate={setPickerDate}
            selectedFirst={startDate}
            selectedSecond={endDate}
            onSelectFirst={(date: Date | null) => onSelectFirst(date)}
            onSelectSecond={(date: Date | null) => onSelectSecond(date)}
          />
        }
        {
          monthsYearsIsOpen && <MonthYearSwitcher
            maxDate={maxDate}
            minDate={minDate}
            pickerDate={pickerDate}
            setPickerDate={setPickerDate}
          />
        }
        <Buttons>
          <AdditionalButton>
            {additionalButton}
          </AdditionalButton>

          <SubmitButtons>
            {
              canClear && (
                <Text
                  font="bodySmall"
                  color={Color.DANGER}
                  styles={css`cursor: pointer;`}
                  onClick={() => {
                    if (monthsYearsIsOpen) {
                      return setMonthsYearsIsOpen(false);
                    }
                    setIsOpen(false);
                    onSelectFirst(null);
                    onSelectSecond(null);
                  }}
                >{calendarLogic.clear['en']}</Text>
              )
            }

            <Text
              font="bodySmall"
              styles={css`cursor: pointer;`}
              color={Color.SWAMPY}
              onClick={() => {
                if (monthsYearsIsOpen) {
                  return setMonthsYearsIsOpen(false);
                }
                setIsOpen(false);
              }}
            >Ок</Text>
          </SubmitButtons>
        </Buttons>
      </PopupContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  z-index: 1;
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  gap: 10px;
  width: 190px;
  height: 40px;
  border: 1px solid ${Color.GRAY_400};
  border-radius: 10px;
  cursor: pointer;
`;

const CalendarIconContainer = styled.div`
  width: 32px;
  height: 32px;
  background: #F1F4F4;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div<{
  isOpen: boolean,
  popupPosition: PopupPosition,
  popupPositionMobile?: PopupPosition
}>`
  position: absolute;
  transition: visibility 0.2s, opacity 0.2s, top 0.2s;
  pointer-events: ${({ isOpen }) => isOpen ? 'auto' : 'none'};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  top: ${({ isOpen }) => isOpen ? 'calc(100% + 5px)' : '100%'};
  width: 290px;
  background: #FFFFFF;
  box-shadow: 0px 4px 54px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 16px;

  ${({ popupPosition }) => {
    if (popupPosition === PopupPosition.RIGHT) return css`right: 0;`;
    if (popupPosition === PopupPosition.CENTER) return css`left: -25%;`;
    return css`left: 0;`;
  }};

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    ${({ popupPosition, popupPositionMobile }) => {
      if (!popupPositionMobile || popupPosition === popupPositionMobile) return;

      if (popupPositionMobile === PopupPosition.RIGHT) return css`
        right: 0;
        left: unset;
      `;
      if (popupPositionMobile === PopupPosition.CENTER) return css`
        left: -25%;
        right: unset;
      `;
      return css`
        left: 0;
        right: unset;
      `;
    }};
  }
`;

const SelectedDatesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 13px;
`;

const SelectedDateContent = styled.div`
  ${typography.bodySmall};
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 13px;
  gap: 10px;
  width: 126px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #D7D8DE;
  border-radius: 10px;
`;


const MonthYearSelectorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #D7D8DE;
  margin: 12px 0;
`;

const Buttons = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 26px;
`;

const AdditionalButton = styled.div`

`;

const SubmitButtons = styled.div`
  display: flex;
  gap: 26px;
`;

const MonthYearDate = styled.div`
  ${typography.bodySmall};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
`;

