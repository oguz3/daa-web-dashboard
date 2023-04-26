import React, { useCallback, useState, useEffect } from 'react';
import ReactClock from 'react-clock';
import cn from 'classnames';

import styles from './Clock.module.scss';
import 'react-clock/dist/Clock.css';

const Clock = (props) => {
  const { name, attr } = props;
  const { type } = attr || {};

  const [state, setState] = useState(new Date());

  const tick = useCallback(() => {
    setState(new Date());
  }, [setState]);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, [tick]);

  return (
    <div
      className={cn(styles.clock, {
        [styles.digital]: type === 'digital',
        [styles.analog]: type === 'analog',
      })}
    >
      {type === 'digital' ? state.toLocaleTimeString() : null}
      {type === 'analog' ? <ReactClock value={state} /> : null}
    </div>
  );
};

export default Clock;
