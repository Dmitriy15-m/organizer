import React from 'react';
import { nanoid } from 'nanoid';
import styles from './Numbers.module.css';
import { INumbers } from './types/types';
import { getNumsStyles, getConditions, checkTodo } from '../../../utils/calendarUtils';

const Numbers: React.FC<INumbers> = ({
  result,
  todoList,
  currentMonth,
  currentYear,
  onClickHandler,
}) => {
  const calendar = result.map((element) => (
    <tr key={nanoid()}>
      {element.map((number, index) => {
        const isTodo = checkTodo(todoList, currentYear, currentMonth, number); // проверяем наличие todo для отрисовки стилей , необходим для getStyles

        const { isOtherDays, isIncludesArrs, isRestDays, isCurrentMonth, isCurrentYear, isCurrentDate } =
          getConditions(number, index, element, result, currentMonth, currentYear); // много условий для получения значения переменной, вынес отдельно

        const { classes1_td, classes1_span, classes2_td, classes2_span, restDayRedColor } =
          getNumsStyles(
            styles, // передаю обЪект стилей
            isOtherDays,
            isRestDays,
            isCurrentMonth,
            isCurrentYear,
            isCurrentDate,
            isTodo,
          ); // много условий для получения значения переменной, вынес отдельно

        return isIncludesArrs ? (
          <td
            key={nanoid()}
            className={classes1_td}
            onClick={() => onClickHandler({ index, number, element })}>
            <span className={`${classes1_span} + ${restDayRedColor}`}>{number}</span>
          </td>
        ) : (
          <td
            key={nanoid()}
            className={classes2_td}
            onClick={() => onClickHandler({ index, number, element })}>
            <span className={`${classes2_span} + ${restDayRedColor}`}>{number}</span>
          </td>
        );
      })}
    </tr>
  ));

  return <tbody>{calendar}</tbody>;
};

export default Numbers;
