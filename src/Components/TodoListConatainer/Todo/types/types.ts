import { IChecked, IRemove, ITitle, ITodo } from '../../../../Redux/slices/types/calendarTypes';

export interface IProps {
  isTodoInList: ITodo;
  title: ITitle;
  hadleRemoveTodo: (result: IRemove) => void;
  isChecked: (param: IChecked) => void;
  editTodo: (param: string, param2: string, title: ITitle) => void;
}

export type chosenSpan = 'name' | 'start' | 'end';
