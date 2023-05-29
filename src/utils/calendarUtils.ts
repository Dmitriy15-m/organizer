import { IClickDate, ITitle, ITodo } from '../Redux/slices/types/calendarTypes';
import { calendarStyles, todoStyle } from './types/types';

export function getLastDay(year: number, month: number) {
  const date = new Date(year, month + 1, 0);

  return date.getDate();
}

export function getWeekDay() {
  const date = new Date();
  const weekDay = date.getDay();

  if (weekDay) {
    return weekDay - 1;
  } else {
    return 6;
  }
}

function getRangeLastDaysPrevMonth(year: number, month: number) {
  const arr = [];
  const date = new Date(year, month, 0);
  const lastDay = date.getDay();

  const lastNumber = date.getDate();
  const firsNumber = lastNumber - (lastDay - 1);
  for (let i = firsNumber; i <= lastNumber; i++) {
    arr.push(i);
  }
  return arr;
}

function getRangeFirstDaysNextMonth(lastMonthNum: number) {
  const arr = [];
  const staticNum = 42;
  const diff = staticNum - lastMonthNum;

  for (let i = 1; i <= diff; i++) {
    arr.push(i);
  }
  return arr;
}

function createCalendarNums(num: number) {
  const arr = [];

  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
}

export function getResultArr(year: number, month: number, lastDay: number) {
  const mainArr = [];

  const arrLeft = getRangeLastDaysPrevMonth(year, month);
  const numbers = createCalendarNums(lastDay);

  const prevNumsAndMainNums = arrLeft.concat(numbers);
  const arrRight = getRangeFirstDaysNextMonth(prevNumsAndMainNums.length);
  const finishedNums = arrLeft.concat(numbers, arrRight);

  for (let i = 0; i < 6; i++) {
    const sub = [];

    for (let j = 0; j <= 6; j++) {
      const value = finishedNums.splice(0, 1);
      sub.push(...value);
    }
    mainArr.push(sub);
  }
  return mainArr;
}

export function getNumsStyles(
  styles: calendarStyles,
  isOtherDays: boolean,
  isRestDays: boolean,
  isCurrentMonth: boolean,
  isCurrentYear: boolean,
  isCurrentDate: boolean,
  todo: boolean,
) {
  const classes1_td = isOtherDays
    ? styles.calendar__td // добавить стиль для числа
    : isCurrentDate && isCurrentMonth && isCurrentYear
    ? styles.calendar__td_duringDay // добавить стиль текущего дня
    : todo
    ? `${styles.calendar__td} + ${styles.calendar__todosDays}` //текущий день + стиль , где есть дело
    : styles.calendar__td;

  const classes1_span = isOtherDays
    ? styles.calendar__span_otherDays
    : isCurrentDate && isCurrentMonth && isCurrentYear
    ? styles.calendar__span_duringDay
    : '';

  const classes2_td =
    isCurrentDate && isCurrentMonth && isCurrentYear
      ? styles.calendar__td_duringDay
      : todo
      ? `${styles.calendar__td} + ${styles.calendar__todosDays}`
      : styles.calendar__td;

  const classes2_span =
    isCurrentDate && isCurrentMonth && isCurrentYear ? styles.calendar__span_duringDay : '';

  const restDayRedColor =
    isCurrentDate && isRestDays && todo
      ? styles.restAndTodos
      : isCurrentDate && !isRestDays && todo
      ? styles.restAndTodos
      : isRestDays && todo
      ? styles.calendar__span_duringDay
      : isRestDays
      ? styles.red
      : '';

  return { classes1_td, classes1_span, classes2_td, classes2_span, restDayRedColor };
}

export function getConditions(
  number: number,
  index: number,
  element: number[],
  result: number[][],
  currentMonth: number,
  currentYear: number,
) {
  const isOtherDays =
    (number > 20 && element == result[0]) || //отрисовка 0 4 5 массива черным бордером или синим днем
    (number < 13 && element == result[4]) ||
    (number < 13 && element == result[5]);

  const isIncludesArrs = element == result[0] || element == result[4] || element == result[5];

  const isRestDays = index === 5 || index === 6;
  const isCurrentDate = number === new Date().getDate();
  const isCurrentMonth = currentMonth === new Date().getMonth();
  const isCurrentYear = currentYear === new Date().getFullYear();

  return { isOtherDays, isIncludesArrs, isRestDays, isCurrentMonth, isCurrentYear, isCurrentDate };
}

export function checkTodo(
  todoList: ITodo[],
  duringYear: number,
  duringMonth: number,
  number: number,
) {
  const todo = todoList.find(
    ({ year, month, weekNum }) =>
      year === duringYear && month === duringMonth && weekNum === number,
  );
  const isTodo = Boolean(todo);

  return isTodo;
}

export function getCurrentTime() {
  const date = new Date();

  let hours = null;
  let min = null;

  if (date.getHours() < 10) {
    hours = '0' + date.getHours();
  } else {
    hours = date.getHours();
  }

  if (date.getMinutes() < 10) {
    min = '0' + date.getMinutes();
  } else {
    min = date.getMinutes();
  }

  const currentTime = hours + ':' + min;

  return currentTime;
}

export function getTodoStyle(
  styles: todoStyle,
  title: ITitle,
  time: string,
  clickDate: IClickDate,
) {
  const date = new Date();

  const isPastTime = time > title.end;
  const isCurrentTime = time >= title.start && time <= title.end;
  const isFeatureTime = time < title.start;

  const isPastDatePrevYear = clickDate.currentYear < date.getFullYear();
  const isPastDateCurrentYear =
    clickDate.currentYear == date.getFullYear() && clickDate.currentMonth < date.getMonth();

  const isCurrentDateCurrentYear =
    clickDate.currentYear == date.getFullYear() &&
    clickDate.currentMonth == date.getMonth() &&
    clickDate.weekNum == date.getDate();

  const isCurrentDayLess =
    clickDate.currentYear == date.getFullYear() &&
    clickDate.currentMonth == date.getMonth() &&
    clickDate.weekNum < date.getDate();

  const todoStyle = isCurrentDayLess
    ? styles.pastTime
    : isCurrentDateCurrentYear && isCurrentTime
    ? styles.presentTime
    : isCurrentDateCurrentYear && isPastTime
    ? styles.pastTime
    : isCurrentDateCurrentYear && isFeatureTime
    ? styles.featureTime
    : isPastDateCurrentYear
    ? styles.pastTime
    : isPastDatePrevYear
    ? styles.pastTime
    : styles.featureTime;

  return todoStyle;
}

export function getCurrMonth() {
  const date = new Date();

  let currentMonth = date.getMonth();
  return currentMonth;
}

export function getCurrYear() {
  const date = new Date();

  let currentYear = date.getFullYear();
  return currentYear;
}
