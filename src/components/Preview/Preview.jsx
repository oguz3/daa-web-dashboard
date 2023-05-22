import React from 'react';
import { Box, createStyles } from '@mantine/core';
import DropTarget from '@components/DropTarget';

import { useLayoutStore } from '@store/layoutStore';

const useStyles = createStyles((theme, _params) => {
  return {
    mirror: {
      maxWidth: '980px',
      width: '90%',
      height: 'auto',
      aspectRatio: '16/9',
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      backgroundColor: 'black',
    },

    mirrorWrapper: {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateRows: '1fr 2fr 1fr',
      backgroundColor: 'gray',
      border: '1px solid gray',
      overflow: 'hidden',
      borderRadius: theme.radius.md,
    },

    withGap: {
      gap: '1px',
    },
  };
});

const Preview = () => {
  const { classes, cx } = useStyles();

  const layout = useLayoutStore((state) => state?.selectedMirror?.layout);
  const showGrid = useLayoutStore((state) => state.showGrid);

  const isFadeTextVisible = layout?.fadeText ? true : false;

  const keys = layout
    ? Object.keys(layout).filter((key) => key !== 'fadeText')
    : null;

  return (
    <Box className={classes.mirror}>
      <Box
        className={cx(classes.mirrorWrapper, {
          [classes.withGap]: showGrid,
        })}
      >
        {!layout || !keys
          ? null
          : keys?.map((key) => {
              if (isFadeTextVisible && key === 'bottom-center')
                return (
                  <DropTarget key={key} positionKey={key} element="fadeText" />
                );

              return (
                <DropTarget key={key} positionKey={key} element={layout[key]} />
              );
            })}
      </Box>
    </Box>
  );
};

export default Preview;
