import React, { useState, useRef } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import { addTodo } from '../../../Redux/slices/calendarSlice';
import AddTodo from '../AddTodo/AddTodo';
import styles from './TodoForm.module.css';
import { nanoid } from 'nanoid';
import { useHref } from 'react-router-dom';

const TodoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [value, setValue] = useState('text');
  const [nameError, setNameError] = useState(false);
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);

  const refName = useRef<HTMLInputElement>(null);
  const refStart = useRef<HTMLInputElement>(null);
  const refEnd = useRef<HTMLInputElement>(null);

  function clearForm() {
    setName('');
    setStart('');
    setEnd('');
  }

  function addHandler() {
    if (start > end || start === end) {
      alert('Введите корректное время');
      return;
    }
    if (name === '') {
      refName.current?.focus();
      setNameError(true);
    } else if (start == '') {
      refStart.current?.focus();
      setStartError(true);
    } else if (end == '') {
      refEnd.current?.focus();
      setEndError(true);
    } else {
      setNameError(false);
      setStartError(false);
      setEndError(false);
      dispatch(addTodo({ id: nanoid(), name, start, end, isDone: false }));
      clearForm();
    }
  }

  function nameHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== '') {
      setNameError(false);
      setName(e.target.value.trimStart());
    } else {
      setNameError(true);
      setName(e.target.value.trimStart());
    }
  }

  function startHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== '') {
      setStartError(false);
      setStart(e.target.value);
    } else {
      setStartError(true);
      setStart(e.target.value);
    }
  }

  function endHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== '') {
      setEndError(false);
      setEnd(e.target.value);
    } else {
      setEndError(true);
      setEnd(e.target.value);
    }
  }

  return (
    <form className={styles.container}>
      <input
        ref={refName}
        className={nameError ? styles.input_error : styles.input_name}
        value={name}
        onChange={nameHandler}
        type="text"
        placeholder="введите название дела ..."
        maxLength={35}
      />
      {nameError && <div className={styles.error_text}>*поле обязательно для заполнения</div>}
      <input
        ref={refStart}
        className={startError ? styles.input_error : styles.input_start}
        value={start}
        type={value}
        placeholder="время начала"
        onChange={startHandler}
        onFocus={() => setValue('time')}
        onBlur={() => setValue('text')}
      />
      {startError && <div className={styles.error_text}>*поле обязательно для заполнения</div>}
      <input
        ref={refEnd}
        className={endError ? styles.input_error : styles.input_end}
        value={end}
        type={value}
        placeholder="время окончания"
        onChange={endHandler}
        onFocus={() => setValue('time')}
        onBlur={() => setValue('text')}
      />
      {endError && <div className={styles.error_text}>*поле обязательно для заполнения</div>}
      <AddTodo addHandler={addHandler} />
    </form>
  );
};

export default TodoForm;
