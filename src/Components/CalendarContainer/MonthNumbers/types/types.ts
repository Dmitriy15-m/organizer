import { ITodo } from "../../../../Redux/slices/types/calendarTypes";


export interface INumbers {
    result: number[][];
    monthName: string;
    todoList: ITodo[];
    currentMonth: number;
    currentYear: number;
    onClickHandler: (params: ICallback) => void
  }
  
  export interface ICallback {
    index: number;
    number: number;
    element: number[];
  }