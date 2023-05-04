import React from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/tr';

import styles from './Calendar.module.scss';

dayjs.locale('tr');
dayjs.extend(weekday);

const days = [
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
  'Pazar',
];

const Calendar = (props) => {
  const { name, ...rest } = props;

  return (
    <div className={styles.calendar}>
      <h2 className={styles.day}>{dayjs().date()}</h2>
      <div className={styles.right}>
        <h4 className={styles.day_name}>{days[dayjs().weekday()]}</h4>
        <h5 className={styles.year}>{dayjs().year()}</h5>
      </div>
    </div>
  );
};

export default Calendar;
