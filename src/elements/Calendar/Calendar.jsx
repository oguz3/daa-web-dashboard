import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';

import styles from './Calendar.module.scss';

dayjs.locale('tr');

const Calendar = (props) => {
  const { name, ...rest } = props;

  return (
    <div className={styles.clock}>{dayjs(new Date()).format('DD.MM.YYYY')}</div>
  );
};

export default Calendar;
