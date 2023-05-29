import React, { useState } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import { IClickDate } from '../../../Redux/slices/types/calendarTypes';
import { addTodo } from '../../../Redux/slices/calendarSlice';
import AddTodo from '../AddTodo/AddTodo';
import styles from './TodoForm.module.css';
import { nanoid } from 'nanoid';

type ITodoForm = {
  clickDate: IClickDate;
};

const TodoForm: React.FC<ITodoForm> = ({ clickDate }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [value, setValue] = useState('text');
  const [nameError, setNameError] = useState(false);
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);

  function clearForm() {
    setName('');
    setStart('');
    setEnd('');
  }

  function addHandler() {
    if (name === '') {
      setNameError(true);
    } else if (start == '') {
      setStartError(true);
    } else if (end == '') {
      setEndError(true);
    } else {
      setNameError(false);
      setStartError(false);
      setEndError(false);
      dispatch(addTodo({id: nanoid(), name, start, end, isDone: false }));
      clearForm();
    }
  }

  return (
    <form className={styles.container}>
      <input
        className={nameError ? styles.input_error : styles.input_name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="введите название дела ..."
        maxLength={35}
      />
      {nameError && <div className={styles.error_text}>'Поле обязательно для заполнения'</div>}
      <input
        className={startError ? styles.input_error :styles.input_start}
        value={start}
        type={value}
        placeholder="время начала"
        onChange={(e) => setStart(e.target.value)}
        onFocus={() => setValue('time')}
        onBlur={() => setValue('text')}
      />
      {startError && <div className={styles.error_text}>'Поле обязательно для заполнения'</div>}
      <input
        className={endError ? styles.input_error :styles.input_end}
        value={end}
        type={value}
        placeholder="время окончания"
        onChange={(e) => setEnd(e.target.value)}
        onFocus={() => setValue('time')}
        onBlur={() => setValue('text')}
      />
      {endError && <div className={styles.error_text}>'Поле обязательно для заполнения'</div>}
      <AddTodo addHandler={addHandler} />
    </form>
  );
};

export default TodoForm;
