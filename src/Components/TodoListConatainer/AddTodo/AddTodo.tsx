import React, { useCallback } from 'react';
import styles from './AddTodo.module.css';
import plus from '../../../img/icons8-plus-24.png';
import { IProps } from './types';

const AddTodo: React.FC<IProps> = ({ addHandler }) => {
  return (
    <div className={styles.add_item}>
      <img onClick={addHandler} src={plus} alt="добавить" />
    </div>
  );
};

export default AddTodo;
