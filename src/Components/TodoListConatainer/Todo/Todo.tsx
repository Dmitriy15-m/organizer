import React, { useEffect, useRef, useState } from 'react';
import styles from './Todo.module.css';
import remove from '../../../img/icons8-close-window-24.png';
import { useAppSelector } from '../../../Redux/hooks';
import { chosenSpan, IProps } from './types/types';
import { getTodoStyle } from '../../../utils/calendarUtils';

const Todo: React.FC<IProps> = ({ isTodoInList, hadleRemoveTodo, isChecked, title, editTodo }) => {
  const [value, setValue] = useState('');
  const spanName = useRef<HTMLSpanElement>(null);
  const spanStart = useRef<HTMLSpanElement>(null);
  const spanEnd = useRef<HTMLSpanElement>(null);

  const time = useAppSelector((state) => state.calendarSlice.currentTime);

  const clickDate = useAppSelector((state) => state.calendarSlice.clickDate);
  const conditionTodo = getTodoStyle(styles, title, time, clickDate);

  function editHandler(ref: React.RefObject<HTMLSpanElement>, name: chosenSpan) {
    if (ref.current) editTodo(ref.current.innerText, name, title);
  }

  useEffect(() => {
    if (conditionTodo.indexOf('pastTime') != -1) {
      setValue('не выполнено');
    } else if (conditionTodo.indexOf('presentTime') != -1) {
      setValue('выполняется');
    } else if (conditionTodo.indexOf('featureTime') != -1) {
      setValue('запланировано');
    }
  }, [conditionTodo]);
  
  return (
    <div className={styles.todo_container}>
      <input
        className={styles.strikethrough}
        checked={title.isDone}
        onChange={() => isChecked({ isDone: !title.isDone, isTodoInList, title })}
        type="checkbox"
      />

      <div id="todo_info">
        <span
          className={styles.todo_name}
          ref={spanName}
          onDoubleClick={() => editHandler(spanName, 'name')}>
          {title.name + ' '}
        </span>
      </div>

      <div className={styles.time_block}>
        <span
          className={styles.todo_start}
          ref={spanStart}
          onDoubleClick={() => editHandler(spanStart, 'start')}>
          {title.start}
        </span>
        <span
          className={styles.todo_end}
          ref={spanEnd}
          onDoubleClick={() => editHandler(spanEnd, 'end')}>
          {title.end}
        </span>
      </div>

      {!title.isDone && (
        <div id={'conditionTodo'} className={conditionTodo}>
          <span>{value}</span>
        </div>
      )}

      <img
        className={styles.dellTodo}
        onClick={() => hadleRemoveTodo({ isTodoInList, title })}
        src={remove}
        alt="удалить дело"
      />
    </div>
  );
};

export default React.memo(Todo);
