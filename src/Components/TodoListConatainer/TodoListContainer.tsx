import React, { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { changeChecked, removeTodo } from '../../Redux/slices/calendarSlice';
import { IChecked, IRemove } from '../../Redux/slices/types/calendarTypes';
import Header from './Header/Header';
import TodoForm from './TodoForm/TodoForm';
import TodoList from './TodoList/TodoList';
import styles from './TodoListContainer.module.css';

const TodoListContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { days, clickDate, todoList } = useAppSelector((state) => state.calendarSlice);

  const isTodoInList = todoList.find(
    ({ month, weekNum, year }) =>
      month === clickDate.currentMonth &&
      weekNum === clickDate.weekNum &&
      year === clickDate.currentYear,
  );

  function hadleRemoveTodo(result: IRemove) {
    dispatch(removeTodo(result));
  }

  function isChecked(param: IChecked) {
    dispatch(changeChecked(param));
  }

  return (
    <div className={styles.block}>
      <div className={styles.block__content}>
        <Header days={days} {...clickDate} />
        <TodoForm/>
        <TodoList
          isTodoInList={isTodoInList}
          hadleRemoveTodo={hadleRemoveTodo}
          isChecked={isChecked}
        />
      </div>
    </div>
  );
};

export default TodoListContainer;
