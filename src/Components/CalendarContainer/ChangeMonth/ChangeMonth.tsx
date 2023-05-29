import React from 'react';
import styles from './ChangeMonth.module.css'
import left from '../../../img/icons8-back-24.png';
import right from '../../../img/icons8-right-24.png';
import { IMonth } from './types/types';

const ChangeMonth: React.FC<IMonth> = ({ year, monthName, handlerBack, handlerForward }) => {
  return (
    <div className={styles.date_container}>
      <span className={styles.left_arrow}><img src={left} alt="влево" onClick={handlerBack} /></span>
      <div className={styles.date}>
        <span className={styles.date_month}>{monthName}</span>
        <span className={styles.date_year}>{' ' + year}</span>
      </div>
      <span className={styles.right_arrow }><img src={right} alt="вправо" onClick={handlerForward} /></span>
    </div>
  );
};

export default ChangeMonth;
