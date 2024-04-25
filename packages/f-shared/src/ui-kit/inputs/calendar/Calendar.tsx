import React, { useId, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { useOnClickOutside } from '@freelbee/shared/hooks';
import { calendarLogic } from './calendarLogic';
import { Breakpoint, Color, mediaBreakpointDown, Text, typography } from '@freelbee/shared/ui-kit';
import { Label } from '../self-utils/label';
import { ReactComponent as CalendarIcon } from '@freelbee/assets/icons/calendar/calendar.svg';
import { PopupPosition } from './CalendarInterval';
import { Dates } from './Dates';
import { MonthYearSwitcher } from './MonthYearSwitcher';

interface Props {
  selectedDate?: Date;
  onSelect: (date: Date | null) => void,
  minDate?: Date,
  maxDate?: Date,
  additionalButton?: React.ReactNode,
  canClear?: boolean,
  popupPosition?: PopupPosition;
  popupPositionMobile?: PopupPosition;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export function Calendar(props: Props) {
  const {
    selectedDate,
    onSelect,
    canClear = false,
    minDate,
    maxDate,
    additionalButton,
    popupPosition = PopupPosition.LEFT,
    popupPositionMobile,
    label,
    isRequired,
    placeholder = 'dd.mm.yyyy'
  } = props;

  const [pickerDate, setPickerDate] = useState<Date>(selectedDate ?? new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [monthsYearsIsOpen, setMonthsYearsIsOpen] = useState<boolean>(false);

  const id = useId();

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
      {label &&
        <Label forInput={id} isRequired={isRequired} label={label} />}
      <Content ref={buttonRef} onClick={() => setIsOpen(prev => !prev)}>
        <Text
          font="body"
          styles={css`margin: 12px 0 12px 12px;`}
          color={selectedDate ? Color.GRAY_800 : Color.GRAY_500}>
          {selectedDate ? moment(selectedDate).format('DD.MM.YYYY') : placeholder}
        </Text>
        <CalendarIconContainer>
          <CalendarIcon />
        </CalendarIconContainer>
      </Content>
      <PopupContainer
        $isOpen={isOpen}
        $popupPosition={popupPosition}
        $popupPositionMobile={popupPositionMobile}>
        <MonthYearSelectorContainer>
          <Text
            font="bodySmall"
            color={Color.BLUE}
            styles={css`cursor: pointer;`}
            onClick={() => {
              setMonthsYearsIsOpen(false);
              const datePrev = moment(pickerDate).subtract(1, 'month').toDate();
              setPickerDate(datePrev);
            }}
          >{calendarLogic.back['en']}</Text>
          <MonthYearDate onClick={() => setMonthsYearsIsOpen(prev => !prev)}>
            {months[moment(pickerDate).get('month')]} {moment(pickerDate).format('YYYY')}
            <ArrowX isOpen={monthsYearsIsOpen} startPosition={1} />
          </MonthYearDate>
          <Text
            font="bodySmall"
            color={Color.BLUE}
            styles={css`cursor: pointer;`}
            onClick={() => {
              setMonthsYearsIsOpen(false);
              const dateNext = moment(pickerDate).add(1, 'month').toDate();
              setPickerDate(dateNext);
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
            selectedFirst={selectedDate}
            onSelectFirst={(date: Date | null) => onSelect(date)}
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
                    onSelect(null);
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
  display: grid;
  gap: 8px;
  width: fit-content;
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  gap: 10px;
  width: 170px;
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

  svg {
    width: 20px;
    height: 20px;
    stroke: ${Color.GRAY_600};
  }
`;

const PopupContainer = styled.div<{
  $isOpen: boolean,
  $popupPosition: PopupPosition,
  $popupPositionMobile?: PopupPosition
}>`
  position: absolute;
  transition: visibility 0.2s, opacity 0.2s, top 0.2s;
  pointer-events: ${({ $isOpen }) => $isOpen ? 'auto' : 'none'};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  top: ${({ $isOpen }) => $isOpen ? 'calc(100% + 5px)' : '100%'};
  width: 290px;
  background: #FFFFFF;
  box-shadow: 0px 4px 54px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 16px;

  ${({ $popupPosition }) => {
    if ($popupPosition === PopupPosition.RIGHT) return css`right: 0;`;
    if ($popupPosition === PopupPosition.CENTER) return css`left: -25%;`;
    return css`left: 0;`;
  }};

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    ${({ $popupPosition, $popupPositionMobile }) => {
      if (!$popupPositionMobile || $popupPosition === $popupPositionMobile) return;

      if ($popupPositionMobile === PopupPosition.RIGHT) return css`
        right: 0;
        left: unset;
      `;
      if ($popupPositionMobile === PopupPosition.CENTER) return css`
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

const MonthYearSelectorContainer = styled.div`
  margin-top: 20px;
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
  padding-top: 12px;
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

const ArrowX = styled.div<{isOpen: boolean, startPosition: number}>`
  background: url("../../../assets/icons/arrow-icons/arrow_down.svg") center center no-repeat;
  transform: scaleY(${({ isOpen, startPosition }) => isOpen ? startPosition * -1 : startPosition});
  width: 14px;
  height: 14px;
  transition: transform 0.5s;
`;
