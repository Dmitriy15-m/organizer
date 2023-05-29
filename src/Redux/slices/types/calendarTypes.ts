export interface IEdit {
    firstValue: string;
    edit: string;
    nameTodo: string;
    isTodoInList: ITodo | undefined;
    duringTitle: ITitle;
  }
  export interface IAdd {
    id: string;
    name: string;
    start: string;
    end: string;
    isDone: boolean;
  }
  
  export interface IRemove {
    isTodoInList: ITodo;
    title: ITitle;
  }
  
  export interface IChecked {
    isDone: boolean;
    isTodoInList: ITodo;
    title: ITitle;
  }
  
  export type ITitle = {
    id: string;
    isDone: boolean;
    name: string;
    start: string;
    end: string;
  };
  
  export interface ITodo {
    month: number;
    year: number;
    weekNum: number;
    todos: ITitle[];
  }
  
  export interface IClickDate {
    currentMonth: number;
    currentYear: number;
    monthName: string;
    weekDay: number;
    weekNum: number;
  }
  
  export interface ICalendar {
    currentYear: number;
    currentMonth: number;
    days: string[];
    months: string[];
    clickDate: IClickDate;
    todoList: ITodo[];
    currentTime: string;
  }
  