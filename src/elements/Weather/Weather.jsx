import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './Weather.module.scss';

const Weather = (props) => {
  const { name, attr } = props;
  const { type } = attr || {};

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=51b3ccab32783c38045ab7a555b13531`,
        )
          .then((res) => res.json())
          .then((result) => {
            setData(result);
          });
      });
    };

    fetchData();
  }, []);

  if (!data.weather) return 'Loading...';

  return (
    <div className={cn(styles.weather, styles[type])}>
      <div className={styles.weather__icon}>
        <img
          src={`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`}
          alt="weather icon"
        />
      </div>
      <div className={styles.weather__temp}>
        {Math.round(data?.main?.temp)}°C
      </div>
      <div className={styles.weather__city}>{data?.name}</div>
    </div>
  );
};

export default Weather;
