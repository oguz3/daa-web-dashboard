import React, { useCallback, useState, useEffect } from 'react';

import styles from './Clock.module.scss';

const Clock = (props) => {
  const { name, ...rest } = props;

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

  return <div className={styles.clock}>{state.toLocaleTimeString()}</div>;
};

export default Clock;
