import React from 'react';
import cn from 'classnames';

import Sidebar from '@components/Sidebar';

import styles from './BuilderLayout.module.scss';

function BuilderLayout({
  builder = false,
  sidebar = true,
  children,
  layoutClassName,
  contentClassName,
}) {
  return (
    <div
      className={cn(
        styles.layout,
        builder && styles.builderLayout,
        layoutClassName,
      )}
    >
      {sidebar && <Sidebar />}
      <div className={cn(styles.content, contentClassName)}>{children}</div>
    </div>
  );
}

export default BuilderLayout;
