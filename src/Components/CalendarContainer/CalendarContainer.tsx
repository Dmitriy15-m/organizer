import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  onArrowBack,
  onArrowForward,
  setClickDate,
  setCurrentTime,
} from '../../Redux/slices/calendarSlice';

import { getResultArr, getLastDay, getCurrentTime, getConditions } from '../../utils/calendarUtils';
import styles from './Calendar.module.css';
import ChangeMonth from './ChangeMonth/ChangeMonth';
import Days from './MonthDays/Days';
import Numbers from './MonthNumbers/Numbers';
import { ICallback } from './MonthNumbers/types/types';

const CalendarContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentYear, currentMonth, days, months, todoList } = useAppSelector(
    (state) => state.calendarSlice,
  );

  const lastDay = getLastDay(currentYear, currentMonth);
  const calendarArr = getResultArr(currentYear, currentMonth, lastDay);

  const monthName = months[currentMonth];

  function handlerBack() {
    dispatch(onArrowBack());
  } // ChangeMonthHandler

  function handlerForward() {
    dispatch(onArrowForward());
  } // ChangeMonthHandler

  function onClickHandler(params: ICallback) {
    const { index, number, element } = params;

    const { isOtherDays } = getConditions(
      number,
      index,
      element,
      calendarArr,
      currentMonth,
      currentYear,
    );

    if (isOtherDays) return;

    const obj = {
      currentMonth,
      monthName,
      currentYear,
      weekDay: index,
      weekNum: number,
    };
    dispatch(setCurrentTime(getCurrentTime()));
    dispatch(setClickDate(obj));
    navigate('/TodoList');
  } // NumbersHandler

  const dayseMemo = useMemo(() => {
    return days; // useMemo не обязательно т.к маленький компонент
  }, []);

  return (
    <div className={styles.calendar}>
      <ChangeMonth
        monthName={monthName}
        year={currentYear}
        handlerBack={handlerBack}
        handlerForward={handlerForward}
      />
      <table className={styles.table}>
        <Days days={dayseMemo} />
        <Numbers
          result={calendarArr}
          monthName={monthName}
          todoList={todoList}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onClickHandler={onClickHandler}
        />
      </table>
    </div>
  );
};

export default CalendarContainer;
