import { IChecked, IRemove, ITodo } from '../../../../Redux/slices/types/calendarTypes';

export type IProps = {
  isTodoInList: ITodo | undefined;
  hadleRemoveTodo: (result: IRemove) => void;
  isChecked: (props: IChecked) => void;
};
