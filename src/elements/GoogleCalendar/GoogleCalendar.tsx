import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);

import styles from './GoogleCalendar.module.scss';

function sortFunction(a, b) {
  var dateA = new Date(a?.start?.dateTime).getTime();
  var dateB = new Date(b?.start?.dateTime).getTime();
  return dateA > dateB ? 1 : -1;
}

const GoogleCalendar = (props) => {
  const { name, attr } = props;
  const { email } = attr || {};
  console.log(props);

  const [data, setData] = useState(null);

  const getCalenderEvents = async () => {
    fetch(`/api/googleCalendar?calendarId=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result?.events);
      });
  };

  useEffect(() => {
    getCalenderEvents();
  }, [email]);

  return (
    <div className={styles.element_Wrapper}>
      {data && !!data.length
        ? data?.sort(sortFunction)?.map((item) => {
            return (
              <div className={styles.wrapper}>
                <div
                  className={cn(styles.day_wrapper, {
                    [styles.old]: dayjs().isAfter(item?.end?.dateTime),
                    [styles.current]:
                      dayjs().isAfter(item?.start?.dateTime) &&
                      dayjs().isBefore(item?.end?.dateTime),
                    [styles.future]: dayjs().isBefore(item?.start?.dateTime),
                  })}
                >
                  <div className={styles.day}>
                    {dayjs(item?.start?.dateTime).format('D')}
                  </div>
                  <div className={styles.month}>
                    {dayjs(item?.start?.dateTime).format('MMM')}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.summary}>{item?.summary}</div>
                  <div className={styles.time}>
                    {dayjs(item?.start?.dateTime).format('h:mm A')}
                  </div>
                </div>
              </div>
            );
          })
        : 'Event yok'}
    </div>
  );
};

export default GoogleCalendar;
