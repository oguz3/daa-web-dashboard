import React from 'react';
import cn from 'classnames';

import styles from './FadeText.module.scss';

const FadeText = (props) => {
  const texts = [
    'Günaydın',
    `Tarih: ${new Date().toLocaleDateString()}`,
    `Saat: ${new Date().toLocaleTimeString()}`,
  ];

  return (
    <div className={cn(styles.fadeText)}>
      {texts.map((text, i) => (
        <p
          key={i}
          style={{
            animation: `fade-animation 30s linear ${i * 10}s infinite`,
          }}
        >
          {text}
        </p>
      ))}
    </div>
  );
};

export default FadeText;
