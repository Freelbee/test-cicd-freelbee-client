import React from "react";
import styled, {css} from "styled-components";

import moment from "moment";
import { calendarLogic } from './calendarLogic';
import { Color, typography } from '@freelbee/shared/ui-kit';

interface Props {
    setPickerDate: React.Dispatch<React.SetStateAction<Date>>;
    pickerDate: Date;
    minDate?: Date,
    maxDate?: Date,
}

export function MonthYearSwitcher (props: Props) {
    const {setPickerDate, pickerDate, minDate = new Date("1930.01.01"), maxDate = new Date(new Date().getFullYear() + 10, 1, 1)} = props;

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
        `${calendarLogic.december['en']}`,
    ];

    return (
        <Container>
            <ScrollBlock>
                {
                    months.map((month, index) => (
                        <DateText
                            isDisabled={
                                (!!minDate && moment(minDate).isAfter(moment(pickerDate).clone().month(index), 'month')) ||
                                !!maxDate && moment(maxDate).isBefore(moment(pickerDate).clone().month(index), 'month')
                            }
                            onClick={() => {
                                const datNow = moment(pickerDate).clone().toDate();
                                datNow.setMonth(index);
                                setPickerDate(datNow);
                            }}
                            isSelected={pickerDate.getMonth() === index}
                            key={index}
                        >
                            {month}
                        </DateText>
                    ))
                }
            </ScrollBlock>
            <ScrollBlock>
                {
                    Array.from({length: maxDate.getFullYear() - minDate.getFullYear() + 1}, (_, i) => i + minDate.getFullYear()).map((year, index) => (
                        <DateText
                            isDisabled={
							    !!minDate && minDate.getFullYear() > year || !!maxDate && maxDate.getFullYear() < year
                            }
                            onClick={() => {
                                const datNow = moment(pickerDate).clone().toDate();
                                datNow.setFullYear(year);
                                if(datNow > maxDate) datNow.setMonth(maxDate.getMonth());
                                if(datNow < minDate) datNow.setMonth(minDate.getMonth());

                                setPickerDate(datNow);
                            }}
                            isSelected={pickerDate.getFullYear() === year}
                            key={index}
                        >
                            {year}
                        </DateText>
                    ))
                }
            </ScrollBlock>
        </Container>
    );
}


const Container = styled.div`
  position: relative;
  padding: 0 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  grid-gap: 14px;
`;

const ScrollBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */
  max-height: 220px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
	width: 0;
  }
`;

const DateText	= styled.div<{isSelected: boolean, isDisabled: boolean}>`
  cursor: pointer;
  ${typography.bodySmall};
  line-height: 150%;
  color: ${Color.GRAY_800};
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 30px;
  width: 100%;

  ${props => props.isDisabled && css`
	  pointer-events: none;
	  opacity: 0.3;
  `}

  ${props => props.isSelected && css`
  	  background: #F1F4F4;
  `}

  a:hover {
    background: #F1F4F4;
  }
`;
