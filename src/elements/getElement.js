import React from 'react';
import dynamic from 'next/dynamic';

const Clock = dynamic(() => import('./Clock'));
const Calendar = dynamic(() => import('./Calendar'));
const Weather = dynamic(() => import('./Weather'));

export default function getElement(child) {
  if (child.name === 'clock') return <Clock {...child} />;
  if (child.name === 'calendar') return <Calendar {...child} />;
  if (child.name === 'weather') return <Weather {...child} />;
  return null;
}
