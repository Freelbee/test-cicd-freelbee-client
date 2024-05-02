import React from 'react';
import styled, {css} from "styled-components";
import { Color, Text, typography } from '@freelbee/shared/ui-kit';
import moment, {Moment} from 'moment';
import { calendarLogic } from './calendarLogic';

type Day = {
    num: number,
    day: number,
    current: boolean,
    disabled: boolean,
    isHide: boolean,
    date: Moment,
};

type Props = {
    disabledTo?: Date,
    disabledFrom?: Date,
    selectedFirst?: Date,
    selectedSecond?: Date,
    onSelectFirst: (date: Date | null) => void,
    onSelectSecond?: (date: Date | null) => void,
    setPickerDate: React.Dispatch<React.SetStateAction<Date>>;
    pickerDate: Date;
    minDate?: Date,
    maxDate?: Date,
};

export function Dates (props: Props)
{
    const {pickerDate,
        disabledTo,
        disabledFrom,
        onSelectFirst,
        onSelectSecond,
        selectedFirst,
        selectedSecond,
        minDate,
        maxDate
    } = props;


    const daysOfWeek = [
        `${calendarLogic.mon['en']}`,
        `${calendarLogic.tue['en']}`,
        `${calendarLogic.wed['en']}`,
        `${calendarLogic.thu['en']}`,
        `${calendarLogic.fri['en']}`,
        `${calendarLogic.sat['en']}`,
        `${calendarLogic.sun['en']}`,
    ];

    const getDays = (pickerDate: Date) : Day[] => {
        const days : Day[] = [];
        // pickerDate.getFullYear(), pickerDate.getMonth(), 1
        const firstDateOfMonth = moment(pickerDate).startOf(`month`);

        for(let i = firstDateOfMonth.isoWeekday() - 1; i >= 1 ; i--) {
            const day = parseInt(
                moment(firstDateOfMonth).subtract(i, `day`).format(`D`),
                10
            );
            days.push({
                num: day,
                current: false,
                disabled: true,
                isHide: true,
                day: moment(firstDateOfMonth).subtract(i, `day`).isoWeekday(),
                date: moment(firstDateOfMonth).clone().day(day),
            });
        }

        for(let i = 1; i <= moment(pickerDate).daysInMonth(); i++) {
            const date = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), i);
            const dateFormatted = moment(date).format(`YYYY-MM-DD`);
            const disabled = (disabledTo ? moment(disabledTo).isAfter(date) : false) || (
                disabledFrom ? moment(disabledFrom).isBefore(date) : false
            );

            days.push({
                num: i,
                disabled: disabled,
                current: (moment().format(`YYYY-MM-DD`) === dateFormatted),
                isHide: (!!minDate && moment(minDate).subtract(1, 'day').isAfter(date, 'day')) || (!!maxDate && moment(maxDate).add(1, 'day').isBefore(date, 'day')),
                day: moment(date).isoWeekday(),
                date: moment(date),
            });
        }
        if(days.length % 7 > 0) {
            for(let i = 1; i <= days.length % 7; i++) {
                days.push({
                    num: i,
                    disabled: true,
                    current: false,
                    isHide: true,
                    day: moment(firstDateOfMonth).add(i, `day`).isoWeekday(),
                    date: moment(firstDateOfMonth).add(i, `day`),
                });
            }
        }
        return days;
    };


    const getDayColor = (day: Day) => {
        if(!selectedSecond || !selectedFirst) return `transparent`;
        if(day.disabled || (day.day === 0 || day.day === 1)) return "transparent";
        const date = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), day.num);
        if(date > selectedFirst && date < selectedSecond) return `#E5FFF2`;

        return `transparent`;
    };

    const dayIsSelected = (day: Day) => {
        const date = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), day.num);
        const dateMoment = moment(date).format('DD.MM.YY');
        const selectedFirstMoment = moment(selectedFirst).format('DD.MM.YY');
        const selectedSecondMoment = selectedSecond ? moment(selectedSecond).format('DD.MM.YY') : undefined;

        return (dateMoment === selectedFirstMoment || dateMoment === selectedSecondMoment);
    };

    const dayIsBetween = (day: Day) => onSelectSecond ?
        moment(day.date).isBetween(selectedFirst, selectedSecond, 'day', '[]') : false;

    const select = (day: number, pickerDate: Date) => {
        const date = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), day, 0, 0, 0, 0);
        if(onSelectSecond) {
            handleIntervalSelect(date);
        } else {
            onSelectFirst(date);
        }
    };

    const handleIntervalSelect = (date: Date) => {
        if(!onSelectSecond) return;

        if(selectedFirst && (selectedFirst.getTime() > date.getTime()) && !selectedSecond) {
            onSelectSecond(selectedFirst);
            onSelectFirst(date);
            return;
        }
        if(selectedFirst === null) {
            onSelectFirst(date);
        } else if(selectedSecond === null) {
            onSelectSecond(date);
        } else{
            onSelectFirst(date);
            onSelectSecond(null);
        }
    };

    const handleDaySelect = (day: Day) => {
        if (!day.disabled) {
            select(day.num, pickerDate);
        }
    };

    return (

        <Container >
            <DaysOfWeek>
                {
                    daysOfWeek.map((dayOfWeek, index) => (
                        <Text font='bodySmall' key={`W_${index}`} >{ dayOfWeek.toUpperCase() }</Text>
                    ))
                }
            </DaysOfWeek>
            <Days>
                {
                    getDays(pickerDate).map((day, index) => (
                        <DayContainer
                            isHide={day.isHide}
                            color={getDayColor(day)}
                            key={index}
                            onClick={() => !day.disabled && handleDaySelect(day)}
                        >
                            {
                                !day.disabled &&
								<DayContent
								    $left={(day.day === 0 || day.date.isSame(selectedSecond)) && !!selectedFirst && !moment(selectedFirst).isSame(selectedSecond)}
								    $right={(day.day === 1 || day.date.isSame(selectedFirst)) && !!selectedSecond && !moment(selectedFirst).isSame(selectedSecond)}
								    isSelected={dayIsBetween(day) || dayIsSelected(day)}
								>
								    <DayText
								        $isBetween={dayIsBetween(day)}
									    isSelected={dayIsSelected(day)}
								        $left={dayIsBetween(day) && day.day === 1 && !dayIsSelected(day)}
								        $right={dayIsBetween(day) && day.day === 0 && !dayIsSelected(day)}
								    >{day.num}</DayText>
								</DayContent>
                            }
                        </DayContainer>

                    ))
                }
            </Days>
        </Container>

    );
}


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;


const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 20px);
  grid-auto-rows: 20px;
  gap: 7px;
  justify-content: space-between;
  height: 40px;
  width: 100%;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  grid-auto-rows: 20px;
  gap: 15px 0;
`;
const DayContainer = styled.div<{isHide: boolean, color: string}>`
  position: relative;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s background-color;
  color: ${Color.GRAY_800};
  pointer-events: ${props => props.isHide ? 'none' : 'auto'};
  opacity: ${props => props.isHide ? '0.5' : '1'};
  background: ${props => props.color};
`;

const DayContent = styled.div<{$right: boolean, $left:boolean, isSelected: boolean}>`
	width: 100%;
  	height: 100%;
  	display: flex;
  	justify-content: center;
  	align-items: center;
    position: relative;

  ${props => props.isSelected && props.$left &&
          css`
            &:before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 20px;
              height: 100%;
              background: #E5FFF2;
            }
          `}
  ${props => props.isSelected && props.$right &&
          css`
            &:after {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              width: 20px;
              height: 100%;
              background: #E5FFF2;

            }
          `}


`;
const DayText = styled.div<{ isSelected: boolean, $isBetween: boolean, $right: boolean, $left: boolean }>`
  position: relative;
  z-index: 1;
  ${typography.bodySmall};
  font-size: 13px;
  font-weight: 400;
  color: ${Color.GRAY_800};
  height: 20px;
  width: 20px;
  background: ${props => props.isSelected ? `#B2FFD8` : props.$isBetween ? `#E5FFF2` : `transparent`};
  border-radius: ${props => props.isSelected ? `5px` : `0`};

  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.$right &&
          css`
            border-radius: 0 5px 5px 0;
          `}
  ${props => props.$left &&
          css`
            border-radius: 5px 0 0 5px;
          `}
`;
