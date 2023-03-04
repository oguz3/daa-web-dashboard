import React from 'react';
import dynamic from 'next/dynamic';

const Clock = dynamic(() => import('./Clock'));
const Calendar = dynamic(() => import('./Calendar'));

export default function getElement(child) {
  if (child.name === 'clock') return <Clock {...child} />;
  if (child.name === 'calendar') return <Calendar {...child} />;
  return null;
}
