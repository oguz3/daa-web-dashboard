import React from 'react';
import cn from 'classnames';
import getElement from '@elements/getElement';

import { useLayoutStore } from '@store/layoutStore';

import styles from './ElementBase.module.scss';

const ElementBase = ({ item }) => {
  const drawerStatus = useLayoutStore((state) => state.drawer);
  const openDrawer = useLayoutStore((state) => state.openDrawer);

  const element = getElement(item);

  const handleElementClick = () => {
    if (!item?.name) {
      console.warn('Element name is not defined');
      return;
    }
    openDrawer(item?.name);
  };

  return (
    <button
      className={cn(styles.elementButton, {
        [styles.active]: item?.name === drawerStatus.elementName,
      })}
      onClick={handleElementClick}
    >
      {element}
    </button>
  );
};

export default ElementBase;
