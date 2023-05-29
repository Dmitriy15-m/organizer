import React from 'react';
import styles from './Header.module.css';
import { IHeader } from './types/types';
import back from '../../../img/icons8-back-24.png';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<IHeader> = ({ days, weekDay, monthName, currentYear, weekNum }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header__container}>
      <img className={styles.back} src={back} alt="back" onClick={() => navigate(-1)} />
      <div className={styles.header__date}>
        <span className={styles.header__month}>{monthName}</span>{' '}
        <span className={styles.header__year}>{currentYear}</span>
        <div className={styles.header__underLine}></div>
      </div>

      <div className={styles.header__weekDayNums}>
        <div className={styles.header__weekDay}>{days[weekDay]}</div>
        <div className={styles.header__weekNum_border}>
          <span className={styles.weekNum}>{weekNum}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
