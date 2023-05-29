import React from 'react';
import { nanoid } from 'nanoid';
import styles from './Days.module.css';
import { IDays } from './types/types';

const Days: React.FC<IDays> = ({ days }) => {
  return (
    <thead>
      <tr>
        {days.map((day) => (
          <th
            key={nanoid()}
            className={
              day === 'Сб' || day === 'Вс'
                ? `${styles.calendar__th} + ${styles.red}`
                : styles.calendar__th
            }>
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default React.memo(Days);
