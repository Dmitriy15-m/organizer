import React, { useRef, ChangeEvent, KeyboardEvent, useState, useCallback } from 'react';
import { ITitle } from '../../../Redux/slices/types/calendarTypes';
import Todo from '../Todo/Todo';
import { nanoid } from 'nanoid';
import { useAppDispatch, useInput } from '../../../Redux/hooks';
import { editTodoItem } from '../../../Redux/slices/calendarSlice';
import styles from './TodoList.module.css';
import { IProps } from './types/types';

const TodoList: React.FC<IProps> = ({ isTodoInList, hadleRemoveTodo, isChecked }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useInput<boolean>(false);
  const [firstValue, setFirstVal] = useInput<string>('');
  const [edit, setEdit] = useInput<string>(''); //use custom hook
  const [nameTodo, setNameTodo] = useInput<string>('');
  const [duringTitle, setDuringTitle] = useInput<ITitle>({
    id: '',
    isDone: false,
    name: '',
    start: '',
    end: '',
  });
  const editInput = useRef<HTMLInputElement>(null);


  const editTodo = useCallback((editTodo: string, nameTodo: string, title: ITitle) =>{
      setValue(true);
      setEdit(editTodo);
      setNameTodo(nameTodo);
      setDuringTitle(title);
      setFirstVal(editTodo);
      if (editInput.current) editInput.current.focus();
    }, [])

  function inputOnChange(e: ChangeEvent<HTMLInputElement>) {
    setEdit(e.target.value);
  }

  function pressKeyHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.code === 'Enter') {
      setNameTodo('');
      setValue(false);
      dispatch(editTodoItem({ edit, firstValue, nameTodo, isTodoInList, duringTitle }));
    }
  }
  function blurHandler() {
    setNameTodo('');
    setValue(false);
    dispatch(editTodoItem({ edit, firstValue, nameTodo, isTodoInList, duringTitle }));
  }

  return (
    <div className={styles.list_container}>
      <input
        id="input"
        className={value ? '' : styles.editInput}
        onKeyDown={pressKeyHandler}
        onBlur={blurHandler}
        ref={editInput}
        value={edit}
        onChange={inputOnChange}
        type="text"
      />
      {isTodoInList?.todos.map((title: ITitle) => (
        <Todo
          key={title.id}
          isTodoInList={isTodoInList}
          hadleRemoveTodo={hadleRemoveTodo}
          isChecked={isChecked}
          title={title}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
