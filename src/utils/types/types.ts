import { type } from 'os';
import calendarStyles from '../../Components/CalendarContainer/MonthNumbers/Numbers.module.css'
import todoStyles from '../../Components/TodoListConatainer/Todo/Todo.module.css'

export type calendarStyles = typeof calendarStyles; // сделал типизацию обЪекта styles
export type todoStyle = typeof todoStyles