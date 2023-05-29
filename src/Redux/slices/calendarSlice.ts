import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { getCurrentTime, getCurrMonth, getCurrYear,  } from '../../utils/calendarUtils';
import { IAdd, ICalendar, IChecked, IClickDate, IEdit, IRemove } from './types/calendarTypes';

const initialState: ICalendar = {
  currentYear: getCurrYear(),
  currentMonth: getCurrMonth(),
  days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  clickDate: {
    currentMonth: 0,
    monthName: '',
    currentYear: 0,
    weekDay: 0,
    weekNum: 0,
  },
  todoList: [
  ],
  currentTime: getCurrentTime(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onArrowBack(state) {
      if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear = state.currentYear - 1;
      } else {
        state.currentMonth = state.currentMonth - 1;
      }
    },
    onArrowForward(state) {
      if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear = state.currentYear + 1;
      } else {
        state.currentMonth = state.currentMonth + 1;
      }
    },
    setCurrentTime(state, actions: PayloadAction<string>) {
      state.currentTime = actions.payload;
    },
    setClickDate(state, actions: PayloadAction<IClickDate>) {
      state.clickDate = actions.payload;
    },
    addTodo(state, actions: PayloadAction<IAdd>) {
      const {id, name, start, end, isDone } = actions.payload;
      state.currentTime = getCurrentTime();

      state.todoList.map(({ month, year, weekNum, todos }) => {
        if (
          month === state.clickDate.currentMonth &&
          year === state.clickDate.currentYear &&
          weekNum === state.clickDate.weekNum
        ) {
          const result = todos.find(
            (todo) => todo.start === actions.payload.start || todo.end === actions.payload.end,
          );

          if (result) {
            alert('У Вас запланировано другое дело на это время!');
          }
          else {
            todos.push({id, name, start, end, isDone });
          }
        }
      });


      if (!state.todoList.length) {
        state.todoList.push({
         
          month: state.clickDate.currentMonth,
          year: state.clickDate.currentYear,
          weekNum: state.clickDate.weekNum,
          todos: [{id, name, start, end, isDone }],
        });
      } else {
        let result = state.todoList.find(
          ({ month, year, weekNum }) =>
            month === state.clickDate.currentMonth &&
            year === state.clickDate.currentYear &&
            weekNum === state.clickDate.weekNum,
        );

        if (!result) {
          state.todoList.push({
          
            month: state.clickDate.currentMonth,
            year: state.clickDate.currentYear,
            weekNum: state.clickDate.weekNum,
            todos: [{id, name, start, end, isDone }],
          });
        }
      }
    },

    removeTodo(state, actions: PayloadAction<IRemove>) {
      const { isTodoInList, title } = actions.payload;

      state.todoList.map((obj) => {
        if (
          obj.year === isTodoInList.year &&
          obj.month === isTodoInList.month &&
          obj.weekNum === isTodoInList.weekNum
        ) {
          obj.todos = obj.todos.filter(
            (todo) =>
              todo.name !== title.name && todo.start !== title.start && todo.end !== title.end,
          );
        }
      });

      state.todoList = state.todoList.filter((obj) => obj.todos.length > 0);
    },
    changeChecked(state, actions: PayloadAction<IChecked>) {
      const { isTodoInList, isDone, title } = actions.payload;
      state.todoList.map((obj) => {
        if (
          obj.year === isTodoInList.year &&
          obj.month === isTodoInList.month &&
          obj.weekNum === isTodoInList.weekNum
        ) {
          obj.todos.map((todo) => {
            if (todo.name === title.name && todo.start === title.start && todo.end === title.end) {
              todo.isDone = isDone;
            }
          });
        }
      });
    },
    editTodoItem(state, actions: PayloadAction<IEdit>) {
      const { edit, firstValue, nameTodo, isTodoInList, duringTitle } = actions.payload;

      state.todoList.map((obj) => {
        if (
          obj.year === isTodoInList?.year &&
          obj.month === isTodoInList.month &&
          obj.weekNum === isTodoInList.weekNum
        ) {
          obj.todos.map((todo) => {
            if (
              todo.name === duringTitle.name &&
              todo.start === duringTitle.start &&
              todo.end === duringTitle.end
            ) {
              if (nameTodo === 'name' && edit != '') {
                todo.name = edit;
              } else if (nameTodo === 'name' && edit == '') {
                todo.name = firstValue;
              }
              if (nameTodo === 'start' && edit != '') {
                todo.start = edit;
              } else if (nameTodo === 'start' && edit == '') {
                todo.start = firstValue;
              }
              if (nameTodo === 'end' && edit != '') {
                todo.end = edit;
              } else if (nameTodo === 'end' && edit == '') {
                todo.end = firstValue;
              }
            }
          });
        }
      });
    },
  },
});

export const {
  setClickDate,
  addTodo,
  removeTodo,
  changeChecked,
  editTodoItem,
  setCurrentTime,
  onArrowBack,
  onArrowForward,
} = calendarSlice.actions;
export default calendarSlice.reducer;
